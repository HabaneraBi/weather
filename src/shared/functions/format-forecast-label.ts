/** Форматирует дату в строку имени дня недели */
export const formatForecastDate = (
  dateString: string,
  index: number,
  lengthArr: number
) => {
  const date = new Date(dateString);

  if (lengthArr > 3) {
    if (index === 0) {
      return "Вчера";
    }
    if (index === 1) {
      return "Сегодня";
    }
    if (index === 2) {
      return "Завтра";
    }
  }

  if (lengthArr <= 3) {
    if (index === 0) return "Сегодня";
    if (index === 1) return "Завтра";
  }

  const weekDayName = date.toLocaleDateString("ru-RU", { weekday: "short" });
  const formatedWeekDayName =
    weekDayName[0].toUpperCase() + weekDayName.slice(1);
  return formatedWeekDayName;
};
