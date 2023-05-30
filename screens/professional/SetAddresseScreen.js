import React from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import SetAddress from "../../components/SetAddress";

const SetAddresseScreen = () => {
  return (
    <SafeAreaView className=" py-8 flex-1 bg-white">
      <SetAddress />
    </SafeAreaView>
  );
};

export default SetAddresseScreen;
