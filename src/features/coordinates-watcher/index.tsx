import { reatomComponent } from "@reatom/npm-react";
import * as Location from "expo-location";
import { useEffect, useRef } from "react";
import { latitudeAtom, longitudeAtom } from "../../shared/atoms";

export const CoordinatesWatcher = reatomComponent(({ ctx }) => {
  const subRef = useRef<Location.LocationSubscription | null>(null);

  useEffect(() => {
    (async () => {
      // 1) Разрешение
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        return;
      }

      // 2) Подписка на обновления координат (работает пока экран открыт)
      subRef.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Balanced, // достаточно для города/региона
          distanceInterval: 50, // обновление при смещении ~50 м
          timeInterval: 15000, // или каждые 15 сек (что раньше)
        },
        async (loc) => {
          // апдейтим атомы
          const { latitude, longitude } = loc.coords;
          console.log(loc);
          latitudeAtom(ctx, latitude);
          longitudeAtom(ctx, longitude);
        }
      );
    })();

    return () => subRef.current?.remove();
  }, []);

  return null;
});
