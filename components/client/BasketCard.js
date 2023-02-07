import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import { removeFromBasket } from "../../slices/basketSlice";

const BasketCard = ({ services, id }) => {
  const dispatch = useDispatch();
  return (
    <View className="flex-row items-center space-x-3 bg-white py-2 px-5 border-b border-pr">
      <Text
        className="text-pr text-lg"
        style={{ fontFamily: "Montserrat-Medium" }}
      >
        {services.length} x
      </Text>

      <Text
        numberOfLines={1}
        className="flex-1 text-lg"
        style={{ fontFamily: "Montserrat-Medium" }}
      >
        {services[0].name}
      </Text>
      <Text
        className="text-gray-600 text-lg"
        style={{ fontFamily: "Montserrat-Medium" }}
      >
        {services[0].price}
      </Text>
      <TouchableOpacity onPress={() => dispatch(removeFromBasket({ id }))}>
        <Text
          className="text-pr text-sm"
          style={{ fontFamily: "Montserrat-Medium" }}
        >
          Retirer
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketCard;
