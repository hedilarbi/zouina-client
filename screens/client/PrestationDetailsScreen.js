import { View, Text, Alert, ScrollView, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { getPrestation } from "../../api/prestations";

import PrestationTag from "../../components/client/PrestationTag";
import FormatedDate from "../../components/client/FormatedDate";
import { AntDesign } from "@expo/vector-icons";
const PrestationDetailsScreen = ({ route }) => {
  const id = route.params.id;
  const [prestation, setPrestation] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const getClientPrestation = async () => {
    try {
      const { data } = await getPrestation(id);
      setPrestation(data);
      setIsLoading(false);
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  useEffect(() => {
    getClientPrestation();
  }, []);
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView className="flex-1 bg-white py-4 px-2">
      <View className=" bg-gray-100 p-4 rounded-md">
        {prestation.type === "Schedual" ? (
          <View className="flex-row justify-between items-center">
            <Text style={{ fontFamily: "Montserrat-SemiBold" }}>
              Réservation
            </Text>
            <PrestationTag state={prestation.state} />
          </View>
        ) : (
          <Text style={{ fontFamily: "Montserrat-SemiBold" }}>
            Date et Heure
          </Text>
        )}
        <FormatedDate
          schedual_date={prestation.schedual_date}
          finishedAt={prestation.finishedAt}
          state={prestation.state}
        />
      </View>
      <View className="bg-gray-100 p-4 rounded-md mt-2">
        <Text style={{ fontFamily: "Montserrat-SemiBold" }}>
          {prestation.services[0].service.category.name}
        </Text>
        <View className="mt-4">
          {prestation.services.map((service) => {
            return (
              <View className="flex-row mb-2" key={service._id}>
                <Text style={{ fontFamily: "Montserrat-Medium" }}>
                  {service.quantity} x
                </Text>
                <Text
                  style={{ fontFamily: "Montserrat-Medium" }}
                  className="flex-1 ml-4"
                >
                  {service.service.name}
                </Text>
                <Text
                  style={{ fontFamily: "Montserrat-Medium" }}
                  className="ml-2"
                >
                  {service.service.price * service.quantity} DZD
                </Text>
              </View>
            );
          })}
        </View>
        <View className="mt-4">
          <Text style={{ fontFamily: "Montserrat-SemiBold" }}>
            Proffessionnelle
          </Text>
          <View className="flex-row items-center mt-4">
            {prestation.professional.user.image != null ? (
              <Image
                source={{ uri: prestation.professional.user.image }}
                className="h-12 w-12 rounded-full "
              />
            ) : (
              <View className="bg-pr rounded-full justify-center items-center h-10 w-10 ">
                <Text
                  className="text-white text-xl"
                  style={{ fontFamily: "Montserrat-SemiBold" }}
                >
                  {prestation.professional.user.full_name[0]}
                </Text>
              </View>
            )}
            <View className="ml-4">
              <Text className="" style={{ fontFamily: "Montserrat-Medium" }}>
                {prestation.professional.user.full_name}
              </Text>
              <View className="flex-row items-center">
                <AntDesign name="star" size={18} color="gold" />
                <Text
                  style={{ fontFamily: "Montserrat-Medium" }}
                  className="ml-1"
                >
                  {prestation.professional.rating.rate}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default PrestationDetailsScreen;
