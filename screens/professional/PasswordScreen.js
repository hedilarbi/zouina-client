import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PasswordUpdateForm from "../../components/PasswordUpdateForm";

const PasswordScreen = ({ navigation }) => {
  return (
    <SafeAreaView className="p-4 bg-white flex-1">
      <PasswordUpdateForm navigation={navigation} />
    </SafeAreaView>
  );
};

export default PasswordScreen;
