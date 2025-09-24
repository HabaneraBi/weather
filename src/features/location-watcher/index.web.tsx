import { reatomComponent } from "@reatom/npm-react";
import axios from "axios";
import { useEffect } from "react";
import { cityAtom, latitudeAtom, longitudeAtom } from "../../shared/atoms";

export const LocationWatcher = reatomComponent(({ ctx }) => {
  const latitude = ctx.spy(latitudeAtom);
  const longitude = ctx.spy(longitudeAtom);

  useEffect(() => {
    (async () => {
      try {
        if (latitude === null || longitude === null) return;

        const { data } = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
        );
        if (data && data.address) {
          cityAtom(
            ctx,
            data.address.city ||
              data.address.town ||
              data.address.village ||
              null
          );
        }
      } catch (e) {
        console.error("Error in LocationWatcher:", e);
      }
    })();
  }, [latitude, longitude]);

  return null;
});
