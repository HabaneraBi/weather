import { createCtx } from "@reatom/framework";
import { reatomComponent } from "@reatom/npm-react";
import { Text, View } from "react-native";
import { CoordinatesWatcher } from "../features/coordinates-watcher";
import { LocationWatcher } from "../features/location-watcher";
import "./global.css";

export const ctx = createCtx();

export const Index = reatomComponent(({ ctx }) => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <CoordinatesWatcher />
      <LocationWatcher />
      <Text className="text-xl font-semibold text-blue-400">
        Hello, NativeWind!
      </Text>
    </View>
  );
});
