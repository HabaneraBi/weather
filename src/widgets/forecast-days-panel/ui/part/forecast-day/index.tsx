import { DayForecastInfo } from "@/shared/types";
import { FC } from "React";
import { View } from "react-native";

type ForecastDayProps = {
  forecastDay: DayForecastInfo;
};

export const ForecastDay: FC<ForecastDayProps> = ({ forecastDay }) => {
  return <View></View>;
};
