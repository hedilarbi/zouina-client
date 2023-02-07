import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
const GoBackButton = ({ navigation }) => {
  return (
    <TouchableOpacity
      className="bg-gray-300 w-10 h-10 justify-center items-center rounded-full"
      onPress={() => navigation.goBack()}
    >
      <AntDesign name="arrowleft" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default GoBackButton;
