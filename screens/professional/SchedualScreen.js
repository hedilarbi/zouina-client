import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Schedual from "../../components/professional/Schedual";

const SchedualScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Schedual />
    </SafeAreaView>
  );
};

export default SchedualScreen;
