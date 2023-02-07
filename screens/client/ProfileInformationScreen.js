import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PersonalInfo from "../../components/PersonalInfo";

const ProfileInformationScreen = ({ navigation }) => {
  return (
    <SafeAreaView className="px-4 py-2 bg-white flex-1">
      <PersonalInfo navigation={navigation} />
    </SafeAreaView>
  );
};

export default ProfileInformationScreen;
