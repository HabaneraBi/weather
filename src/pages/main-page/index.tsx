import { CoordinatesWatcher } from "@/features/coordinates-watcher";
import { LocationWatcher } from "@/features/location-watcher";
import { ShortForecastDaysPanel } from "@/widgets/short-forecast-days-panel";
import { ShortForecastTodayPanel } from "@/widgets/short-forecast-today-panel";
import { reatomComponent } from "@reatom/npm-react";
import { FC } from "React";
import { View } from "react-native";
type MainPageProps = {};

export const MainPage: FC<MainPageProps> = reatomComponent(({ ctx }) => {
  return (
    <View className="flex size-full flex-col justify-evenly">
      <CoordinatesWatcher />
      <LocationWatcher />
      <ShortForecastTodayPanel />
      <ShortForecastDaysPanel />
    </View>
  );
});
