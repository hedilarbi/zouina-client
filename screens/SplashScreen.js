import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const SplashScreen = () => {
  return (
    <SafeAreaView className="justify-center items-center bg-pr flex-1">
      <Text className="text-white text-xl">SplashScreen</Text>
    </SafeAreaView>
  );
};

export default SplashScreen;
