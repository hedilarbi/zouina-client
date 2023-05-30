import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { getSchedualClientPrestations } from "../../api/prestations";
import { useSelector } from "react-redux";

import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { selectData } from "../../slices/userSlice";

const SchedualHistoryScreen = ({ navigation }) => {
  const { _id } = useSelector(selectData);
  const [prestations, setPrestations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getSchedualPrestations = async () => {
    setIsLoading(true);
    try {
      const { data } = await getSchedualClientPrestations(_id);

      setPrestations(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error.response) {
        Alert.alert("Problème interne");
      } else {
        Alert.alert("problème internet");
      }
    }
  };

  const formatDate = (date1, date2) => {
    let date;
    if (date1 != null) {
      date = new Date(date1);
    } else {
      date = new Date(date2);
    }
    date = date.toString("fr-FR", { month: "long" });
    date = date.substr(4, 17);
    return date;
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getSchedualPrestations();
    });

    return unsubscribe;
  }, [navigation]);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center ">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View className="flex-1 py-4 px-2">
      {prestations.length != 0 ? (
        <ScrollView className="flex-1 ">
          {prestations.map((prestation) => {
            const date = formatDate(
              prestation.finishedAt,
              prestation.schedual_date
            );
            return (
              <TouchableOpacity
                className="bg-white rounded-md p-4 mb-3"
                key={prestation._id}
                onPress={() =>
                  navigation.navigate("Details", { id: prestation._id })
                }
              >
                <View className="flex-row justify-between border-b border-gray-300 pb-4 items-center">
                  {prestation.state === "done" && (
                    <AntDesign name="checkcircle" size={30} color="green" />
                  )}
                  {prestation.state === "canceled" && (
                    <AntDesign name="closecircle" size={30} color="red" />
                  )}
                  {prestation.state === "accepted" && (
                    <MaterialIcons name="pending" size={38} color="#FDDA0D" />
                  )}

                  <Text
                    className="text-txt"
                    style={{ fontFamily: "Montserrat-SemiBold" }}
                  >
                    {date}
                  </Text>
                  <Text
                    className="text-txt"
                    style={{ fontFamily: "Montserrat-SemiBold" }}
                  >
                    {prestation.total_price} DZD
                  </Text>
                </View>
                <View className="mt-4 flex-row ">
                  <Text
                    style={{ fontFamily: "Montserrat-Medium" }}
                    className="bg-gray-300 px-2 py-1 rounded-full"
                  >
                    {prestation.services[0].service.category.name}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      ) : (
        <View className="flex-1 bg-white justify-center items-center">
          <Text
            className="text-txt"
            style={{ fontFamily: "Montserrat-Medium" }}
          >
            Vide
          </Text>
        </View>
      )}
    </View>
  );
};

export default SchedualHistoryScreen;
