import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import WorkingDayConfig from "./WorkingDayConfig";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateSchedual } from "../../api/professional";

import { selectData, setData } from "../../slices/userSlice";

const Schedual = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { schedual, _id } = useSelector(selectData);
  const [workingTime, setWorkingTime] = useState(schedual);

  const saveSchedual = async () => {
    setIsLoading(true);
    try {
      const { data } = await updateSchedual(_id, workingTime);
      dispatch(setData(data));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      Alert.alert(error.message);
    }
  };

  return (
    <View className="flex-1 bg-white px-2  pb-5">
      {isLoading && (
        <View className="absolute w-full h-full justify-center items-center z-50 ">
          <ActivityIndicator size="large" />
        </View>
      )}

      <ScrollView className="" showsVerticalScrollIndicator={false}>
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
        className="mt-5 bg-pr py-3 rounded-md"
        onPress={saveSchedual}
      >
        <Text
          style={{ fontFamily: "Montserrat-SemiBold" }}
          className="text-xl text-center text-white"
        >
          Sauvegarder
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Schedual;
