import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setProfessional } from "../../slices/professionalSlice";
const ProfessionalCard = ({
  user,
  specialities,
  id,
  rating,
  type,
  date,
  time,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const chooseProfessional = () => {
    dispatch(setProfessional({ user, id }));
    navigation.navigate("Confirm", {
      type: type,
      date: date != null ? date.toString() : null,
      time: time != null ? time.toString() : null,
    });
  };
  return (
    <View className=" bg-white mb-2 p-4 flex-row flex-1  rounded-md">
      <Image
        source={{
          uri: user.image,
        }}
        className="h-32 w-28 rounded-md"
      />
      <View className="ml-4 justify-between">
        <Text style={{ fontFamily: "Montserrat-SemiBold" }} className="text-lg">
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
            <AntDesign name="star" size={20} color="#FA69B7" />
            <Text
              style={{ fontFamily: "Montserrat-Medium" }}
              className="text-sm ml-1"
            >
              {Math.round(rating.rate)} ( {rating.rating_number} reviews )
            </Text>
          </View>
          <View className="flex-row items-center">
            <Entypo name="location-pin" size={20} color="#FA69B7" />
            <Text
              style={{ fontFamily: "Montserrat-Medium" }}
              className="text-sm"
            >
              5 Km
            </Text>
          </View>
        </View>
        <View className="flex-row items-center space-x-6">
          <TouchableOpacity
            className="bg-pr px-6  rounded-md"
            onPress={chooseProfessional}
          >
            <Text
              style={{ fontFamily: "Montserrat-Medium" }}
              className="text-white text-sm py-0.5"
            >
              Choisir
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ fontFamily: "Montserrat-Medium" }}
            className="bg-gray-300 px-6  rounded-md"
            onPress={() => navigation.navigate("Profile", { id: id })}
          >
            <Text
              style={{ fontFamily: "Montserrat-Medium" }}
              className="text-sm py-0.5"
            >
              Détails
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProfessionalCard;
