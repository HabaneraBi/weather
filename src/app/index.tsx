import { LoadForecast } from "@/features/load-forecast";
import { Watchers } from "@/features/watchers";
import { MainPage } from "@/pages/main-page";
import {
  forecastInfoDaysAtom,
  isDayAtom,
  latitudeAtom,
  longitudeAtom,
} from "@/shared/atoms";
import { StarField } from "@/shared/ui/part/start-field";
import { reatomComponent } from "@reatom/npm-react";
import { LinearGradient } from "expo-linear-gradient";
import { ColorValue } from "react-native";
import { Loader } from "../shared/ui/part/loader";
import "./global.css";

const Index = reatomComponent(({ ctx }) => {
  const dayColors: [ColorValue, ColorValue, ...ColorValue[]] = [
    "#4facfe",
    "#dff6ff",
  ];
  const nightColors: [ColorValue, ColorValue, ...ColorValue[]] = [
    "#0b1026",
    "#101842",
  ];
  const isDay = ctx.spy(isDayAtom);

  const isShowLoader =
    ctx.spy(longitudeAtom) !== null &&
    ctx.spy(latitudeAtom) !== null &&
    ctx.spy(forecastInfoDaysAtom).length !== 0;

  console.log(isShowLoader);

  return (
    <>
      <LinearGradient
        colors={isDay ? dayColors : nightColors} // сверху голубой → снизу светло-голубой
        start={{ x: 0.5, y: 0.2 }} // верх
        end={{ x: 0.5, y: 1 }}
        className="size-full"
      >
        <LoadForecast />
        <Watchers />
        {isDay ? null : <StarField />}
        {isShowLoader ? <MainPage /> : <Loader />}
      </LinearGradient>
    </>
  );
});

export default Index;
