import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const PromoScreen = () => {
  return (
    <SafeAreaView className="px-4 py-4 flex-1">
      <Text style={{ fontFamily: "Montserrat-SemiBold" }} className="text-xl">
        Codes promo
      </Text>
      <View className="bg-white rounded-md p-2 pb-4">
        <Text style={{ fontFamily: "Montserrat-SemiBold" }} className="text-lg">
          Code Promo Iphone14
        </Text>
        <Text style={{ fontFamily: "Montserrat-Medium" }} className="mt-2">
          MXA55
        </Text>
        <View className="flex-row">
          <TouchableOpacity className="mt-6 border-2 border-gray-500 px-6 py-1 rounded-full">
            <Text
              style={{ fontFamily: "Montserrat-SemiBold" }}
              className="text-lg"
            >
              Activer
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PromoScreen;
