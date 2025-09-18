import { getWeatherInfoFromMapAction } from "@/shared/actions";
import { formatForecastDate } from "@/shared/functions/format-forecast-label";
import { DayForecastInfo } from "@/shared/types";
import { reatomComponent } from "@reatom/npm-react";
import { FC } from "React";
import { Text, View } from "react-native";

type ShortForecastDayProps = {
  forecastDay: DayForecastInfo;
  index: number;
};

export const ShortForecastDay: FC<ShortForecastDayProps> = reatomComponent(
  ({ ctx, forecastDay, index }) => {
    const weatherIcon = getWeatherInfoFromMapAction(
      ctx,
      forecastDay.averageWeatherCode
    )?.icon;
    return (
      <View className="flex flex-col">
        <View className="flex flex-row justify-between items-center h-14">
          <Text className="text-[#F3F3F3] w-[21%] text-xl">
            {formatForecastDate(forecastDay.date, index, 3)}
          </Text>
          <Text className="text-xl text-white">{weatherIcon}</Text>
          <View className="flex flex-row gap-1">
            <Text className="text-xl text-cyan-300">{forecastDay.tMin}°</Text>
            <Text className="text-xl text-white">/</Text>
            <Text className="text-xl text-amber-300">{forecastDay.tMax}°</Text>
          </View>
        </View>

        <View className="h-[1px] w-full opacity-45 bg-white"></View>
      </View>
    );
  }
);
