import { View, Text, useWindowDimensions, Animated } from "react-native";
import React from "react";

const Pagination = ({ data, scrollX }) => {
  const { width } = useWindowDimensions();
  return (
    <View className="flex-row bg-transparent mx-auto">
      {data.map((_, index) => {
        const inputRange = [
          (index - 1) * width,
          index * width,
          (index + 1) * width,
        ];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [20, 40, 20],
          extrapolate: "clamp",
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp",
        });
        return (
          <Animated.View
            key={index.toString()}
            className="h-2 rounded-md bg-pr mx-2"
            style={{ width: dotWidth, opacity }}
          />
        );
      })}
    </View>
  );
};

export default Pagination;
