import { latitudeAtom, longitudeAtom } from "@/shared/atoms";
import { reatomComponent } from "@reatom/npm-react";
import { useEffect } from "react";
import { loadForecastAction } from "./model/actions";

export const LoadForecast = reatomComponent(({ ctx }) => {
  const latitude = ctx.spy(latitudeAtom);
  const longitude = ctx.spy(longitudeAtom);

  useEffect(() => {
    if (latitude === null || longitude === null) return;
    loadForecastAction(ctx);

    // Делаем запрос каждый час
    const interval = setInterval(() => {
      loadForecastAction(ctx);
    }, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [latitude, longitude]);

  return null;
});
