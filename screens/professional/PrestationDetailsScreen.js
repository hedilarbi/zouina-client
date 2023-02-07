import {
  View,
  Text,
  Alert,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";

import PrestationTag from "../../components/client/PrestationTag";
import FormatedDate from "../../components/client/FormatedDate";
import { getProfessionalPrestation } from "../../api/prestations";

const PrestationDetailsScreen = ({ route }) => {
  const id = route.params.id;
  const [prestation, setPrestation] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getPrestation = async () => {
    try {
      const { data } = await getProfessionalPrestation(id);
      setPrestation(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      Alert.alert(error.message);
    }
  };

  useEffect(() => {
    getPrestation();
  }, []);
  if (isLoading) {
    return (
      <View className="absolute w-full h-full justify-center items-center z-50 ">
        <ActivityIndicator size="large" />
      </View>
    );
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
          finishedAt={prestation.createdAt}
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
          <View className="flex-row justify-between mt-4">
            <Text style={{ fontFamily: "Montserrat-SemiBold" }}>Totale:</Text>
            <Text style={{ fontFamily: "Montserrat-SemiBold" }}>
              {prestation.total_price} DZD
            </Text>
          </View>
        </View>
      </View>
      <View className=" bg-gray-100 p-4 mt-2 rounded-md">
        <Text style={{ fontFamily: "Montserrat-SemiBold" }}>Cliente</Text>
        <View className="flex-row items-center mt-4">
          {prestation.client.user.image != null ? (
            <Image
              source={{ uri: prestation.client.user.image }}
              className="h-12 w-12 rounded-full "
            />
          ) : (
            <View className="bg-pr rounded-full justify-center items-center h-10 w-10 ">
              <Text
                className="text-white text-xl"
                style={{ fontFamily: "Montserrat-SemiBold" }}
              >
                {prestation.client.user.full_name[0]}
              </Text>
            </View>
          )}
          <View className="ml-4">
            <Text className="" style={{ fontFamily: "Montserrat-Medium" }}>
              {prestation.client.user.full_name}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default PrestationDetailsScreen;
