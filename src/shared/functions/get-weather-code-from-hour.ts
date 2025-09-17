/** Возвращает weatherCode для 12 ночи или дня из массивов дат и кодов,
 * получаемых из запроса к апи */
export const getWeatherCodeFromHour = (
  dateTimeArr: string[],
  weathercode: number[],
  date: string,
  hh: "00" | "12"
) => {
  const index = dateTimeArr.findIndex((t) => t.startsWith(`${date}T${hh}:00`));
  return index >= 0 ? weathercode[index] : null;
};
