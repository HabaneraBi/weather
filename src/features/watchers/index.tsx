import { CoordinatesWatcher } from "@/features/coordinates-watcher";
import { LocationWatcher } from "@/features/location-watcher";
import { View } from "react-native";

export const Watchers = () => {
  return (
    <View>
      <CoordinatesWatcher />
      <LocationWatcher />
    </View>
  );
};
