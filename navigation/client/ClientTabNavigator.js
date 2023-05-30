import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ExploreNavigator from "./ExploreNavigator";

import ProfileScreen from "../../screens/client/ProfileScreen";
import PromoScreen from "../../screens/client/PromoScreen";
import HistoryScreen from "../../screens/client/HistoryScreen";

import {
  SimpleLineIcons,
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome,
} from "@expo/vector-icons";
import ProfileNavigator from "./ProfileNavigator";
import HistoryNavigator from "./HistoryNavigator";

const ClientTabNavigator = () => {
  const ClientTab = createBottomTabNavigator();
  return (
    <ClientTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          switch (route.name) {
            case "Explore":
              iconName = focused ? (
                <SimpleLineIcons name="magnifier" size={24} color="#BD72C8" />
              ) : (
                <SimpleLineIcons name="magnifier" size={24} color="#BD72C8" />
              );
              break;
            case "Promo":
              iconName = focused ? (
                <MaterialCommunityIcons
                  name="ticket-confirmation"
                  size={24}
                  color="#BD72C8"
                />
              ) : (
                <MaterialCommunityIcons
                  name="ticket-confirmation-outline"
                  size={24}
                  color="#BD72C8"
                />
              );
              break;
            case "HistoryNavigator":
              iconName = focused ? (
                <FontAwesome name="history" size={24} color="#BD72C8" />
              ) : (
                <MaterialIcons name="history" size={24} color="#BD72C8" />
              );
              break;
            case "ClientProfile":
              iconName = focused ? (
                <FontAwesome name="user" size={24} color="#BD72C8" />
              ) : (
                <FontAwesome name="user-o" size={24} color="#BD72C8" />
              );
              break;
          }

          return iconName;
        },

        tabBarShowLabel: false,
      })}
    >
      <ClientTab.Screen
        name="Explore"
        component={ExploreNavigator}
        options={{
          headerShown: false,
        }}
      />
      <ClientTab.Screen
        name="Promo"
        component={PromoScreen}
        options={{
          headerShown: false,
        }}
      />
      <ClientTab.Screen
        name="HistoryNavigator"
        component={HistoryNavigator}
        options={{
          headerShown: false,
        }}
      />
      <ClientTab.Screen
        name="ClientProfile"
        component={ProfileNavigator}
        options={{
          headerShown: false,
        }}
      />
    </ClientTab.Navigator>
  );
};

export default ClientTabNavigator;
