import { LinearGradient } from "expo-linear-gradient";
import { CoordinatesWatcher } from "../features/coordinates-watcher";
import { LocationWatcher } from "../features/location-watcher";
import { ShortForecastPanel } from "../widgets/short-forecast-panel";
import "./global.css";

const Index = () => {
  return (
    <LinearGradient
      colors={["#4facfe", "#dff6ff"]} // сверху голубой → снизу светло-голубой
      start={{ x: 0.5, y: 0 }} // верх
      end={{ x: 0.5, y: 1 }}
      className="size-full p-5"
    >
      <CoordinatesWatcher />
      <LocationWatcher />
      <ShortForecastPanel />
    </LinearGradient>
  );
};

export default Index;
