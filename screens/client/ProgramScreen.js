import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import ProfessionalCard from "../../components/client/ProfessionalCard";
import { getProfessionals } from "../../api/professional";
import { useRoute } from "@react-navigation/native";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { selectUser } from "../../slices/userSlice";

const ProgramScreen = () => {
  const [professionals, setProfessionals] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const route = useRoute();
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { location } = useSelector(selectUser);
  const getAvailablePros = async () => {
    const searchedDate = new Date(
      date.getFullYear() +
        "/" +
        (date.getMonth() + 1) +
        "/" +
        date.getDate() +
        " " +
        time.getHours() +
        ":" +
        time.getMinutes()
    );

    if (searchedDate < new Date()) {
      Alert.alert("Veuillez choisir une date convenable");
    } else {
      setIsLoading(true);
      try {
        const { data } = await getProfessionals(
          route.params.category,
          location,
          date,
          time
        );

        setProfessionals(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);

        if (error.response) {
          Alert.alert("Problème interne");
        } else {
          Alert.alert("problème internet");
        }
      }
    }
  };

  const onTimeSelected = (event, selectedDate) => {
    setShowTimePicker(false);
    setTime(selectedDate);
  };

  const onDateSelected = (event, selectedDate) => {
    setShowDatePicker(false);
    setDate(selectedDate);
  };
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center ">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View className=" flex-1 py-4 px-2">
      <View className=" bg-white p-4 rounded-md">
        <View className="flex-row justify-between space-x-2">
          <TouchableOpacity
            onPress={() => setShowTimePicker(true)}
            className="p-2 rounded-md border justify-center flex-1"
          >
            <View className="flex-row items-center">
              <AntDesign name="clockcircleo" size={18} color="black" />
              <Text
                style={{ fontFamily: "Montserrat-SemiBold" }}
                className="ml-2 text-txt"
              >
                {time.getHours() < 10 ? "0" + time.getHours() : time.getHours()}{" "}
                :
                {time.getMinutes() < 10
                  ? "0" + time.getMinutes()
                  : time.getMinutes()}
              </Text>
            </View>
            {showTimePicker && (
              <RNDateTimePicker
                testID="timePicker"
                value={time}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={onTimeSelected}
                minuteInterval={15}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            className="bg-white p-2 rounded-md border justify-center flex-1"
          >
            <View className="flex-row items-center">
              <AntDesign name="calendar" size={18} color="black" />
              <Text
                style={{ fontFamily: "Montserrat-SemiBold" }}
                className="ml-2 text-txt"
              >
                {date.getDate() < 10 ? "0" + date.getDate() : date.getDate()} /{" "}
                {date.getMonth() + 1 < 10
                  ? "0" + (date.getMonth() + 1)
                  : date.getMonth() + 1}{" "}
                / {date.getFullYear()}
              </Text>
            </View>
            {showDatePicker && (
              <RNDateTimePicker
                testID="datePicker"
                value={date}
                mode="date"
                display="default"
                onChange={onDateSelected}
                minuteInterval={15}
              />
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          className="bg-pr rounded-md p-1 mt-2"
          onPress={getAvailablePros}
        >
          <Text
            className="text-white text-center text-lg"
            style={{ fontFamily: "Montserrat-SemiBold" }}
          >
            Chercher
          </Text>
        </TouchableOpacity>
      </View>
      {!professionals ? (
        <View className="flex-1 bg-white mt-2 justify-center items-center rounded-md">
          <Text className="text-txt text-lg">choisir L'heure et la date</Text>
        </View>
      ) : professionals.length !== 0 ? (
        <ScrollView className="flex-1 mt-4 ">
          {professionals.map((professional) => (
            <ProfessionalCard
              user={professional.data.user}
              specialities={professional.data.specialities}
              rating={professional.data.rating}
              id={professional.data._id}
              key={professional.data._id}
              distance={professional.metrics.distance}
              duration={professional.metrics.duration}
              type="Schedual"
              date={date}
              time={time}
            />
          ))}
        </ScrollView>
      ) : (
        <View className="flex-1 bg-white rounded-md mt-2 justify-center items-center">
          <Text
            className="text-center px-14 text-txt"
            style={{ fontFamily: "Montserrat-Medium" }}
          >
            Aucune Professionnelles n'est disponible, veuillez choisir une autre
            date ou heure
          </Text>
        </View>
      )}
    </View>
  );
};

export default ProgramScreen;
