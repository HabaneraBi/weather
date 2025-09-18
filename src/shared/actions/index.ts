import { action } from "@reatom/framework";
import axios from "axios";
import {
  currentTemperatureAtom,
  currentWeatherCodeAtom,
  errorAtom,
  forecastInfoDaysAtom,
  isDayAtom,
  latitudeAtom,
  longitudeAtom,
  sunriseAtom,
  sunsetAtom,
} from "../atoms";
import {
  weatherCodeMapDay,
  weatherCodeMapNight,
} from "../constants/weather-code-map";
import { degToCompass } from "../functions/deg-to-compass";
import { getWeatherCodeFromHour } from "../functions/get-weather-code-from-hour";
import { DayForecastInfo } from "../types";

export const loadForecast = action(async (ctx) => {
  try {
    // Получаем из атомов широту и долготу
    const latitude = ctx.get(latitudeAtom);
    const longitude = ctx.get(longitudeAtom);

    const url =
      "https://api.open-meteo.com/v1/forecast" +
      `?latitude=${latitude}&longitude=${longitude}` +
      "&daily=temperature_2m_min,temperature_2m_max,weathercode,wind_speed_10m_max,wind_direction_10m_dominant,sunrise,sunset" + // добавили sunrise,sunset
      "&hourly=weathercode" + // почасовые коды
      "&past_days=1&forecast_days=4" + // вчера + сегодня + 3 дня
      "&wind_speed_unit=ms&timezone=auto" +
      "&current_weather=true";

    const { data } = await axios.get(url);

    // Апдейтим атомы заката и рассвета на сегодня
    updateSunStateAtoms(ctx, data);

    // Апдейтим forecastInfoDaysAtom
    updateForecastArrayByApi(ctx, data.daily, data.hourly);

    // Апдейтим атомы currentTemperatureAtom, currentWeatherCodeAtom, isDay для сейчашней погоды
    updateCurrentWeatherCodeAtom(ctx, data);
    updateCurrentTemperatureAtom(ctx, data);
    updateIsDayAtom(ctx, data);
  } catch (e) {
    errorAtom(ctx, e as string);
    console.log(e);
  }
}, "loadForecast");

/** Составляет массив и апдейтит forecastInfoDaysAtom по данным из апи */
export const updateForecastArrayByApi = action(
  (ctx, daily: any, hourly: any) => {
    const days: DayForecastInfo[] = daily.time.map(
      (date: string, i: number) => {
        return {
          date,
          tMin: Math.round(daily.temperature_2m_min[i]),
          tMax: Math.round(daily.temperature_2m_max[i]),
          averageWeatherCode: daily.weathercode[i],
          weatherCodeNight:
            getWeatherCodeFromHour(
              hourly.time,
              hourly.weathercode,
              date,
              "00"
            ) ?? daily.weathercode[i],
          weatherCodeDay:
            getWeatherCodeFromHour(
              hourly.time,
              hourly.weathercode,
              date,
              "12"
            ) ?? daily.weathercode[i],
          windSpeed: Math.round(daily.wind_speed_10m_max[i]),
          windDirection: degToCompass(daily.wind_direction_10m_dominant[i]),
        };
      }
    );

    forecastInfoDaysAtom(ctx, days);
    console.log(days);
  },
  "updateForecastArrayByApi"
);

/** Апдейтит атом isDay */
export const updateIsDayAtom = action((ctx, weatherData: any) => {
  const dayCode = weatherData.current_weather.is_day;
  if (dayCode === 1) {
    isDayAtom(ctx, true);
    return;
  }
  isDayAtom(ctx, false);
}, "updateIsDayAtom");

/** Апдейтит атом currentWeatherCodeAtom по данным из апи */
export const updateCurrentWeatherCodeAtom = action((ctx, weatherData: any) => {
  const currentWeatherCode = weatherData.current_weather.weathercode as number;

  currentWeatherCodeAtom(ctx, currentWeatherCode);
}, "updateCurrentWeatherCodeAtom");

/** Апдейтит атом currentTemperatureAtom по данным из апи */
export const updateCurrentTemperatureAtom = action((ctx, weatherData: any) => {
  const currentTemperature = Math.round(
    weatherData.current_weather.temperature
  ) as number;

  currentTemperatureAtom(ctx, currentTemperature);
}, "updateCurrentTemperatureAtom");

/** Определяет по атому или по параметру день ли сейчас и
 * с помощью этого и параметру weatherCode возаращет нужные данные
 * о погоде из мапы
 */
export const getWeatherInfoFromMapAction = action(
  (ctx, weatherCode: number, isDay?: boolean) => {
    if (isDay === undefined) {
      isDay = ctx.get(isDayAtom);
    }

    if (isDay) {
      return weatherCodeMapDay.get(weatherCode);
    }
    return weatherCodeMapNight.get(weatherCode);
  },
  "getWeatherInfoFromMapAction"
);

export const updateSunStateAtoms = action((ctx, weatherData) => {
  const daily = weatherData.daily;

  // Получаем сегодняшнюю дату
  const currentDate = weatherData.current_weather.time.split("T")[0];

  // Вытаскиваем индекс сегодняшней даты из массива time
  const indexFromTimeArray = (daily.time as string[]).indexOf(currentDate);

  // Находим нужные значения времени в массивах sunrise и sunset
  sunriseAtom(ctx, daily.sunrise[indexFromTimeArray].split("T")[1]);
  sunsetAtom(ctx, daily.sunset[indexFromTimeArray].split("T")[1]);
}, "updateSunStateAtoms");
