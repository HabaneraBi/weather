import SunriseImage from "@/shared/assets/images/sunrise.svg";
import SunsetImage from "@/shared/assets/images/sunset.svg";
import { sunriseAtom, sunsetAtom } from "@/shared/atoms";
import { reatomComponent } from "@reatom/npm-react";
import { View } from "react-native";
import { ForecastEntityInfo } from "./model/type";
import { ForecastEntityBlock } from "./ui/part/forecast-entity-block";

export const FullForecastTodayPanel = reatomComponent(({ ctx }) => {
  const forecastTodayInfo: ForecastEntityInfo[] = [
    {
      header: "Восход",
      value: ctx.spy(sunriseAtom),
      icon: <SunriseImage width={64} height={64} />,
    },
    {
      header: "Закат",
      value: ctx.spy(sunsetAtom),
      icon: <SunsetImage width={64} height={64} />,
    },
  ];

  return (
    <View className="flex flex-row justify-between gap-3">
      {forecastTodayInfo.map((item, i) => (
        <ForecastEntityBlock forecastEntityInfo={item} key={i} />
      ))}
    </View>
  );
});
