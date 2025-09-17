import { ForecastDaysPanel } from "@/widgets/forecast-days-panel";
import { Text, View } from "react-native";

export const ForecastDaysPage = () => {
  return (
    <View className="size-full flex flex-col justify-start py-4 gap-10">
      <Text className="text-3xl self-center">Прогноз на 5 дней</Text>
      <ForecastDaysPanel />
    </View>
  );
};
