import { Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const CategoryCard = ({ image, name, id }) => {
  const navigator = useNavigation();
  return (
    <TouchableOpacity
      className="relative mb-6  w-full h-40"
      onPress={() => navigator.navigate("Category", { name, id })}
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        elevation: 4,
        shadowColor: "#000000",
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: {
          width: 0,
          height: 4,
        },
      }}
    >
      <Image
        source={{
          uri: image,
        }}
        className="w-full h-full rounded-md"
      />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.5)"]}
        className="absolute top-0 w-full h-40 rounded-md"
      />
      <Text
        className="absolute bottom-2 left-2 text-ct text-xl"
        style={{ fontFamily: "Montserrat-SemiBold" }}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;
