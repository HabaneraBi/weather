import { atom } from "@reatom/framework";

/** Содержит значение долготы */
export const longitude = atom<null | string>(null, "longitude");

/** Содержит значение долготы */
export const latitude = atom<null | string>(null, "latitude");
