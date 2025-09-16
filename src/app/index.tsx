import { createCtx } from "@reatom/framework";
import { reatomContext } from "@reatom/npm-react";
import { Text, View } from "react-native";
import { CoordinatesWatcher } from "../features/coordinates-watcher";
import { LocationWatcher } from "../features/location-watcher";
import { ShortForecastPanel } from "../widgets/short-forecast-panel";
import "./global.css";

export const ctx = createCtx();

const Index = () => {
  return (
    <reatomContext.Provider value={ctx}>
      <View>
        <CoordinatesWatcher />
        <LocationWatcher />
        <Text className="text-black">government</Text>
        <ShortForecastPanel />
      </View>
    </reatomContext.Provider>
  );
};

export default Index;
