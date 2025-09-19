import { CoordinatesWatcher } from "@/features/coordinates-watcher";
import { LocationWatcher } from "@/features/location-watcher";
import { FullForecastTodayPanel } from "@/widgets/full-forecast-today-panel";
import { HourlyDayForecast } from "@/widgets/hourly-day-forecast";
import { ShortForecastDaysPanel } from "@/widgets/short-forecast-days-panel";
import { ShortForecastTodayPanel } from "@/widgets/short-forecast-today-panel";
import { reatomComponent } from "@reatom/npm-react";
import { useRef } from "react";
import { Animated, View } from "react-native";

export const MainPage = reatomComponent(({ ctx }) => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const fadeStyle = {
    opacity: scrollY.interpolate({
      inputRange: [0, 160],
      outputRange: [1, 0],
      extrapolate: "clamp",
    }),
  };

  return (
    <View style={{ paddingBottom: 60 }}>
      <LocationWatcher />
      <CoordinatesWatcher />
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        contentContainerStyle={{
          paddingHorizontal: 20,
        }}
      >
        <View className="h-screen flex flex-col justify-around">
          <Animated.View style={fadeStyle}>
            <ShortForecastTodayPanel />
          </Animated.View>
          <ShortForecastDaysPanel />
        </View>
        <View className="flex flex-col gap-7">
          <HourlyDayForecast />
          <FullForecastTodayPanel />
        </View>
      </Animated.ScrollView>
    </View>
  );
});
