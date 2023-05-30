import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";

import * as Location from "expo-location";
import { PROVIDER_GOOGLE } from "react-native-maps";

import { updateAddress } from "../api/user";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "../slices/userSlice";
import { useNavigation } from "@react-navigation/native";

const SetAddress = () => {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { _id } = useSelector(selectUser);
  const API_KEY = "AIzaSyDZHJsqwlavl1jvOfbaFUTcWfkooFLG0Iw";
  const handleLocation = async () => {
    Location.setGoogleApiKey(API_KEY);

    try {
      const { status: existingStatus } =
        await Location.getForegroundPermissionsAsync();
      if (existingStatus !== "granted") {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          alert("localisation obligatoire pour le bon fonctionnement de l'app");
        }
      }
      const data = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      });

      setLocation({
        latitude: data.coords.latitude,
        longitude: data.coords.longitude,
      });
    } catch (error) {
      Alert.alert("Couldn't get Location");
    }

    setIsLoading(false);
  };
  useEffect(() => {
    handleLocation();
  }, []);
  const handleNext = async () => {
    setIsLoading(true);
    try {
      const { data } = await updateAddress(_id, (address = ""), location);
      dispatch(setUser(data));
      navigation.navigate("ProfileSetup");
    } catch (error) {
      if (error.response) {
        Alert.alert("Problème interne");
      } else {
        Alert.alert("problème internet");
      }
    }
  };

  if (isLoading) {
    return (
      <View className="justify-center items-center flex-1 ">
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <>
      <View className="flex-1 p-5">
        <MapView
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          provider={PROVIDER_GOOGLE}
          onPress={(e) => {
            setLocation({
              longitude: e.nativeEvent.coordinate.longitude,
              latitude: e.nativeEvent.coordinate.latitude,
            });
          }}
          className="flex-1"
        >
          <Marker coordinate={location} />
        </MapView>
      </View>

      <TouchableOpacity
        className={
          location.longitude === 0 || location.latitude === 0
            ? "bg-gray-500 mt-10 w-2/3 mx-auto rounded-md py-2"
            : "bg-pr mt-10 w-2/3 mx-auto py-2 rounded-md"
        }
        onPress={handleNext}
        disabled={
          location.longitude === 0 || location.latitude === 0 ? true : false
        }
      >
        <Text
          className="text-center text-white text-lg"
          style={{ fontFamily: "Montserrat-SemiBold" }}
        >
          SUIVANT
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default SetAddress;
