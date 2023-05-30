import { View, Text, Image } from "react-native";
import React from "react";
import { SimpleLineIcons } from "@expo/vector-icons";

const iconSizeMap = {
  small: 24,
  medium: 36,
  large: 56,
  xlarge: 56,
};

const containerSizeMap = {
  small: "h-12 w-12",
  medium: "h-24 w-24",
  large: "h-32 w-32",
  xlarge: "h-32 w-28",
};

const radiusMap = {
  md: "rounded-md",
  full: "rounded-full",
};

const Avatar = ({ image, radius, size }) => {
  const iconSize = iconSizeMap[size] || iconSizeMap["medium"];
  const containerSize = containerSizeMap[size] || containerSizeMap["medium"];
  const containerRadius = radiusMap[radius] || radiusMap["md"];
  return (
    <View
      className={`bg-gray-400 ${containerSize} ${containerRadius} justify-center items-center `}
    >
      {image ? (
        <Image
          source={{ uri: image }}
          className={` ${containerRadius} ${containerSize}`}
          style={{ resizeMode: "cover" }}
        />
      ) : (
        <SimpleLineIcons name="user-female" size={iconSize} color="white" />
      )}
    </View>
  );
};

export default Avatar;
