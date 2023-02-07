import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PersonalInfo from "../../components/PersonalInfo";

const PersonalInfoScreen = ({ navigation }) => {
  return (
    <SafeAreaView className="p-4 bg-white flex-1">
      <PersonalInfo navigation={navigation} />
    </SafeAreaView>
  );
};

export default PersonalInfoScreen;
