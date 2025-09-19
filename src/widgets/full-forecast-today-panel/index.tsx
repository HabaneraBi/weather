import SunriseImage from "@/shared/assets/images/sunrise.svg";
import SunsetImage from "@/shared/assets/images/sunset.svg";
import {
  currentAirPressureAtom,
  currentFeelTemperatureAtom,
  currentHumidityAtom,
  currentWindDirectionAtom,
  currentWindSpeed,
  sunriseAtom,
  sunsetAtom,
} from "@/shared/atoms";
import { compasMap } from "@/shared/constants/compas-map";
import { degToCompass } from "@/shared/functions/deg-to-compass";
import { reatomComponent } from "@reatom/npm-react";
import { View } from "react-native";
import { ForecastEntityInfo } from "./model/type";
import { ForecastEntityBlock } from "./ui/part/forecast-entity-block";

export const FullForecastTodayPanel = reatomComponent(({ ctx }) => {
  const windDirection = degToCompass(ctx.spy(currentWindDirectionAtom));

  const forecastTodayInfo: ForecastEntityInfo[] = [
    {
      header: "Влажность",
      value: ctx.spy(currentHumidityAtom) + "%",
      icon: "💦",
    },
    {
      header: "Ощущается",
      value: ctx.spy(currentFeelTemperatureAtom) + "°",
      icon: "🌡️",
    },
    {
      header: "Давление",
      value: ctx.spy(currentAirPressureAtom),
      icon: "⏲️",
    },
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
    {
      header: windDirection,
      value: String(ctx.spy(currentWindSpeed)) + " м/с",
      icon: compasMap.get(windDirection) as string,
    },
  ];

  return (
    <View className="w-full flex flex-row flex-wrap -mx-2 -my-2">
      {forecastTodayInfo.map((item, i) => (
        <View className="w-1/2 p-2" key={i}>
          <ForecastEntityBlock forecastEntityInfo={item} />
        </View>
      ))}
    </View>
  );
});
