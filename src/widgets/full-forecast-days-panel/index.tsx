import { forecastInfoDaysAtom } from "@/shared/atoms";
import { reatomComponent } from "@reatom/npm-react";
import { View } from "react-native";
import { FullForecastDay } from "./ui/part/full-forecast-day";

export const FullForecastDaysPanel = reatomComponent(({ ctx }) => {
  const forecastDaysInfo = ctx.spy(forecastInfoDaysAtom);
  return (
    <View className="flex flex-row w-full justify-between">
      {forecastDaysInfo.map((item, index) => (
        <FullForecastDay key={item.date} index={index} forecastDay={item} />
      ))}
    </View>
  );
});
