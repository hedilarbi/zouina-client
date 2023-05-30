import React, { useEffect, useState, useRef } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { selectUser } from "../../slices/userSlice";
import ProfessionalTabNavigator from "./ProfessionalTabNavigator";
import ProfileSetupScreen from "../../screens/professional/ProfileSetupScreen";
import SetAddresseScreen from "../../screens/professional/SetAddresseScreen";
import OnJobScreen from "../../screens/professional/OnJobScreen";
import { acceptPrestation, refusePrestation } from "../../api/prestations";
import io from "socket.io-client";
import * as Notifications from "expo-notifications";
import { useNavigation } from "@react-navigation/native";
import { getItemAsync, setItemAsync } from "expo-secure-store";
import { ActivityIndicator, View } from "react-native";

import * as TaskManager from "expo-task-manager";
import { SOCKET_URL } from "../../assets/constants";

const socket = io.connect(SOCKET_URL);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const BACKGROUND_NOTIFICATION_TASK = "BACKGROUND-NOTIFICATION-TASK";

TaskManager.defineTask(
  BACKGROUND_NOTIFICATION_TASK,
  ({ data, error, executionInfo }) => {
    return (
      <View>
        <Text>AAAEEEE</Text>
      </View>
    );
  }
);

Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);

const ProfessionalNavigator = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  const { is_profile_setup } = useSelector(selectUser);

  const notificationListener = useRef();
  const responseListener = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const [prestationId, setPrestationId] = useState(null);

  const notificationChannel = async () => {
    await Notifications.setNotificationChannelAsync("reservation", {
      name: "reservation",
      importance: Notifications.AndroidImportance.MAX,

      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  };
  const notificationCategory = async () => {
    await Notifications.setNotificationCategoryAsync("myCategor", [
      {
        identifier: "details",
        buttonTitle: "Détails",
      },
      {
        identifier: "decline",
        buttonTitle: "Refuser",
      },
    ]);
  };
  async function retrievePrestationID() {
    const id = await getItemAsync("prestationId");

    if (id) {
      setPrestationId(id);
    }
    setIsLoading(false);
  }

  retrievePrestationID();

  useEffect(() => {
    notificationChannel();
    notificationCategory();

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        //Notifications.dismissNotificationAsync(notification.identifier);
        Notifications.dismissAllNotificationsAsync();
      });
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        Notifications.dismissAllNotificationsAsync();
        const { prestationId, type } =
          response.notification.request.content.data;

        if (response.actionIdentifier === "details") {
          socket.emit("sendResponse", { response: "accept", prestationId });
          acceptPrestation(prestationId);
          savePrestationID(prestationId);
          if (type === "Immediately") {
            navigation.navigate("OnJob", { prestationId: prestationId });
          } else {
            navigation.navigate("MainNavigator");
          }
        } else if (response.actionIdentifier === "decline") {
          socket.emit("sendResponse", { response: "decline", prestationId });

          refusePrestation(prestationId);
        }
      });
    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  if (isLoading)
    return (
      <View>
        <ActivityIndicator />
      </View>
    );

  return (
    <>
      {is_profile_setup ? (
        <Stack.Navigator>
          {prestationId ? (
            <>
              <Stack.Screen
                name="OnJob"
                component={OnJobScreen}
                options={{ headerShown: false }}
                initialParams={{ prestationId: prestationId }}
              />
              <Stack.Screen
                name="MainNavigator"
                component={ProfessionalTabNavigator}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="MainNavigator"
                component={ProfessionalTabNavigator}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="OnJob"
                component={OnJobScreen}
                options={{ headerShown: false }}
                initialParams={{ prestationId: prestationId }}
              />
            </>
          )}
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="AddressSetup"
            component={SetAddresseScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ProfileSetup"
            component={ProfileSetupScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MainNavigator"
            component={ProfessionalTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OnJob"
            component={OnJobScreen}
            options={{ headerShown: false }}
            initialParams={{ prestationId }}
          />
        </Stack.Navigator>
      )}
    </>
  );
};

export default ProfessionalNavigator;

async function savePrestationID(prestationId) {
  await setItemAsync("prestationId", prestationId);
}
