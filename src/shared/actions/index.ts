import { action } from "@reatom/framework";
import axios from "axios";
import {
  currentTemperature,
  forecastInfoDaysAtom,
  latitudeAtom,
  longitudeAtom,
} from "../atoms";
import { degToCompass } from "../functions/deg-to-compass";
import { DayForecastInfo } from "../types";

export const loadFiveDayForecast = action(async (ctx) => {
  // Получаем из атомов широту и долготу
  const latitude = ctx.get(latitudeAtom);
  const longitude = ctx.get(longitudeAtom);

  const url =
    "https://api.open-meteo.com/v1/forecast" +
    `?latitude=${latitude}&longitude=${longitude}` +
    "&daily=temperature_2m_min,temperature_2m_max,weathercode,wind_speed_10m_max,wind_direction_10m_dominant" +
    "&past_days=1&forecast_days=4" + // вчера + сегодня + 3 дня
    "&wind_speed_unit=ms&timezone=auto" +
    "&current_weather=true";

  const { data } = await axios.get(url);

  const days: DayForecastInfo[] = data.daily.time.map(
    (date: string, i: number) => {
      return {
        date,
        tMin: data.daily.temperature_2m_min[i].toFixed(0),
        tMax: data.daily.temperature_2m_max[i].toFixed(0),
        weatherCode: data.daily.weathercode[i],
        windSpeed: data.daily.wind_speed_10m_max[i].toFixed(0),
        windDirection: degToCompass(data.daily.wind_direction_10m_dominant[i]),
      };
    }
  );

  forecastInfoDaysAtom(ctx, days);

  // Температура "сейчас"
  const currentTemp = data.current_weather.temperature.toFixed(0) as number;

  if (currentTemp) {
    currentTemperature(ctx, currentTemp);
  }

  console.log(days);
  console.log(currentTemp);
}, "loadFiveDayForecast");
