import { FullForecastTodayPanel } from "@/widgets/full-forecast-today-panel";
import { HourlyDayForecast } from "@/widgets/hourly-day-forecast";
import { ShortForecastDaysPanel } from "@/widgets/short-forecast-days-panel";
import { ShortForecastTodayPanel } from "@/widgets/short-forecast-today-panel";
import { useRef } from "react";
import { Animated, View } from "react-native";

export const MainPage = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const fadeStyle = {
    opacity: scrollY.interpolate({
      inputRange: [0, 160],
      outputRange: [1, 0],
      extrapolate: "clamp",
    }),
  };

  return (
    <View style={{ paddingBottom: 60, flex: 1 }}>
      <Animated.ScrollView
        style={{ flex: 1 }}
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
};
