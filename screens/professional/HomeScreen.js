import {
  View,
  Text,
  Button,
  Image,
  Switch,
  Alert,
  ActivityIndicator,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import {
  selectData,
  selectUser,
  setAvailability,
} from "../../slices/userSlice";
import { updateAvailability } from "../../api/professional";
import { getAcceptedSchedualPrestation } from "../../api/prestations";
import { Entypo } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  const { full_name } = useSelector(selectUser);
  const { availability, _id, account_info } = useSelector(selectData);
  const [isLoading, setIsLoading] = useState(false);
  const [prestationsList, setPrestationsList] = useState([]);
  const dispatch = useDispatch();

  async function toggleSwitch() {
    setIsLoading(true);
    try {
      const { data } = await updateAvailability(_id, !availability);

      dispatch(setAvailability(data.availability));

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

  async function getAcceptedPrestations() {
    try {
      const { data } = await getAcceptedSchedualPrestation(_id);

      setPrestationsList(data);
      setIsLoading(false);
    } catch (error) {
      if (error.response) {
        Alert.alert("Problème interne");
      } else {
        Alert.alert("problème internet");
      }
    }
  }
  useEffect(() => {
    getAcceptedPrestations();
  }, []);

  return (
    <SafeAreaView className="flex-1 p-4">
      {isLoading && (
        <View className="absolute w-full h-full justify-center items-center z-50 left-0 bottom-0 ">
          <ActivityIndicator size="large" />
        </View>
      )}
      {!account_info && (
        <View className="bg-red-500 rounded-md py-2 mb-4">
          <Text
            className="text-white text-center text-lg"
            style={{ fontFamily: "Montserrat-SemiBold" }}
          >
            Compte désactivé
          </Text>
        </View>
      )}

      <View className="bg-white  rounded-md p-4">
        <Text
          style={{ fontFamily: "Montserrat-SemiBold" }}
          className="text-xl text-txt"
        >
          Bonjour,
        </Text>
        <View className="flex-row justify-between items-center">
          <Text
            style={{ fontFamily: "Montserrat-Medium" }}
            className="text-lg mt-2 text-txt"
          >
            Mme. {full_name}
          </Text>
          <View className="flex-row items-center">
            <Text
              style={{ fontFamily: "Montserrat-Medium" }}
              className="ml-2 text-lg text-txt"
            >
              {availability ? "Disponible" : "Indisponible"}{" "}
            </Text>
            <Switch
              trackColor={{ false: "#767577", true: "#BD72C8" }}
              thumbColor="#f0f0f0"
              onValueChange={toggleSwitch}
              value={availability}
            />
          </View>
        </View>
      </View>
      <Text
        className="text-xl my-4 text-txt"
        style={{ fontFamily: "Montserrat-SemiBold" }}
      >
        Réservations
      </Text>

      {prestationsList.length != 0 ? (
        <ScrollView className=" flex-1  py-4 ">
          {prestationsList.map((prestation) => {
            const { date, time } = formatDateToString(prestation.schedual_date);

            return (
              <TouchableOpacity
                className="bg-white rounded-md px-2 py-4 justify-between flex-row items-center gap-3 mb-4"
                key={prestation._id}
                onPress={() =>
                  navigation.navigate("Details", { id: prestation._id })
                }
              >
                <View className="flex-1">
                  <Text
                    className="border-b pb-1 text-txt"
                    style={{ fontFamily: "Montserrat-SemiBold" }}
                  >
                    {date}
                  </Text>
                  <View className="mt-2 flex-row justify-between">
                    <Text className="text-txt ">{time}</Text>
                    <Text className="text-txt">Dureé: 45 min</Text>
                  </View>
                </View>
                <Entypo name="chevron-thin-right" size={24} color="gray" />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      ) : (
        <View className=" flex-1 bg-white rounded-md justify-center items-center  ">
          <Text>Pas de réservation</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

function formatDateToString(date) {
  const formatedDate = new Date(date);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const datePart = formatedDate.toLocaleDateString(options);
  const timePart = formatedDate.toLocaleTimeString("fr-FR");
  return {
    date: datePart,
    time: timePart.slice(0, 5),
  };
}

export default HomeScreen;
