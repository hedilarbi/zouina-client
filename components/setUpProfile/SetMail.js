import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import React, { useState, useRef } from "react";
import { FontAwesome } from "@expo/vector-icons";
const SetMail = ({
  mail,
  setMail,
  birthday,
  setBirthday,
  slideAnimValue,
  handlePrevious,
  width,
  updateProfile,
}) => {
  const dayInput = useRef(null);
  const monthInput = useRef(null);
  const yearInput = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = () => {
    setIsLoading(true);
    updateProfile();
    setIsLoading(false);
  };

  return (
    <Animated.View
      style={{
        transform: [{ translateX: slideAnimValue }],
        width: width,
      }}
      className="py-8 px-4 "
    >
      {isLoading && (
        <View className="absolute top-0 justify-center items-center h-full w-full">
          <ActivityIndicator size="large" />
        </View>
      )}
      <KeyboardAvoidingView
        className="flex-1 "
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableOpacity onPress={handlePrevious}>
          <FontAwesome name="chevron-left" size={30} color="gray" />
        </TouchableOpacity>
        <View className="flex-1 mt-32">
          <View className="">
            <Text
              style={{ fontFamily: "Montserrat-SemiBold" }}
              className="text-xl text-txt"
            >
              Adresse Mail
            </Text>
            <TextInput
              className="text-base border-b border-black pt-2 mt-6 text-txt"
              style={{ fontFamily: "Montserrat-Medium" }}
              value={mail}
              onChangeText={(text) => setMail(text)}
            />
          </View>
          <View className="mt-20">
            <Text
              style={{ fontFamily: "Montserrat-SemiBold" }}
              className="text-xl text-txt"
            >
              Date de naissance
            </Text>
            <View className="flex-row mt-6 items-center space-x-2">
              <TextInput
                value={birthday.day}
                placeholder="JJ"
                className="text-xl py-1 px-1 text-txt"
                style={{ fontFamily: "Montserrat-Medium" }}
                ref={dayInput}
                keyboardType="numeric"
                onChangeText={(text) => {
                  setBirthday({ ...birthday, day: text });
                  if (text.length === 2) {
                    monthInput.current.focus();
                  }
                }}
              />
              <Text
                style={{ fontFamily: "Montserrat-Medium" }}
                className="text-xl text-pr"
              >
                /
              </Text>
              <TextInput
                value={birthday.month}
                placeholder="MM"
                style={{ fontFamily: "Montserrat-Medium" }}
                className="text-xl py-1 px-1 text-txt"
                ref={monthInput}
                keyboardType="numeric"
                onChangeText={(text) => {
                  setBirthday({ ...birthday, month: text });
                  if (text.length === 2) {
                    yearInput.current.focus();
                  }
                }}
              />
              <Text
                style={{ fontFamily: "Montserrat-Medium" }}
                className="text-xl text-pr"
              >
                /
              </Text>
              <TextInput
                value={birthday.year}
                placeholder="YYYY"
                style={{ fontFamily: "Montserrat-Medium" }}
                className="text-xl py-1 px-1 text-txt "
                ref={yearInput}
                keyboardType="numeric"
                onChangeText={(text) =>
                  setBirthday({ ...birthday, year: text })
                }
              />
            </View>
          </View>
        </View>
        <TouchableOpacity
          className="bg-pr mt-20 w-2/3 mx-auto py-2 rounded-md"
          onPress={handleNext}
        >
          <Text
            className="text-center text-white text-lg"
            style={{ fontFamily: "Montserrat-SemiBold" }}
          >
            Suivant
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Animated.View>
  );
};

export default SetMail;
