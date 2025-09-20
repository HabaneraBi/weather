import { reatomComponent } from "@reatom/npm-react";
import { useEffect, useRef } from "react";
import { errorAtom, latitudeAtom, longitudeAtom } from "../../shared/atoms";

// Отслеживаем координаты для веба
export const CoordinatesWatcher = reatomComponent(({ ctx }) => {
  const webWatchIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!("geolocation" in navigator)) return;

    webWatchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        latitudeAtom(ctx, latitude);
        longitudeAtom(ctx, longitude);
      },
      (err) => {
        console.warn("Geolocation error (web):", err);
        errorAtom(ctx, err.message);
      },
      {
        enableHighAccuracy: true, // для точности
        maximumAge: 30_000, // кэш берем 30 секундной авности
        timeout: 15_000,
      }
    );

    return () => {
      if (webWatchIdRef.current !== null) {
        navigator.geolocation.clearWatch(webWatchIdRef.current);
      }
    };
  }, []);

  return null;
});
