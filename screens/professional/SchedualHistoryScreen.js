import { View, ScrollView, ActivityIndicator, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { getSchedualProfessionalPrestations } from "../../api/prestations";
import { useSelector } from "react-redux";

import PrestationCard from "../../components/professional/PrestationCard";
import { selectData } from "../../slices/userSlice";

const SchedualHistoryScreen = () => {
  const { _id } = useSelector(selectData);

  const [prestations, setPrestations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getSchedualPrestations = async () => {
    try {
      const { data } = await getSchedualProfessionalPrestations(_id);
      setPrestations(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      Alert.alert(error.message);
    }
  };

  useEffect(() => {
    getSchedualPrestations();
  }, []);

  if (isLoading) {
    return (
      <View className="absolute w-full h-full justify-center items-center z-50 ">
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <View className="flex-1 py-4 px-2">
      {prestations.length != 0 ? (
        <ScrollView className="flex-1 bg-white px-2 py-4">
          {prestations.map((prestation) => {
            const { createdAt, _id, total_price, client, state } = prestation;
            const clientName = client.user.full_name;
            let date = new Date(createdAt);
            date = date.toString("fr-FR", { month: "long" });
            date = date.substr(4, 17);
            return (
              <PrestationCard
                key={_id}
                clientName={clientName}
                state={state}
                date={date}
                price={total_price}
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

export default SchedualHistoryScreen;
