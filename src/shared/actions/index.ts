import { action } from "@reatom/framework";
import axios from "axios";
import {
  currentAirPressureAtom,
  currentFeelTemperatureAtom,
  currentHumidityAtom,
  currentTemperatureAtom,
  currentWeatherCodeAtom,
  currentWindDirectionAtom,
  currentWindSpeedAtom,
  errorAtom,
  forecastInfoDaysAtom,
  hourlyForecastArrayAtom,
  isDayAtom,
  latitudeAtom,
  longitudeAtom,
  sunriseAtom,
  sunsetAtom,
} from "../atoms";
import { degToCompass } from "../functions/deg-to-compass";
import { getWeatherCodeFromHour } from "../functions/get-weather-code-from-hour";
import { CurrentHourForecast, DayForecastInfo } from "../types";

export const loadForecast = action(async (ctx) => {
  try {
    // Получаем из атомов широту и долготу
    const latitude = ctx.get(latitudeAtom);
    const longitude = ctx.get(longitudeAtom);

    const params = new URLSearchParams({
      latitude: String(latitude),
      longitude: String(longitude),
      daily:
        "temperature_2m_min,temperature_2m_max,weathercode,wind_speed_10m_max,wind_direction_10m_dominant,sunrise,sunset",
      hourly:
        "weathercode,relative_humidity_2m,apparent_temperature,surface_pressure,temperature_2m,windspeed_10m",
      past_days: "1",
      forecast_days: "4",
      wind_speed_unit: "ms",
      timezone: "auto",
      current_weather: "true",
    }).toString();

    const url = `https://api.open-meteo.com/v1/forecast?${params}`;

    const { data } = await axios.get(url);

    // Апдейтит атомы конкретной погоды на сегодня (влажность, температура по ощущениям, давление) через объект hourly из api
    updateAtomsByHourly(ctx, data);

    // Апдейтим атомы заката и рассвета на сегодня
    updateSunStateAtoms(ctx, data);

    // Апдейтим forecastInfoDaysAtom
    updateForecastArrayByApi(ctx, data.daily, data.hourly);

    // Апдейтим атомы currentTemperatureAtom, currentWeatherCodeAtom, isDay для сейчашней погоды
    updateAtomsByCurrentWeather(ctx, data.current_weather);
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
  },
  "updateForecastArrayByApi"
);

export const updateAtomsByCurrentWeather = action(
  (ctx, currentWeather: any) => {
    /** Апдейтим текущий weatherCode */
    currentWeatherCodeAtom(ctx, currentWeather.weathercode);

    /** Апдейтим текущую температуру */
    currentTemperatureAtom(ctx, Math.round(currentWeather.temperature));

    /** Апдейтим текущее направление ветра в градусах */
    currentWindDirectionAtom(ctx, Math.round(currentWeather.winddirection));

    /** Апдейтим текущую скорость ветра в м/с */
    currentWindSpeedAtom(ctx, Math.round(currentWeather.windspeed));

    /** Апдейтим атом дня или ночи */
    isDayAtom(ctx, currentWeather.is_day === 1 ? true : false);
  }
);

/** Апдейтит атомы восхода и заката */
export const updateSunStateAtoms = action((ctx, weatherData) => {
  const daily = weatherData.daily;

  // Получаем сегодняшнюю дату без времени
  const currentDate = weatherData.current_weather.time.split("T")[0];

  // Вытаскиваем индекс сегодняшней даты из массива time
  const indexFromTimeArray = (daily.time as string[]).indexOf(currentDate);

  // Находим нужные значения времени в массивах sunrise и sunset
  sunriseAtom(ctx, daily.sunrise[indexFromTimeArray].split("T")[1]);
  sunsetAtom(ctx, daily.sunset[indexFromTimeArray].split("T")[1]);
}, "updateSunStateAtoms");

/** Апдейтит атомы влажности, давления, температуры по ощущениям */
export const updateAtomsByHourly = action((ctx, weatherData: any) => {
  const hourly = weatherData.hourly;

  // Обрезаем сегодняшнюю дату до часа
  const currentHour = weatherData.current_weather.time.slice(0, 13);

  // Получаем индекс
  const index = (hourly.time as string[]).findIndex((t) =>
    t.startsWith(currentHour)
  );

  // Подставляем в атомы нужные значения из массивов с давлением, температуры по ощущениям, влажности
  currentHumidityAtom(ctx, Math.round(hourly.relative_humidity_2m[index]));
  currentAirPressureAtom(ctx, Math.round(hourly.surface_pressure[index]));
  currentFeelTemperatureAtom(
    ctx,
    Math.round(hourly.apparent_temperature[index])
  );

  // Собираем массив для почасовой погоды
  const hourlyArray: CurrentHourForecast[] = (hourly.time as string[])
    .slice(index, index + 25)
    .map((time, i) => {
      const realIndex = index + i;
      return {
        date: time.slice(8, 10) + "." + time.slice(5, 7),
        hour: time.slice(11, 13),
        temperature: Math.round(hourly.temperature_2m[realIndex]),
        windSpeed: Math.round(hourly.windspeed_10m[realIndex]),
        weatherCode: hourly.weathercode[realIndex],
      };
    });

  console.log(hourlyArray, "hourlyArray");

  hourlyForecastArrayAtom(ctx, hourlyArray);
});
