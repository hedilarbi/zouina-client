import {
  View,
  Text,
  Animated,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const SetName = ({
  width,
  slideAnimValue,

  handleNext,
  setImage,
  image,
  name,
  setName,
}) => {
  return (
    <Animated.View
      style={{
        transform: [{ translateX: slideAnimValue }],
        width: width,
      }}
      className="py-8 px-4 justify-between"
    >
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View className="mt-24">
          <Text
            style={{ fontFamily: "Montserrat-SemiBold" }}
            className="text-xl text-txt"
          >
            Nom et Prénom
          </Text>
          <TextInput
            className="text-base border-b border-black pt-2 mt-6 text-txt"
            style={{ fontFamily: "Montserrat-Medium" }}
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>

        <TouchableOpacity
          className={
            name.length != 0
              ? "bg-pr mt-20 w-2/3 mx-auto py-2 rounded-md"
              : "bg-gray-400 mt-20 w-2/3 mx-auto py-2 rounded-md"
          }
          onPress={handleNext}
          disabled={name.length != 0 ? false : true}
        >
          <Text
            className="text-center text-white text-lg"
            style={{ fontFamily: "Montserrat-SemiBold" }}
          >
            SUIVANT
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Animated.View>
  );
};

export default SetName;
