import { View, Alert, ActivityIndicator, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../assets/constants";

import { SafeAreaView } from "react-native-safe-area-context";

import axios from "axios";

import CategoryCard from "../../components/client/CategoryCard";
import * as Notifications from "expo-notifications";
import OnPrestationBanner from "../../components/client/OnPrestationBanner";
import { deleteItemAsync, getItemAsync } from "expo-secure-store";
import { useRef } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
const HomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [prestationId, setPrestationId] = useState(null);

  const notificationListener = useRef();
  const responseListener = useRef();
  const retrievePrestationID = async () => {
    const prestationId = await getItemAsync("prestationId");

    if (prestationId) {
      setPrestationId(prestationId);
    }
  };

  const getCategories = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/categories/`);

      setCategories(data);
      setIsLoading(false);
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  useFocusEffect(
    useCallback(() => {
      retrievePrestationID();
    })
  );
  useEffect(() => {
    getCategories();
  }, []);
  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        Notifications.dismissNotificationAsync(notification.identifier);
        navigation.push("Home");
      });
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        Notifications.dismissNotificationAsync(
          response.notification.identifier
        );
      });
    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <SafeAreaView className="px-4 py-6 flex-1">
      <View className="h-28  justify-center ">
        {prestationId && <OnPrestationBanner prestationId={prestationId} />}
      </View>

      <View className="flex-1 mt-10">
        {categories.map((category) => {
          return (
            <CategoryCard
              key={category._id}
              name={category.name}
              image={category.image}
              id={category._id}
            />
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
