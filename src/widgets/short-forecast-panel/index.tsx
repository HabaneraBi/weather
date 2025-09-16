import { reatomComponent } from "@reatom/npm-react";
import { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { loadFiveDayForecast } from "../../shared/actions";
import { cityAtom, latitudeAtom, longitudeAtom } from "../../shared/atoms";

export const ShortForecastPanel = reatomComponent(({ ctx }) => {
  const latitude = ctx.spy(latitudeAtom);
  const longitude = ctx.spy(longitudeAtom);

  useEffect(() => {
    if (latitude === null || longitude === null) return;
    loadFiveDayForecast(ctx);
  }, [latitude, longitude]);

  return (
    <View>
      <TouchableOpacity onPress={() => loadFiveDayForecast(ctx)}>
        <Text>lol</Text>
      </TouchableOpacity>
      <Text className="text-white">{ctx.spy(cityAtom)}</Text>
    </View>
  );
});
