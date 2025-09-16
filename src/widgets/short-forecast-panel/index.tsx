import { reatomComponent } from "@reatom/npm-react";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { loadFiveDayForecast } from "../../shared/actions";
import {
  cityAtom,
  currentTemperature,
  forecastInfoDaysAtom,
  latitudeAtom,
  longitudeAtom,
} from "../../shared/atoms";
import { weatherCodeMap } from "../../shared/constants/weather-code-map";

export const ShortForecastPanel = reatomComponent(({ ctx }) => {
  const latitude = ctx.spy(latitudeAtom);
  const longitude = ctx.spy(longitudeAtom);
  const currentForecastDay = ctx.spy(forecastInfoDaysAtom)[1];
  const weatherText = weatherCodeMap.get(currentForecastDay?.weatherCode)?.text;

  useEffect(() => {
    if (latitude === null || longitude === null) return;
    loadFiveDayForecast(ctx);
  }, [latitude, longitude]);

  if (!currentForecastDay) return;

  return (
    <View className="text-white flex flex-col gap-3 mt-20">
      <Text className="text-white text-2xl">{ctx.spy(cityAtom)}</Text>
      <Text className="text-white text-8xl">
        {ctx.spy(currentTemperature)}°
      </Text>
      <View className="flex flex-row gap-2">
        <Text className="text-[#F3F3F3] text-lg">{weatherText}</Text>
        <Text className="text-[#F3F3F3] text-lg">
          {currentForecastDay.tMax}°/{currentForecastDay.tMin}°
        </Text>
      </View>
    </View>
  );
});
