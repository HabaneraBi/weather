import {
  weatherCodeMapDay,
  weatherCodeMapNight,
} from "../constants/weather-code-map";

/** Определяет по параметру день ли сейчас и
 * с помощью этого и параметра weatherCode возвращает нужные данные
 * о погоде из мапы
 */
export const getWeatherInfoFromMap = (weatherCode: number, isDay: boolean) => {
  if (isDay) {
    return weatherCodeMapDay.get(weatherCode);
  }
  return weatherCodeMapNight.get(weatherCode);
};
