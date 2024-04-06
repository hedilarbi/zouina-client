import {
  View,
  KeyboardAvoidingView,
  ImageBackground,
  Platform,
  Text,
  TextInput,
  Image,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import LinearGradientWrapper from "../LinearGradientWrapper";

const FormsLayout = ({ children }) => {
  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        className="flex-1 justify-center items-center"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View
          style={{ height: "50%" }}
          className="absolute top-0 left-0 z-10 w-full"
        >
          <LinearGradient
            colors={["#F9679A", "#93729A"]}
            style={{ height: "100%" }}
            start={[0, 0]}
            end={[1, 1]}
          />
        </View>
        <View className="w-full px-4 z-20 translate-y-7">
          <View
            className=" bg-gry rounded-2xl px-4 py-4"
            style={{ elevation: 6 }}
          >
            <Text style={{ fontFamily: "Lato-Bold" }} className="text-base ">
              Enter your mobile number
            </Text>
            <Text
              style={{ fontFamily: "Lato-Regular" }}
              className="text-sm text-txt"
            >
              Login with a valid number
            </Text>
            <View className="bg-white  p-2 flex flex-row  mt-6  border border-gray-400 rounded-md w-full">
              <View className="w-10 h-7 bg-gray-200 ">
                <Image
                  source={require("../../assets/icons/tunisia-flag.png")}
                  style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "cover",
                  }}
                  className="rounded-sm"
                />
              </View>
              <TextInput
                className="bg-transparent ml-2 text-base   flex-1 "
                placeholderTextColor="#525252"
                placeholder="Mobile Number*"
              />
            </View>
            <Text className="text-xs mt-2 text-gray-400  font-latoB">
              e.x 98 123 456
            </Text>
            <TouchableOpacity className="w-full mt-20 ">
              <LinearGradientWrapper>
                <Text className="text-lg text-white text-center font-latoB">
                  Connexion
                </Text>
              </LinearGradientWrapper>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default FormsLayout;
