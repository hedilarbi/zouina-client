import { View, Text, Switch } from "react-native";
import React from "react";

import TimePicker from "./TimePicker";
import { AntDesign } from "@expo/vector-icons";

const WorkingDayConfig = ({ workingDay, setWorkingTime }) => {
  const { day, state, afternoon_session, morning_session } = workingDay;

  const toggleSwitch = () => {
    setWorkingTime((prevState) => {
      const newState = prevState.map((obj) => {
        if (obj.day === day) {
          return { ...obj, state: !state };
        }
        return obj;
      });
      return newState;
    });
  };

  return (
    <View className="bg-gray-100 rounded-md w-full px-2 py-3 mt-4">
      <View className="flex-row justify-between items-center">
        <Text
          style={{ fontFamily: "Montserrat-SemiBold" }}
          className="text-lg capitalize text-txt"
        >
          {day}
        </Text>
        <Switch
          trackColor={{ false: "gray", true: "#BD72C8" }}
          thumbColor="white"
          value={state}
          onValueChange={toggleSwitch}
        />
      </View>
      {state && (
        <View>
          <View className="flex-row items-center space-x-4">
            <Text
              style={{ fontFamily: "Montserrat-Medium" }}
              className="w-16 text-txt"
            >
              Matin
            </Text>
            <TimePicker
              session="morning_session"
              setWorkingTime={setWorkingTime}
              state="open"
              day={day}
              time={morning_session.open}
            />
            <AntDesign
              name="arrowright"
              size={24}
              color="black"
              className="ml-4"
            />
            <TimePicker
              session="morning_session"
              setWorkingTime={setWorkingTime}
              state="close"
              day={day}
              time={morning_session.close}
            />
          </View>
          <View className="flex-row items-center space-x-4 mt-4">
            <Text
              style={{ fontFamily: "Montserrat-Medium" }}
              className="w-16 tex-txt"
            >
              Soir
            </Text>
            <TimePicker
              session="afternoon_session"
              setWorkingTime={setWorkingTime}
              state="open"
              day={day}
              time={afternoon_session.open}
            />
            <AntDesign
              name="arrowright"
              size={24}
              color="black"
              className="ml-4"
            />
            <TimePicker
              session="afternoon_session"
              setWorkingTime={setWorkingTime}
              state="close"
              day={day}
              time={afternoon_session.close}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default WorkingDayConfig;
