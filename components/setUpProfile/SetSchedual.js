import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";

import WorkingDayConfig from "../professional/WorkingDayConfig";
import { FontAwesome } from "@expo/vector-icons";

const SetSchedual = ({
  slideAnimValue,
  width,
  handlePrevious,
  handleNext,
  workingTime,
  setWorkingTime,
}) => {
  return (
    <Animated.View
      style={{
        transform: [{ translateX: slideAnimValue }],
        width: width,
      }}
      className="py-4 px-4 "
    >
      <View className="flex-row justify-between">
        <TouchableOpacity onPress={handlePrevious}>
          <FontAwesome name="chevron-left" size={30} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext}>
          <Text
            className="text-gray-400 text-xl"
            style={{ fontFamily: "Montserrat-Bold" }}
          >
            SKIP
          </Text>
        </TouchableOpacity>
      </View>
      <Text
        className="text-txt text-center text-xl mt-2"
        style={{ fontFamily: "Montserrat-SemiBold" }}
      >
        Emploie du temps
      </Text>
      <Text
        className="text-txt text-center text-lg"
        style={{ fontFamily: "Montserrat-Medium" }}
      >
        Veuillez configurer vos heures de travail
      </Text>
      <ScrollView className="flex-1 mt-2" showsVerticalScrollIndicator={false}>
        {workingTime.map((workingDay, index) => {
          return (
            <WorkingDayConfig
              key={index}
              workingDay={workingDay}
              setWorkingTime={setWorkingTime}
            />
          );
        })}
      </ScrollView>
      <TouchableOpacity
        className="bg-pr mt-5 w-2/3 mx-auto py-2 rounded-md"
        onPress={handleNext}
      >
        <Text
          className="text-center text-white text-lg"
          style={{ fontFamily: "Montserrat-SemiBold" }}
        >
          SUIVANT
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default SetSchedual;
