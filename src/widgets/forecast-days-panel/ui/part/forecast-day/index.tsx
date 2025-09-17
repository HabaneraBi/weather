import { compasMap, weatherCodeMap } from "@/shared/constants/weather-code-map";
import { formatForecastDate } from "@/shared/functions/format-forecast-label";
import { DayForecastInfo } from "@/shared/types";
import { FC } from "React";
import { Text, View } from "react-native";

type ForecastDayProps = {
  forecastDay: DayForecastInfo;
  index: number;
};

export const ForecastDay: FC<ForecastDayProps> = ({ forecastDay, index }) => {
  return (
    <View
      className={`flex flex-col gap-20 p-1 ${
        index === 1 ? "bg-[#f9f9f9]" : "bg-white"
      } ${index === 0 ? "opacity-50" : "opacity-100"}`}
    >
      <View className="flex flex-col items-center gap-6">
        <Text className="text-lg">
          {formatForecastDate(forecastDay.date, index, 5)}
        </Text>
        <Text className="text-lg">{forecastDay.date.slice(5)}</Text>
        <Text className="text-lg">
          {weatherCodeMap.get(forecastDay.weatherCodeDay)?.icon}
        </Text>
        <Text className="text-lg">{forecastDay.tMax}°</Text>
      </View>
      <View className="flex flex-col items-center gap-6">
        <Text className="text-lg">{forecastDay.tMin}°</Text>
        <Text className="text-lg">
          {weatherCodeMap.get(forecastDay.weatherCodeNight)?.icon}
        </Text>
        <View className="flex flex-row items-center gap-1">
          <Text>{compasMap.get(forecastDay.windDirection)}</Text>
          <Text className="text-lg">{forecastDay.windSpeed} м/с</Text>
        </View>
      </View>
    </View>
  );
};
