import { View, ScrollView, ActivityIndicator, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import ProfessionalCard from "../../components/client/ProfessionalCard";
import { getProfessionals } from "../../api/professional";
import { useSelector } from "react-redux";
import { selectUser } from "../../slices/userSlice";

const ImmediatelyScreen = ({ route }) => {
  const [professionals, setProfessionals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { location } = useSelector(selectUser);

  const getAvailablePros = async () => {
    try {
      const { data } = await getProfessionals(route.params.category, location);

      //const professionalsWithMetrics = await setMetrics(data);

      setProfessionals(data);
      setIsLoading(false);
    } catch (error) {
      Alert.alert(error.message);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getAvailablePros();
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
            duration={professional.duration}
            distance={professional.distance}
            user={professional.user}
            specialities={professional.specialities}
            rating={professional.rating}
            id={professional._id}
            key={professional._id}
            type="Immediately"
          />
        );
      })}
    </ScrollView>
  );
};

export default ImmediatelyScreen;
