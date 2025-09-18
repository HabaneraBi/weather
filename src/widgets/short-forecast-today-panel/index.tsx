import { reatomComponent } from "@reatom/npm-react";
import { useEffect } from "react";
import { Text, View } from "react-native";
import {
  getWeatherInfoFromMapAction,
  loadForecast,
} from "../../shared/actions";
import {
  cityAtom,
  currentTemperatureAtom,
  currentWeatherCodeAtom,
  forecastInfoDaysAtom,
  latitudeAtom,
  longitudeAtom,
} from "../../shared/atoms";

export const ShortForecastTodayPanel = reatomComponent(({ ctx }) => {
  const latitude = ctx.spy(latitudeAtom);
  const longitude = ctx.spy(longitudeAtom);
  const currentForecastDay = ctx.spy(forecastInfoDaysAtom)[1];
  const currentWeatherCode = ctx.spy(currentWeatherCodeAtom);

  // Получаем инфу о текущей погоде
  const weatherInfoFromMap =
    currentWeatherCode !== null
      ? getWeatherInfoFromMapAction(ctx, currentWeatherCode)
      : undefined;

  useEffect(() => {
    if (latitude === null || longitude === null) return;
    loadForecast(ctx);

    // Делаем запрос каждые 20 минут
    const interval = setInterval(() => {
      loadForecast(ctx);
    }, 20 * 60 * 1000);

    return () => clearInterval(interval);
  }, [latitude, longitude]);

  if (!currentForecastDay) return;

  return (
    <View className="text-white flex flex-col gap-3">
      <Text className="text-white text-2xl">{ctx.spy(cityAtom)}</Text>
      <Text className="text-3xl">{weatherInfoFromMap?.icon}</Text>
      <Text className="text-white text-9xl">
        {ctx.spy(currentTemperatureAtom)}°
      </Text>
      <View className="flex flex-row gap-2">
        <Text className="text-[#F3F3F3] text-xl">
          {weatherInfoFromMap?.text}
        </Text>
        <Text className="text-[#F3F3F3] text-xl">
          {currentForecastDay.tMax}°/{currentForecastDay.tMin}°
        </Text>
      </View>
    </View>
  );
});
