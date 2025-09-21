import { errorAtom } from "@/shared/atoms";
import { reatomComponent } from "@reatom/npm-react";
import { Text, View } from "react-native";
import ErrorImage from "../shared/assets/images/error.svg";

const Error = reatomComponent(({ ctx }) => {
  const errorText = ctx.spy(errorAtom);
  return (
    <View
      style={{ paddingBlock: 70 }}
      className="size-full flex flex-col gap-4 items-center justify-center bg-white"
    >
      <View>
        <ErrorImage width={150} height={150} />
        <Text className="text-xl">Произошла ошибка!</Text>
      </View>
      <Text className="text-xl text-red-500">{errorText}</Text>
    </View>
  );
});

export default Error;
