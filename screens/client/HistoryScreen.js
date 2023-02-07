import { View, Text, Alert, ScrollView, ActivityIndicator } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

import { useEffect } from "react";
import { getImmediateClientPrestations } from "../../api/prestations";
import { useState } from "react";
import PrestationCard from "../../components/client/PrestationCard";
import { selectData } from "../../slices/userSlice";

const HistoryScreen = () => {
  const { _id } = useSelector(selectData);
  const [prestations, setPrestations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getImmediatePrestations = async () => {
    try {
      const { data } = await getImmediateClientPrestations(_id);
      setPrestations(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      Alert.alert(error.message);
    }
  };

  useEffect(() => {
    getImmediatePrestations();
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white ">
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <View className="flex-1 py-4 px-2">
      {prestations.length != 0 ? (
        <ScrollView className="flex-1 ">
          {prestations.map((prestation) => {
            const { finishedAt, services, _id, total_price } = prestation;
            const category = services[0].service.category.name;
            return (
              <PrestationCard
                finishedAt={finishedAt}
                id={_id}
                category={category}
                total={total_price}
                key={_id}
              />
            );
          })}
        </ScrollView>
      ) : (
        <View className="flex-1 bg-white justify-center items-center">
          <Text style={{ fontFamily: "Montserrat-Medium" }}>Vide</Text>
        </View>
      )}
    </View>
  );
};

export default HistoryScreen;
