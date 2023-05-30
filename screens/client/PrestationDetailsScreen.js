import {
  View,
  Text,
  Alert,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { cancelPrestation, getPrestation } from "../../api/prestations";
import { AntDesign } from "@expo/vector-icons";
import PrestationTag from "../../components/client/PrestationTag";
import FormatedDate from "../../components/client/FormatedDate";

import Avatar from "../../components/Avatar";
const PrestationDetailsScreen = ({ route, navigation }) => {
  const id = route.params.id;
  const [prestation, setPrestation] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const getClientPrestation = async () => {
    try {
      const { data } = await getPrestation(id);
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
    getClientPrestation();
  }, []);
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }
  const handleCancelPrestation = async () => {
    try {
      await deleteItemAsync("prestationId");
      await cancelPrestation(id);
      navigation.goBack();
    } catch (error) {
      if (error.response) {
        Alert.alert("Problème interne");
      } else {
        Alert.alert("problème internet");
      }
    }
  };

  const showAlert = () => {
    Alert.alert(
      "Veuillez confirmer",
      "Etes vous sure de vouloir annuler cette réservation?",
      [
        {
          text: "Annuler",

          style: "cancel",
        },
        { text: "Confirmer", onPress: () => handleCancelPrestation() },
      ]
    );
  };

  return (
    <ScrollView className="flex-1  py-4 px-4">
      <View className=" bg-white p-4 rounded-md">
        {prestation.type === "Schedual" ? (
          <View className="flex-row justify-between items-center">
            <Text
              style={{ fontFamily: "Montserrat-SemiBold" }}
              className="text-txt"
            >
              Réservation
            </Text>
            <PrestationTag state={prestation.state} />
          </View>
        ) : (
          <Text
            style={{ fontFamily: "Montserrat-SemiBold" }}
            className="text-lg text-txt"
          >
            Date et Heure
          </Text>
        )}
        <FormatedDate
          schedual_date={prestation.schedual_date}
          finishedAt={prestation.finishedAt}
          state={prestation.state}
        />
      </View>
      <View className="bg-white p-4 rounded-md mt-2">
        <Text
          style={{ fontFamily: "Montserrat-SemiBold" }}
          className="text-lg text-txt"
        >
          {prestation.services[0].service.category.name}
        </Text>
        <View className="mt-4">
          {prestation.services.map((service) => {
            return (
              <View className="flex-row mb-2" key={service._id}>
                <Text
                  style={{ fontFamily: "Montserrat-Medium" }}
                  className="text-txt"
                >
                  {service.quantity} x
                </Text>
                <Text
                  style={{ fontFamily: "Montserrat-Medium" }}
                  className="flex-1 ml-4 text-txt"
                >
                  {service.service.name}
                </Text>
                <Text
                  style={{ fontFamily: "Montserrat-Medium" }}
                  className="ml-2 text-txt"
                >
                  {service.service.price * service.quantity} DZD
                </Text>
              </View>
            );
          })}
        </View>
        <View className="mt-4">
          <Text
            style={{ fontFamily: "Montserrat-SemiBold" }}
            className="text-lg text-txt"
          >
            Proffessionnelle
          </Text>
          <View className="flex-row items-center mt-4">
            <Avatar
              image={prestation.professional.user.image}
              size="small"
              radius="full"
            />
            <View className="ml-4">
              <Text
                className="text-txt"
                style={{ fontFamily: "Montserrat-Medium" }}
              >
                {prestation.professional.user.full_name}
              </Text>
              <View className="flex-row items-center">
                <AntDesign name="star" size={18} color="gold" />
                <Text
                  style={{ fontFamily: "Montserrat-Medium" }}
                  className="ml-1 text-txt"
                >
                  {Math.round(prestation.professional.rating.rate)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      {prestation.state === "accepted" && (
        <TouchableOpacity
          className="bg-white flex-row items-center mt-4 px-2 py-4 rounded-md"
          onPress={showAlert}
        >
          <AntDesign name="closecircle" size={30} color="red" />

          <Text
            className="ml-2 text-txt"
            style={{ fontFamily: "Montserrat-Medium" }}
          >
            Annuler
          </Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

export default PrestationDetailsScreen;
