import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
  ScrollView,
  Linking,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  finishPrestation,
  getPrestationByID,
  professionalAtDestination,
} from "../../api/prestations";
import io from "socket.io-client";
import { Entypo, Ionicons } from "@expo/vector-icons";

import { deleteItemAsync } from "expo-secure-store";
import * as Location from "expo-location";
import Avatar from "../../components/Avatar";

const GOOGLE_MAPS_BASE_URL = "https://www.google.com/maps/dir/";
const API_KEY = "AIzaSyDZHJsqwlavl1jvOfbaFUTcWfkooFLG0Iw";

const OnJobScreen = ({ route, navigation }) => {
  const { prestationId } = route.params;

  const [isAtDestination, setIsAtDestination] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [prestation, setPrestation] = useState(null);

  const getPrestation = async () => {
    Location.setGoogleApiKey(API_KEY);
    try {
      const { data } = await getPrestationByID(prestationId);
      const address = await reverseGeocode(data.client.user.location);

      setPrestation({
        ...data,
        client: {
          ...data.client,
          user: { ...data.client.user, address: address[0] },
        },
      });

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

  const atDestination = async () => {
    setIsLoading(true);
    try {
      professionalAtDestination(prestationId);
      setIsAtDestination(true);
      setIsLoading(false);
    } catch (err) {
      if (err.response) {
        Alert.alert("problème interne");
      } else {
        Alert.alert("problème internet");
      }
    }
  };

  const finishJob = async () => {
    setIsLoading(true);

    try {
      finishPrestation(prestationId);
      await deleteItemAsync("prestationId");
    } catch (err) {
      if (err.response) {
        Alert.alert("problème interne");
      } else {
        Alert.alert("problème internet");
      }
    }

    setIsLoading(false);
    navigation.navigate("MainNavigator");
  };

  const openInGoogleMap = async () => {
    try {
      const { status: existingStatus } =
        await Location.getForegroundPermissionsAsync();
      if (existingStatus !== "granted") {
        const { status } = Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          alert("localisation obligatoire pour le bon déroulement");
          return null;
        }
      }
      let userLocation = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      });

      const { latitude, longitude } = userLocation.coords;
      const origin = `${latitude},${longitude}`;

      const destination = `${prestation.client.user.location.latitude},${prestation.client.user.location.longitude}`;
      const url = `${GOOGLE_MAPS_BASE_URL}${origin}/${destination}`;
      if (Linking.canOpenURL(url)) {
        Linking.openURL(url);
      } else {
        alert("can not open maps from this device");
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        Alert.alert("Problème interne");
      } else {
        Alert.alert("problème internet");
      }
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white ">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 px-4 py-2">
      <Text
        className="text-xl text-txt"
        style={{ fontFamily: "Montserrat-SemiBold" }}
      >
        Cliente
      </Text>

      <View className="mt-4 rounded-md bg-white px-2 py-4 space-y-2">
        <View className="flex-row items-center">
          <Avatar
            image={prestation.client.user.image}
            radius="full"
            size="small"
          />
          <Text
            className="ml-2 text-lg text-txt"
            style={{ fontFamily: "Montserrat-Medium" }}
          >
            {prestation.client.user.full_name}
          </Text>
        </View>
        <View className="flex-row items-center">
          <Entypo name="phone" size={24} color="gray" />
          <Text
            style={{ fontFamily: "Montserrat-Medium" }}
            className="ml-2 text-lg text-txt"
          >
            {prestation.client.user.phone_number}
          </Text>
        </View>
        <View className="flex-row items-center justify-between">
          <View className="flex-row flex-1 items-center">
            <Ionicons name="location" size={24} color="gray" />
            <Text
              style={{ fontFamily: "Montserrat-Medium" }}
              className="ml-2 text-base text-txt"
            >
              {prestation.client.user.address.city}
            </Text>
          </View>
          <TouchableOpacity className="" onPress={openInGoogleMap}>
            <Text
              style={{ fontFamily: "Montserrat-Medium" }}
              className="text-base text-pr"
            >
              Ouvrir dans map
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text
        className="text-xl my-2 text-txt"
        style={{ fontFamily: "Montserrat-SemiBold" }}
      >
        Services
      </Text>
      <ScrollView className="rounded-md bg-white flex-1 px-2 py-4">
        {prestation.services.map((service, index) => {
          return (
            <View key={index} className="justify-between mb-2 flex-row">
              <Text
                className="text-txt"
                style={{ fontFamily: "Montserrat-Medium" }}
              >
                {service.quantity} X {service.service.name}
              </Text>
              <Text
                style={{ fontFamily: "Montserrat-Medium" }}
                className="text-txt"
              >
                {service.service.price} DZD
              </Text>
            </View>
          );
        })}
      </ScrollView>
      <View className="my-2 bg-white  px-2 py-4 flex-row justify-between rounded-md">
        <Text
          className="text-xl text-txt"
          style={{ fontFamily: "Montserrat-SemiBold" }}
        >
          Totale
        </Text>
        <Text
          className="text-xl text-txt"
          style={{ fontFamily: "Montserrat-Medium" }}
        >
          {prestation.total_price} DZD
        </Text>
      </View>
      {!isAtDestination && (
        <TouchableOpacity
          className="bg-ct rounded-md py-2 mb-2 mt-4 "
          onPress={atDestination}
        >
          <Text
            className="text-xl text-center text-white"
            style={{ fontFamily: "Montserrat-SemiBold" }}
          >
            Arrivé à destination
          </Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        className="bg-pr rounded-md py-2 mb-2 mt-4 "
        onPress={finishJob}
      >
        <Text
          className="text-xl text-center text-white"
          style={{ fontFamily: "Montserrat-SemiBold" }}
        >
          Terminer Prestation
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

async function reverseGeocode(location) {
  const reverseGeocodeAddress = await Location.reverseGeocodeAsync(
    {
      latitude: location.latitude,
      longitude: location.longitude,
    },
    {
      useGoogleMaps: true,
    }
  );

  return reverseGeocodeAddress;
}
export default OnJobScreen;
