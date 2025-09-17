import CalendarImage from "@/shared/assets/images/calendar.svg";
import { forecastInfoDaysAtom } from "@/shared/atoms";
import { reatomComponent } from "@reatom/npm-react";
import { useRouter } from "expo-router";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { ShortForecastDay } from "./ui/part/short-forecast-day";

export const ShortForecastDaysPanel = reatomComponent(({ ctx }) => {
  const forecastArray = ctx.spy(forecastInfoDaysAtom).slice(1, 4);
  const router = useRouter();

  return (
    <>
      {forecastArray.length === 0 ? null : (
        <TouchableOpacity
          onPress={() => router.push("./forecast-days")}
          activeOpacity={0.9}
          className="flex flex-col gap-4 rounded-xl w-full bg-[#5f8ec2] p-3"
        >
          <View className="flex flex-row items-center gap-2">
            <View className="flex flex-row justify-center items-center size-6 rounded-xl bg-[#87a8d3]">
              <CalendarImage width={15} height={15} />
            </View>
            <Text className="text-[#F3F3F3] text-lg">Прогноз на 5 дней</Text>
          </View>
          <FlatList
            keyExtractor={(item) => item.date}
            data={forecastArray}
            renderItem={({ item, index }) => (
              <ShortForecastDay index={index} forecastDay={item} />
            )}
          />
          <TouchableOpacity
            onPress={() => router.push("./forecast-days")}
            activeOpacity={0.3}
            className="w-full py-3 h-45 rounded-lg bg-[#87a8d3]"
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
