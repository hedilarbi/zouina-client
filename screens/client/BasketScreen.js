import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectBasketServices } from "../../slices/basketSlice";
import { useEffect } from "react";
import BasketCard from "../../components/client/BasketCard";
import { useNavigation } from "@react-navigation/native";
import useGroupServicesInBasket from "../../hooks/useGroupServicesInBasket";

const BasketScreen = () => {
  const navigation = useNavigation();
  const services = useSelector(selectBasketServices);
  const groupedServicesInBasket = useGroupServicesInBasket(services);

  return (
    <View className=" py-2 flex-1 justify-between bg-white">
      {services.length === 0 && (
        <View className="flex-1 justify-center items-center">
          <Text
            className="text-txt text-lg"
            style={{ fontFamily: "Montserrat-SemiBold" }}
          >
            Panier Vide
          </Text>
        </View>
      )}
      <ScrollView>
        {Object.entries(groupedServicesInBasket).map(([key, services]) => {
          return <BasketCard services={services} key={key} id={key} />;
        })}
      </ScrollView>
      {services.length != 0 && (
        <TouchableOpacity
          className=" mx-4 bg-pr py-3 rounded-md"
          onPress={() =>
            navigation.navigate("Appointement", {
              category: services[0].category,
            })
          }
        >
          <Text
            className="text-center text-xl text-white"
            style={{ fontFamily: "Montserrat-Bold" }}
          >
            Selectioner professionel
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default BasketScreen;
