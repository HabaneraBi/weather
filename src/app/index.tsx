import { MainPage } from "@/pages/main-page";
import { LinearGradient } from "expo-linear-gradient";
import { Loader } from "../shared/ui/part/loader";
import "./global.css";

const Index = () => {
  return (
    <LinearGradient
      colors={["#4facfe", "#dff6ff"]} // сверху голубой → снизу светло-голубой
      start={{ x: 0.5, y: 0.2 }} // верх
      end={{ x: 0.5, y: 1 }}
      className="size-full p-5"
    >
      <Loader />
      <MainPage />
    </LinearGradient>
  );
};

export default Index;
