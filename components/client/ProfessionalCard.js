import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import Avatar from "../Avatar";
const ProfessionalCard = ({
  user,
  specialities,
  id,
  rating,
  type,
  date,
  time,
  distance,
  duration,
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      className=" bg-white mb-2 p-4 flex-row flex-1  rounded-md"
      onPress={() =>
        navigation.navigate("Profile", {
          id: id,
          type: type,
          date: date ? date.toString() : "",
          time: time ? time.toString() : "",
        })
      }
    >
      <Avatar image={user.image} size="xlarge" />
      <View className="ml-4 justify-between ">
        <Text
          style={{ fontFamily: "Montserrat-SemiBold" }}
          className="text-lg text-txt "
        >
          {user.full_name}
        </Text>
        <View className="flex-row space-x-3 ">
          {specialities.map((speciality, index) => {
            return (
              <Text
                className="bg-gray-300 text-black px-4 py-0.5 rounded-full text-sm"
                style={{ fontFamily: "Montserrat-Medium" }}
                key={index}
              >
                {speciality}
              </Text>
            );
          })}
        </View>

        <View className="flex-row space-x-6">
          <View className="flex-row items-center">
            <AntDesign name="star" size={20} color="#BD72C8" />
            <Text
              style={{ fontFamily: "Montserrat-Medium" }}
              className="text-sm ml-1 text-txt"
            >
              {Math.round(rating.rate)} ( {rating.rating_number} reviews )
            </Text>
          </View>
          <View className="flex-row items-center">
            <Entypo name="location-pin" size={20} color="#BD72C8" />
            <Text
              style={{ fontFamily: "Montserrat-Medium" }}
              className="text-sm text-txt"
            >
              {distance}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProfessionalCard;
