import { atom } from "@reatom/framework";

/** Содержит значение долготы */
export const longitudeAtom = atom<null | number>(null, "lolongitudeAtom");

/** Содержит значение долготы */
export const latitudeAtom = atom<null | number>(null, "latitudeAtom");

/** Содержит имя города, которые мы будем получать из координат */
export const cityAtom = atom<string | null>(null, "cityAtom");
