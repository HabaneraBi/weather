import { View } from "react-native";
import { CoordinatesWatcher } from "../features/coordinates-watcher";
import { LocationWatcher } from "../features/location-watcher";
import { ShortForecastPanel } from "../widgets/short-forecast-panel";
import "./global.css";

const Index = () => {
  return (
    <View className="bg-[#5a92cf] size-full">
      <CoordinatesWatcher />
      <LocationWatcher />
      <ShortForecastPanel />
    </View>
  );
};

export default Index;
