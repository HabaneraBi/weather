import { createCtx } from "@reatom/framework";
import { Text, View } from "react-native";
import "./global.css";

export const ctx = createCtx();

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-semibold text-blue-400">
        Hello, NativeWind!
      </Text>
    </View>
  );
}
