import { hourlyForecastArrayAtom, mainColorThemeAtom } from "@/shared/atoms";
import { reatomComponent } from "@reatom/npm-react";
import { ScrollView, Text, View } from "react-native";
import { HourForecast } from "./hour-forecast";

export const HourlyDayForecast = reatomComponent(({ ctx }) => {
  const bg = ctx.spy(mainColorThemeAtom);
  const hourlyArr = ctx.spy(hourlyForecastArrayAtom);

  return (
    <View
      className="rounded-xl p-3 flex flex-col gap-3"
      style={{ backgroundColor: bg }}
    >
      <Text className="text-lg text-white/80">Прогноз на 24 ч</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row items-center gap-2 py-2">
          {hourlyArr.map((item, i) => {
            return <HourForecast key={i} currentHourForecast={item} />;
          })}
        </View>
      </ScrollView>
    </View>
  );
});
