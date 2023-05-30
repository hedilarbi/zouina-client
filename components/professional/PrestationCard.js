import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import PrestationTag from "../client/PrestationTag";
import { useNavigation } from "@react-navigation/native";

const PrestationCard = ({ clientName, state, price, date, id }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className="bg-white rounded-md p-4 mb-3"
      onPress={() => navigation.navigate("Details", { id: id })}
    >
      <View className="flex-row justify-between border-b border-gray-300 pb-4 items-center">
        <PrestationTag state={state} />
        <Text
          className="text-txt"
          style={{ fontFamily: "Montserrat-SemiBold" }}
        >
          {date}
        </Text>
        <Text style={{ fontFamily: "Montserrat-SemiBold" }}>{price} DZD</Text>
      </View>
      <View className="mt-4">
        <Text
          style={{ fontFamily: "Montserrat-Medium" }}
          className="text-center text-txt"
        >
          {clientName}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PrestationCard;
