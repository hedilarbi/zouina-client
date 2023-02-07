import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { finishPrestation, getPrestationByID } from "../../api/prestations";
import io from "socket.io-client";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { deleteItemAsync } from "expo-secure-store";

const OnJobScreen = ({ route, navigation }) => {
  const { prestationId } = route.params;

  const [isLoading, setIsLoading] = useState(true);
  const [prestation, setPrestation] = useState(null);

  const getPrestation = async () => {
    try {
      const { data } = await getPrestationByID(prestationId);
      setPrestation(data);

      setIsLoading(false);
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  useEffect(() => {
    getPrestation();
  }, []);

  const finishJob = async () => {
    setIsLoading(true);
    const socket = io.connect("http://192.168.1.24:5000");
    finishPrestation(prestationId);
    await deleteItemAsync("prestationId");
    socket.emit("finish-prestation", { response: "finish", prestationId });
    setIsLoading(false);
    navigation.navigate("MainNavigator");
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
      <Text className="text-xl" style={{ fontFamily: "Montserrat-SemiBold" }}>
        Cliente
      </Text>

      <View className="mt-4 rounded-md bg-white px-2 py-4 space-y-2">
        <View className="flex-row items-center">
          <View className="bg-pr rounded-full justify-center items-center h-9 w-9">
            {prestation.client.user.image ? (
              <Image
                source={{ uri: prestation.client.user.image }}
                className="h-9 w-9 rounded-full"
                style={{ resizeMode: "cover" }}
              />
            ) : (
              <Text
                className="text-white text-xl"
                style={{ fontFamily: "Montserrat-SemiBold" }}
              >
                {prestation.client.user.full_name[0]}
              </Text>
            )}
          </View>
          <Text
            className="ml-2 text-lg"
            style={{ fontFamily: "Montserrat-Medium" }}
          >
            {prestation.client.user.full_name}
          </Text>
        </View>
        <View className="flex-row items-center">
          <Entypo name="phone" size={24} color="gray" />
          <Text
            style={{ fontFamily: "Montserrat-Medium" }}
            className="ml-2 text-lg"
          >
            {prestation.client.user.phone_number}
          </Text>
        </View>
        <View className="flex-row items-center">
          <Ionicons name="location" size={24} color="gray" />
          <Text
            style={{ fontFamily: "Montserrat-Medium" }}
            className="ml-2 text-lg"
          >
            {prestation.client.user.address}
          </Text>
        </View>
      </View>
      <Text
        className="text-xl my-2"
        style={{ fontFamily: "Montserrat-SemiBold" }}
      >
        Services
      </Text>
      <ScrollView className="rounded-md bg-white flex-1 px-2 py-4">
        {prestation.services.map((service, index) => {
          return (
            <View key={index} className="justify-between mb-2 flex-row">
              <Text className="" style={{ fontFamily: "Montserrat-Medium" }}>
                {service.quantity} X {service.service.name}
              </Text>
              <Text style={{ fontFamily: "Montserrat-Medium" }}>
                {service.service.price} DZD
              </Text>
            </View>
          );
        })}
      </ScrollView>
      <View className="my-2 bg-white  px-2 py-4 flex-row justify-between rounded-md">
        <Text className="text-xl" style={{ fontFamily: "Montserrat-SemiBold" }}>
          Totale
        </Text>
        <Text className="text-xl" style={{ fontFamily: "Montserrat-Medium" }}>
          {prestation.total_price} DZD
        </Text>
      </View>
      <TouchableOpacity
        className="bg-pr rounded-md py-2 mb-2 mt-4 "
        onPress={finishJob}
      >
        <Text
          className="text-xl text-center text-white"
          style={{ fontFamily: "Montserrat-SemiBold" }}
        >
          Terminer
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OnJobScreen;
