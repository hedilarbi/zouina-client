import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";

import { LinearGradient } from "expo-linear-gradient";
import Pagination from "./Pagination";
import { useNavigation } from "@react-navigation/native";

const SlideItem = ({ item }) => {
  const { width, height } = Dimensions.get("screen");

  return (
    <View style={{ width }} className="flex-1">
      <ImageBackground
        source={item.img}
        resizeMode="cover"
        style={{ width: width, height: height }}
        className="justify-center relative px-5 "
      >
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.6)"]}
          className="absolute top-0 left-0  "
          style={{ width: width, height: height }}
        />
        <View className="">
          <Text
            className="text-ct text-3xl my-4"
            style={{ fontFamily: "Montserrat-SemiBold" }}
          >
            {item.title}
          </Text>
          <Text
            className="my-4 text-white text-lg  "
            style={{ fontFamily: "Montserrat-Medium" }}
          >
            {item.description}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default SlideItem;
