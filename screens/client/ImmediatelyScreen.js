import { View, ScrollView, ActivityIndicator, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import ProfessionalCard from "../../components/client/ProfessionalCard";
import { getProfessionals } from "../../api/professional";

import * as Location from "expo-location";
import { useSelector } from "react-redux";
import { selectUser } from "../../slices/userSlice";
const ImmediatelyScreen = ({ route }) => {
  const [professionals, setProfessionals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { location } = useSelector(selectUser);
  useEffect(() => {
    (async () => {
      try {
        const { status: existingStatus } =
          await Location.getForegroundPermissionsAsync();
        if (existingStatus !== "granted") {
          const { status } = Location.requestForegroundPermissionsAsync();
          if (status !== "granted") {
            alert("localisation obligatoire pour le bon déroulement");
            return null;
          }
        }
        let userLocation = await Location.getCurrentPositionAsync({
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000,
        });

        const { data } = await getProfessionals(
          route.params.category,
          userLocation.coords
        );

        setProfessionals(data);
        setIsLoading(false);
      } catch (err) {
        if (err.response) {
          Alert.alert("Problème interne");
        } else {
          console.log(err);
          Alert.alert("problème internet");
        }
      }
    })();
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <ScrollView className="flex-1 py-2 px-2">
      {professionals.map((professional) => {
        return (
          <ProfessionalCard
            duration={professional.metrics.duration}
            distance={professional.metrics.distance}
            user={professional.data.user}
            specialities={professional.data.specialities}
            rating={professional.data.rating}
            id={professional.data._id}
            key={professional.data._id}
            type="Immediately"
          />
        );
      })}
    </ScrollView>
  );
};

export default ImmediatelyScreen;
