import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const PrestationCard = ({ finishedAt, category, total, id }) => {
  const navigation = useNavigation();
  let date = new Date(finishedAt);
  date = date.toString("fr-FR", { month: "long" });
  date = date.substr(4, 17);

  return (
    <TouchableOpacity
      className="bg-white rounded-md p-4 mb-3"
      onPress={() => navigation.navigate("Details", { id: id })}
    >
      <View className="flex-row justify-between border-b border-gray-300 pb-4">
        <Text className="" style={{ fontFamily: "Montserrat-SemiBold" }}>
          {date}
        </Text>
        <Text style={{ fontFamily: "Montserrat-SemiBold" }}>{total} DZD</Text>
      </View>
      <View className="mt-4">
        <Text style={{ fontFamily: "Montserrat-Medium" }}>{category}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PrestationCard;
