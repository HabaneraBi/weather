import LoadingImage from "@/shared/assets/images/loading.svg";
import {
  cityAtom,
  forecastInfoDaysAtom,
  latitudeAtom,
  longitudeAtom,
} from "@/shared/atoms";
import { reatomComponent } from "@reatom/npm-react";
import { useEffect, useRef } from "react";
import { Animated, Easing, Platform } from "react-native";

export const Loader = reatomComponent(({ ctx }) => {
  const spin = useRef(new Animated.Value(0)).current;

  console.log(ctx.spy(longitudeAtom), "ctx.spy(longitudeAtom)");
  console.log(ctx.spy(latitudeAtom), "ctx.spy(latitudeAtom)");
  console.log(ctx.spy(cityAtom), "ctx.spy(cityAtom)");
  console.log(
    ctx.spy(forecastInfoDaysAtom).length,
    "ctx.spy(forecastInfoDaysAtom).length"
  );

  const isShowLoader =
    ctx.spy(longitudeAtom) !== null &&
    ctx.spy(latitudeAtom) !== null &&
    ctx.spy(cityAtom) !== null &&
    ctx.spy(forecastInfoDaysAtom).length !== 0;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: Platform.OS !== "web",
      })
    ).start();
  }, [spin]);

  const rotate = spin.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <>
      {isShowLoader ? null : (
        <Animated.View
          style={{
            transform: [{ rotate }],
            zIndex: 5,
            position: "absolute",
            marginTop: -24,
            marginLeft: -24,
            top: "50%",
            left: "50%",
          }}
        >
          <LoadingImage width={48} height={48} />
        </Animated.View>
      )}
    </>
  );
});
