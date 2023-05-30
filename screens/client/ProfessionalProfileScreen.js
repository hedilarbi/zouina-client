import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";

import { useNavigation, useRoute } from "@react-navigation/native";
import { getProfessionalByID } from "../../api/professional";
import { AntDesign } from "@expo/vector-icons";

import ProfessionalProfileTab from "../../components/client/ProfessionalProfileTab";
import Avatar from "../../components/Avatar";
import { useDispatch } from "react-redux";
import { setProfessional } from "../../slices/professionalSlice";

const ProfessionalProfileScreen = () => {
  const route = useRoute();
  const [professionalProfile, setProfessionalProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const chooseProfessional = () => {
    dispatch(
      setProfessional({
        user: {
          image: professionalProfile.user.image,
          full_name: professionalProfile.user.full_name,
        },
        id: professionalProfile._id,
      })
    );
    navigation.navigate("Confirm", {
      type: route.params.type,
      date: route.params.date,
      time: route.params.time,
    });
  };
  const getProfessional = async () => {
    try {
      const { data } = await getProfessionalByID(route.params.id);

      setProfessionalProfile(data);
      setIsLoading(false);
    } catch (error) {
      if (error.response) {
        Alert.alert("Problème interne");
      } else {
        Alert.alert("problème internet");
      }
    }
  };
  useEffect(() => {
    getProfessional();
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <View className=" bg-white flex-1 justify-between">
      <View className="flex-row items-center p-4 border-b-2 border-pr">
        <Avatar
          image={professionalProfile.user.image}
          size="large"
          radius="full"
        />
        <View className="ml-6 space-y-2">
          <Text
            style={{ fontFamily: "Montserrat-SemiBold" }}
            className="text-xl text-txt"
          >
            {professionalProfile.user.full_name}
          </Text>
          <View className="flex-row items-center space-x-2">
            {professionalProfile.specialities.map((speciality, index) => {
              return (
                <Text
                  key={index}
                  style={{ fontFamily: "Montserrat-Medium" }}
                  className="bg-gray-300 px-2 py-0.5 rounded-full"
                >
                  {speciality}
                </Text>
              );
            })}
          </View>
          <View className="flex-row space-x-2 items-center">
            <AntDesign name="star" size={20} color="#BD72C8" />
            <Text
              style={{ fontFamily: "Montserrat-Medium" }}
              className="text-txt"
            >
              {Math.round(professionalProfile.rating.rate)}
            </Text>
            <Text
              className="text-txt"
              style={{ fontFamily: "Montserrat-Medium" }}
            >
              ({professionalProfile.rating.rating_number} reviews)
            </Text>
          </View>
        </View>
      </View>
      <View className="flex-1">
        <ProfessionalProfileTab
          gallery={professionalProfile.gallery}
          comments={professionalProfile.comments}
        />
      </View>
      <View>
        <TouchableOpacity
          className="bg-pr px-6 py-3 rounded-md my-8 mx-6"
          onPress={chooseProfessional}
        >
          <Text
            style={{ fontFamily: "Montserrat-SemiBold" }}
            className="text-white text-lg py-0.5 text-center"
          >
            Choisir
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfessionalProfileScreen;
