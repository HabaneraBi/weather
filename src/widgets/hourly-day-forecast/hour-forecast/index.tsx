import { getWeatherInfoFromMap } from "@/shared/functions/get-weather-info-from-map";
import { CurrentHourForecast } from "@/shared/types";
import { FC } from "React";
import { Text, View } from "react-native";
import { tempToColor } from "./model/functions/temp-to-color";

type HourForecastProps = {
  currentHourForecast: CurrentHourForecast;
};

export const HourForecast: FC<HourForecastProps> = ({
  currentHourForecast,
}) => {
  const hour = +currentHourForecast.hour;
  const isDay = hour >= 6 && hour <= 18;

  return (
    <View
      className="flex flex-col items-center gap-4"
      style={{ marginHorizontal: 4 }}
    >
      <Text className="text-white">
        {getWeatherInfoFromMap(currentHourForecast.weatherCode, isDay)?.icon}
      </Text>
      <View className="flex lfex-col items-center gap-1">
        <Text className="text-white">{currentHourForecast.temperature}°</Text>
        <View
          className="w-3 h-10 rounded"
          style={{
            backgroundColor: tempToColor(currentHourForecast.temperature),
          }}
        />
        <Text className="text-white/80 text-[10px] mt-1">
          {hour === 0 ? currentHourForecast.date : `${hour}:00`}
        </Text>
      </View>
      <Text className="text-white">{currentHourForecast.windSpeed} м/с</Text>
    </View>
  );

  // return (
  //   <View className="relative flex flex-col gap-4 items-center">
  //     <Text className="text-white absolute">
  //       {currentHourForecast.temperature}°
  //     </Text>
  //     <Text className="text-white">
  //       {getWeatherInfoFromMap(currentHourForecast.weatherCode, isDay)?.icon}
  //     </Text>
  //     <Text className="text-white">{currentHourForecast.windSpeed} м/с</Text>
  //     <Text className="text-white">
  //       {hour === 0 ? currentHourForecast.date : `${hour}:00`}
  //     </Text>
  //   </View>
  // );
};
