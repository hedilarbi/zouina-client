import {
  View,
  Text,
  Button,
  Image,
  Switch,
  Alert,
  ActivityIndicator,
  ScrollView,
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

const HomeScreen = () => {
  const { full_name } = useSelector(selectUser);
  const { availability, _id } = useSelector(selectData);
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
      Alert.alert(error.message);
    }
  }

  async function getAcceptedPrestations() {
    try {
      const { data } = await getAcceptedSchedualPrestation(_id);
      setPrestationsList(data);
      setIsLoading(false);
    } catch (error) {
      Alert.alert(error.message);
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
      <View className="bg-white  rounded-md p-4">
        <Text
          style={{ fontFamily: "Montserrat-SemiBold" }}
          className="text-xl "
        >
          Bonjour,
        </Text>
        <View className="flex-row justify-between items-center">
          <Text
            style={{ fontFamily: "Montserrat-Medium" }}
            className="text-lg mt-2"
          >
            Mme. {full_name}
          </Text>
          <View className="flex-row items-center">
            <Text
              style={{ fontFamily: "Montserrat-Medium" }}
              className="ml-2 text-lg"
            >
              {availability ? "Disponible" : "Indisponible"}{" "}
            </Text>
            <Switch
              trackColor={{ false: "#767577", true: "#FA69B7" }}
              onValueChange={toggleSwitch}
              value={availability}
            />
          </View>
        </View>
      </View>
      <View className="flex-1 bg-white rounded-md mt-4 p-4">
        <Text className="text-xl" style={{ fontFamily: "Montserrat-SemiBold" }}>
          Réservations
        </Text>
        {prestationsList.length != 0 ? (
          <ScrollView className="bg-gray-200 rounded-md">
            {prestationsList.map((prestation) => (
              <View>
                <Text>Reservation</Text>
              </View>
            ))}
          </ScrollView>
        ) : (
          <View className=" flex-1 justify-center items-center  ">
            <Text>Pas de réservation</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
