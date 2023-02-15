import { View, Text, Animated, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { useEffect } from "react";
import io from "socket.io-client";

import { AntDesign } from "@expo/vector-icons";
import { cancelPrestation } from "../../api/prestations";
import { setItemAsync } from "expo-secure-store";
import { useDispatch } from "react-redux";
import { clearBasket } from "../../slices/basketSlice";

const socket = io.connect("http://192.168.1.4:5000");
export default function WaitingScreen({ route, navigation }) {
  const dispatch = useDispatch();
  const { prestationId, category } = route.params;
  const savePrestationId = async () => {
    dispatch(clearBasket());
    await setItemAsync("prestationId", prestationId);

    navigation.navigate("Home");
  };
  useEffect(() => {
    socket.emit("request-prestation", {
      prestationId,
    });
    socket.on("professionalResponse", (response) => {
      if (response === "accept") {
        savePrestationId();
      } else {
        navigation.navigate("Home");
      }
    });
    return () => {
      socket.off("professionalResponse");
    };
  }, []);

  const handleCancelPrestation = async () => {
    try {
      await cancelPrestation(prestationId);
      navigation.navigate("Appointement", { category: category });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View className="items-center justify-center flex-1 bg-white">
      <Animated.Image
        source={require("../../assets/dots-loading.gif")}
        className="h-80 w-80"
      />
      <Text
        className="text-2xl text-center"
        style={{ fontFamily: "Montserrat-SemiBold" }}
      >
        En cours de traitement
      </Text>

      <TouchableOpacity
        className="justify-center items-center bg-red-500 rounded-full p-2 mt-28 "
        onPress={handleCancelPrestation}
      >
        <AntDesign name="close" size={40} color="white" />
      </TouchableOpacity>

      <Text
        className="text-xl mt-4"
        style={{ fontFamily: "Montserrat-SemiBold" }}
      >
        Annuler
      </Text>
    </View>
  );
}
