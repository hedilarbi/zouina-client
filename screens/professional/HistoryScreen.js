import { ScrollView, ActivityIndicator, View } from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { getImmediateProfessionalPrestations } from "../../api/prestations";

import PrestationCard from "../../components/professional/PrestationCard";
import { selectData } from "../../slices/userSlice";

const HistoryScreen = () => {
  const { _id } = useSelector(selectData);

  const [prestations, setPrestations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getImmediatePrestations = async () => {
    try {
      const { data } = await getImmediateProfessionalPrestations(_id);
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
      <View className="absolute w-full h-full justify-center items-center z-50 ">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1  px-2 py-4">
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
            id={_id}
          />
        );
      })}
    </ScrollView>
  );
};

export default HistoryScreen;
