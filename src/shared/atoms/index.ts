import { atom } from "@reatom/framework";
import { DayForecastInfo } from "../types";

/** Содержит значение долготы */
export const longitudeAtom = atom<null | number>(null, "lolongitudeAtom");

/** Содержит значение долготы */
export const latitudeAtom = atom<null | number>(null, "latitudeAtom");

/** Содержит имя города, которые мы будем получать из координат */
export const cityAtom = atom<null | string>(null, "cityAtom");

/** Содержит текущую температуру текущего дня */
export const currentTemperatureAtom = atom<null | number>(
  null,
  "currentTemperature"
);

/** Содержит текущий weatherCode */
export const currentWeatherCodeAtom = atom<null | number>(
  null,
  "currentWeatherCodeAtom"
);

/** Атом массив содержит данные о погоде на пять дней */
export const forecastInfoDaysAtom = atom<DayForecastInfo[]>(
  [],
  "forecastInfoDaysAtom"
);

/** Атом общей ошибки */
export const errorAtom = atom<string | null>(null, "errorAtom");

/** Содержаший bool для - "Сейчас день?"  */
export const isDayAtom = atom<boolean>(true, "isDay");

/** Атом содержащий время восхода солнца в текущий день */
export const sunriseAtom = atom("", "sunriseAtom");

/** Атом содержащий время заката солнца в текущий день */
export const sunsetAtom = atom("", "sunsetAtom");

/** Атом содержаший главный цвет для темы в зависимости от времени суток */
export const mainColorThemeAtom = atom((ctx) => {
  return ctx.get(isDayAtom) ? "#5f8ec2" : "rgba(255,255,255,0.1)";
});

/** Атом содержащий второстепенный цвет темы в зависимости от времени суток */
export const secondlyColorThemeAtom = atom((ctx) => {
  return ctx.get(isDayAtom) ? "#87a8d3" : "rgba(255,255,255,0.1)";
});

/** Атом содержащий конкретную влажность в данный момент */
export const currentHumidityAtom = atom("", "humidityAtom");

/** Атом содержащий давление в данный момент */
export const currentAirPressureAtom = atom("", "airPressureAtom");

/** Атом содержащий температуру по ощущениям */
export const currentFeelTemperatureAtom = atom(
  "",
  "currentFeelTemperatureAtom"
);

/** Атом содержащий текущее направление ветра */
export const currentWindDirectionAtom = atom(0, "currentWindDirectionAtom");

/** Атом содержащий текущую скорость ветра в м/с */
export const currentWindSpeed = atom(0, "currentWindSpeed");
