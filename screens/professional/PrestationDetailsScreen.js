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
import Avatar from "../../components/Avatar";

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
      if (error.response) {
        Alert.alert("Problème interne");
      } else {
        Alert.alert("problème internet");
      }
    }
  };

  useEffect(() => {
    getPrestation();
  }, []);
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center z-50 ">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white py-4 px-2">
      <View className=" bg-gray-100 p-4 rounded-md">
        {prestation.type === "Schedual" ? (
          <View className="flex-row justify-between items-center">
            <Text
              style={{ fontFamily: "Montserrat-SemiBold" }}
              className="text-txt text-lg"
            >
              Réservation
            </Text>
            <PrestationTag state={prestation.state} />
          </View>
        ) : (
          <Text
            style={{ fontFamily: "Montserrat-SemiBold" }}
            className="text-lg"
          >
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
        <Text style={{ fontFamily: "Montserrat-SemiBold" }} className="text-lg">
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
            <Text
              className="text-txt"
              style={{ fontFamily: "Montserrat-SemiBold" }}
            >
              Totale:
            </Text>
            <Text
              style={{ fontFamily: "Montserrat-SemiBold" }}
              className="text-txt"
            >
              {prestation.total_price} DZD
            </Text>
          </View>
        </View>
      </View>
      <View className=" bg-gray-100 p-4 mt-2 rounded-md">
        <Text
          className="text-txt text-lg"
          style={{ fontFamily: "Montserrat-SemiBold" }}
        >
          Cliente
        </Text>
        <View className="flex-row items-center mt-4">
          <Avatar
            image={prestation.client.user.image}
            size="small"
            radius="full"
          />
          <View className="ml-4">
            <Text
              className="text-lg text-txt"
              style={{ fontFamily: "Montserrat-Medium" }}
            >
              {prestation.client.user.full_name}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default PrestationDetailsScreen;
