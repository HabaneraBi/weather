import { cityAtom, latitudeAtom, longitudeAtom } from "@/src/app/atoms";
import { reatomComponent } from "@reatom/npm-react";
import * as Location from "expo-location";
import { useEffect, useRef } from "react";

export const LocationWatcher = reatomComponent(({ ctx }) => {
  const lastReverseRef = useRef<number>(0);
  const latitude = ctx.spy(latitudeAtom);
  const longitude = ctx.spy(longitudeAtom);

  useEffect(() => {
    (async () => {
      if (latitude === null || longitude === null) return;
      const now = Date.now();
      if (now - lastReverseRef.current < 20000) return; // не чаще 1 раза в 20с
      lastReverseRef.current = now;

      const res = await Location.reverseGeocodeAsync({ latitude, longitude });
      if (res[0]) {
        const item = res[0];
        cityAtom(ctx, item.city ?? item.district ?? item.name ?? null);
      }
    })();
  }, [latitude, longitude]);

  return null;
});
