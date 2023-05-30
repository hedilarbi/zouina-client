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
  const pickImage = async () => {
    const { status: existingStatus } =
      await ImagePicker.getMediaLibraryPermissionsAsync();
    if (existingStatus !== "granted") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("permissions obligatoire pour pouvoir créer une gallerie");
        return null;
      }
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,

      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

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
        <ScrollView className="flex-1">
          <View className="mx-auto bg-gray-300 h-44 w-44 rounded-full mt-4">
            {image && (
              <Image
                source={{ uri: image }}
                style={{ resizeMode: "cover" }}
                className="rounded-full flex-1"
              />
            )}
            <TouchableOpacity
              className="absolute -bottom-5 left-14 bg-pr rounded-full p-3  "
              onPress={pickImage}
            >
              <Entypo name="camera" size={30} color="white" />
            </TouchableOpacity>
          </View>
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
        </ScrollView>
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
