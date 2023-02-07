import {
  View,
  KeyboardAvoidingView,
  ImageBackground,
  Platform,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const FormsLayout = ({ children }) => {
  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ImageBackground
          source={require("../../assets/pexels-cottonbro-studio-3997381.jpg")}
          resizeMode="cover"
          className="flex-1"
        >
          <View
            className="flex-1  items-center px-6"
            style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          >
            {children}
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default FormsLayout;
