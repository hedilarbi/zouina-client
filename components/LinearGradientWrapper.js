import { StyleSheet } from "react-native";
import React from "react";

import { LinearGradient } from "expo-linear-gradient";

const LinearGradientWrapper = ({ children, style }) => {
  return (
    <LinearGradient
      colors={["#F9679A", "#93729A"]}
      style={[
        {
          width: "100%",
          borderRadius: 6,
          paddingVertical: 8,
        },
      ]}
      start={[0, 1]}
      end={[1, 0]}
    >
      {children}
    </LinearGradient>
  );
};

export default LinearGradientWrapper;

const styles = StyleSheet.create({});
