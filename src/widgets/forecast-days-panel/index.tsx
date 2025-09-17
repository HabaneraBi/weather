import { forecastInfoDaysAtom } from "@/shared/atoms";
import { reatomComponent } from "@reatom/npm-react";
import { View } from "react-native";
import { ForecastDay } from "./ui/part/forecast-day";

export const ForecastDaysPanel = reatomComponent(({ ctx }) => {
  const forecastDaysInfo = ctx.spy(forecastInfoDaysAtom);
  return (
    <View className="flex flex-row w-full justify-between">
      {forecastDaysInfo.map((item, index) => (
        <ForecastDay key={item.date} index={index} forecastDay={item} />
      ))}
    </View>
  );
});
