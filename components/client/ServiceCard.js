import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

import { Entypo } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectBasketServicesWithID,
} from "../../slices/basketSlice";

const ServiceCard = ({
  name,
  durationMax,
  durationMin,
  price,
  image,
  id,
  category,
}) => {
  const dispatch = useDispatch();
  const services = useSelector((state) =>
    selectBasketServicesWithID(state, id)
  );
  const addServiceToBasket = () => {
    dispatch(addToBasket({ image, name, price, id, category }));
  };
  const removeServiceFromBasket = () => {
    dispatch(removeFromBasket({ id }));
  };
  return (
    <View className="flex-1 flex-row bg-white p-4 rounded-md mb-4 items-center">
      <Image
        source={{
          uri: image,
        }}
        className="h-24 w-24 rounded-md"
      />
      <View className="ml-4">
        <Text style={{ fontFamily: "Montserrat-SemiBold" }} className="text-lg">
          {name}
        </Text>
        <View className="flex-row  mt-1 ">
          <Text
            style={{ fontFamily: "Montserrat-Medium" }}
            className="text-gray-500 "
          >
            {durationMin}-{durationMax} min
          </Text>
          <Text
            style={{ fontFamily: "Montserrat-Medium" }}
            className="text-gray-500  ml-4"
          >
            {price} DZD
          </Text>
        </View>
        <View className="flex-row space-x-2  items-center mt-3">
          <Text style={{ fontFamily: "Montserrat-Medium" }} className="text-pr">
            Pour
          </Text>
          <TouchableOpacity
            className="bg-pr rounded-md p-1"
            onPress={removeServiceFromBasket}
            disabled={!services.length}
          >
            <Entypo name="minus" size={18} color="#fff" />
          </TouchableOpacity>
          <Text
            style={{ fontFamily: "Montserrat-SemiBold" }}
            className="text-pr text-lg"
          >
            {services.length}
          </Text>
          <TouchableOpacity
            className="bg-pr rounded-md p-1"
            onPress={addServiceToBasket}
          >
            <Entypo name="plus" size={18} color="#fff" />
          </TouchableOpacity>
          <Text style={{ fontFamily: "Montserrat-Medium" }} className="text-pr">
            Personne(s)
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ServiceCard;
