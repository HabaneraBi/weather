import { cityAtom } from "@/src/shared/atoms";
import { reatomComponent } from "@reatom/npm-react";
import { Text, View } from "react-native";

export const ShortForecastPanel = reatomComponent(({ ctx }) => {
  return (
    <View>
      <Text>{ctx.spy(cityAtom)}</Text>
    </View>
  );
});
