import { StatusBar } from "react-native";
import React from "react";

const CustomStatusBar = ({ backgroundColor, barStyle }) => (
  <StatusBar backgroundColor={backgroundColor} barStyle={barStyle} />
);

export default CustomStatusBar;
