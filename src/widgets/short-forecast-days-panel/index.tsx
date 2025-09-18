import CalendarImage from "@/shared/assets/images/calendar.svg";
import { colorThemeAtom, forecastInfoDaysAtom } from "@/shared/atoms";
import { reatomComponent } from "@reatom/npm-react";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { ShortForecastDay } from "./ui/part/short-forecast-day";

export const ShortForecastDaysPanel = reatomComponent(({ ctx }) => {
  const forecastArray = ctx.spy(forecastInfoDaysAtom).slice(1, 4);
  const router = useRouter();

  const styleByTimeOfDay = ctx.spy(colorThemeAtom);

  return (
    <>
      {forecastArray.length === 0 ? null : (
        <TouchableOpacity
          onPress={() => router.push("./forecast-days")}
          activeOpacity={0.9}
          style={{ backgroundColor: styleByTimeOfDay }}
          className="flex flex-col gap-4 rounded-xl w-full p-3"
        >
          <View className="flex flex-row items-center gap-2">
            <View
              style={{ backgroundColor: styleByTimeOfDay }}
              className="flex flex-row justify-center items-center size-6 rounded-xl"
            >
              <CalendarImage width={15} height={15} />
            </View>
            <Text className="text-[#F3F3F3] text-lg">Прогноз на 5 дней</Text>
          </View>
          {/* bg-[#5f8ec2] */}
          <View>
            {forecastArray.map((item, index) => (
              <ShortForecastDay
                key={item.date}
                index={index}
                forecastDay={item}
              />
            ))}
          </View>
          <TouchableOpacity
            style={{ backgroundColor: styleByTimeOfDay }}
            onPress={() => router.push("./forecast-days")}
            activeOpacity={0.3}
            className="w-full py-3 h-45 rounded-lg"
          >
            <Text className="text-center text-xl text-white">
              Прогноз на 5 дней
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
      )}
    </>
  );
});
