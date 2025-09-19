import { mainColorThemeAtom } from "@/shared/atoms";
import { ForecastEntityInfo } from "@/widgets/full-forecast-today-panel/model/type";
import { reatomComponent } from "@reatom/npm-react";
import { FC } from "react";
import { Text, View } from "react-native";

type ForecastEntityBlockProps = {
  forecastEntityInfo: ForecastEntityInfo;
};

export const ForecastEntityBlock: FC<ForecastEntityBlockProps> =
  reatomComponent(({ ctx, forecastEntityInfo }) => {
    const styleByTimeOfDay = ctx.spy(mainColorThemeAtom);
    return (
      <View
        style={{ backgroundColor: styleByTimeOfDay }}
        className="aspect-square rounded-xl relative"
      >
        <View className="absolute left-3 top-3">
          <Text className="text-white text-lg">
            {forecastEntityInfo.header}
          </Text>
          <Text className="text-white text-2xl">
            {forecastEntityInfo.value}
          </Text>
        </View>
        <View className="absolute bottom-3 right-3">
          <Text className="text-white text-[42px]">
            {forecastEntityInfo.icon}
          </Text>
        </View>
      </View>
    );
  });
