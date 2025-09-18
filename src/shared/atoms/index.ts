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
