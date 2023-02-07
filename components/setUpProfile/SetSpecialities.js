import { View, Text, Animated, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
const SetSpecialities = ({
  slideAnimValue,
  width,
  handlePrevious,
  handleNext,
  specialities,
  setSpecialities,
}) => {
  const specialitiesList = ["Onglerie", "Coiffure", "Maquillage"];

  return (
    <Animated.View
      style={{
        transform: [{ translateX: slideAnimValue }],
        width: width,
      }}
      className="py-8 px-4 justify-between"
    >
      <TouchableOpacity onPress={handlePrevious}>
        <FontAwesome name="chevron-left" size={30} color="gray" />
      </TouchableOpacity>
      <View className="flex-1 mt-4 ">
        <Text
          style={{ fontFamily: "Montserrat-SemiBold" }}
          className="text-center text-gray-500 text-xl"
        >
          Selectionner votre/vos spécialité(s)
        </Text>
        <View className="flex-row  flex-wrap justify-self-center mt-10 space-x-4">
          {specialitiesList.map((item, index) => (
            <TouchableOpacity
              className=""
              key={index}
              onPress={() => {
                if (specialities.includes(item)) {
                  setSpecialities(specialities.filter((i) => i !== item));
                } else {
                  setSpecialities([...specialities, item]);
                }
              }}
            >
              <Text
                style={{ fontFamily: "Montserrat-Medium" }}
                className={
                  specialities.includes(item)
                    ? "text-lg text-center bg-pr text-white border-2 border-pr rounded-full px-6 py-1 mb-2"
                    : "text-lg text-center border-2 border-pr rounded-full px-6 py-1 mb-2"
                }
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <TouchableOpacity
        className={
          specialities.length != 0
            ? "bg-pr mt-10 w-2/3 mx-auto py-2 rounded-md"
            : "bg-gray-500 mt-10 w-2/3 mx-auto py-2 rounded-md"
        }
        disabled={specialities.length != 0 ? false : true}
        onPress={handleNext}
      >
        <Text
          className="text-center text-white text-lg"
          style={{ fontFamily: "Montserrat-SemiBold" }}
        >
          Suivant
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default SetSpecialities;
