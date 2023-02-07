import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import OnBoarding from "../../components/auth/OnBoarding";

const OnboardingScreen = ({ navigation }) => {
  return (
    <View className="flex-1 justify-center items-center">
      <OnBoarding navigation={navigation} />
    </View>
  );
};

export default OnboardingScreen;
