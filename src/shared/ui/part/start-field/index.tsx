import { pulseClasses } from "@/shared/constants/pulse-classes";
import { useMemo } from "react";
import { useWindowDimensions, View } from "react-native";

export const StarField = () => {
  const { width, height } = useWindowDimensions();

  const stars = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 80; i++) {
      arr.push({
        key: i,
        left: Math.random() * width,
        top: Math.random() * height,
        size: Math.random() * 2 + 0.8, // 0.8..2.8 px
        cls: pulseClasses[Math.floor(Math.random() * pulseClasses.length)],
      });
    }
    return arr;
  }, [width, height]);

  return (
    <View style={{ position: "absolute", inset: 0, width, height }}>
      {stars.map((s, i) => (
        <View
          key={i}
          style={{
            position: "absolute",
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            borderRadius: s.size / 2,
            backgroundColor: "#fff",
          }}
          className={s.cls}
        ></View>
      ))}
    </View>
  );
};
