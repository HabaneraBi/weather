import LoadingImage from "@/shared/assets/images/loading.svg";
import { useEffect, useRef } from "react";
import { Animated, Easing, Platform } from "react-native";

export const Loader = () => {
  const spin = useRef(new Animated.Value(0)).current;

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
  );
};
