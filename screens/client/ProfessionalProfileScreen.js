import { View, Text, Image, ActivityIndicator, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import { getProfessionalByID } from "../../api/professional";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import ProfessionalProfileTab from "../../components/client/ProfessionalProfileTab";

const ProfessionalProfileScreen = () => {
  const route = useRoute();
  const [professional, setProfessional] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const getProfessional = async () => {
    try {
      const { data } = await getProfessionalByID(route.params.id);

      setProfessional(data);
      setIsLoading(false);
    } catch (error) {
      Alert.alert(error.message);
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
    <View className=" bg-white flex-1">
      <View className="flex-row items-center p-4 border-b-2 border-pr">
        {professional.user.image ? (
          <Image
            source={{
              uri: professional.user.image,
            }}
            className="h-32 w-32 rounded-full"
          />
        ) : (
          <View className="items-center justify-center rounded-full h-32 w-32">
            <Text
              className="text-white text-2xl"
              style={{ fontFamily: "Montserrat-SemiBold" }}
            >
              {professional.user.full_name[0]}
            </Text>
          </View>
        )}
        <View className="ml-6 space-y-2">
          <Text
            style={{ fontFamily: "Montserrat-SemiBold" }}
            className="text-xl"
          >
            {professional.user.full_name}
          </Text>
          <View className="flex-row items-center space-x-2">
            {professional.specialities.map((speciality, index) => {
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
            <AntDesign name="star" size={20} color="#FA69B7" />
            <Text style={{ fontFamily: "Montserrat-Medium" }}>
              {Math.round(professional.rating.rate)}
            </Text>
            <Text className="" style={{ fontFamily: "Montserrat-Medium" }}>
              ({professional.rating.rating_number} reviews)
            </Text>
          </View>
          <View className="flex-row space-x-2 items-center">
            <Entypo name="location-pin" size={20} color="#FA69B7" />
            <Text
              style={{ fontFamily: "Montserrat-Medium" }}
              className="text-sm"
            >
              5 Km
            </Text>
          </View>
        </View>
      </View>
      <View className="flex-1">
        <ProfessionalProfileTab
          gallery={professional.gallery}
          comments={professional.comments}
        />
      </View>
    </View>
  );
};

export default ProfessionalProfileScreen;
