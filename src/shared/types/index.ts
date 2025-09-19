export type DayForecastInfo = {
  date: string;
  tMin: number;
  tMax: number;
  windSpeed: number;
  windDirection: string;
  averageWeatherCode: number;
  weatherCodeNight: number;
  weatherCodeDay: number;
};

export type CurrentHourForecast = {
  date: string;
  hour: string;
  temperature: number;
  windSpeed: number;
  weatherCode: number;
};
