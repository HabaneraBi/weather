import LoadingImage from "@/shared/assets/images/loading.svg";
import {
  cityAtom,
  forecastInfoDaysAtom,
  latitudeAtom,
  longitudeAtom,
} from "@/shared/atoms";
import { reatomComponent } from "@reatom/npm-react";
import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

const AnimatedSvg = Animated.createAnimatedComponent(LoadingImage);

export const Loader = reatomComponent(({ ctx }) => {
  const spin = useRef(new Animated.Value(0)).current;

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
        useNativeDriver: true,
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
        <AnimatedSvg
          width={48}
          height={48}
          style={{
            transform: [{ rotate }],
            zIndex: 3,
            position: "absolute",
            top: "50%",
            left: "50%",
          }}
        />
      )}
    </>
  );
});
