import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../screens/professional/HomeScreen";
import WalletScreen from "../../screens/professional/WalletScreen";
import StatScreen from "../../screens/professional/StatScreen";

import {
  SimpleLineIcons,
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome,
} from "@expo/vector-icons";
import ProfileNavigation from "./ProfileNavigation";
import HistoryNavigator from "./HistoryNavigator";
import HomeNavigation from "./HomeNavigation";

const ProfessionalTabNavigator = () => {
  const ProfessionalTab = createBottomTabNavigator();
  return (
    <ProfessionalTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          switch (route.name) {
            case "HomeNavigation":
              iconName = focused ? (
                <SimpleLineIcons name="magnifier" size={24} color="#FA69B7" />
              ) : (
                <SimpleLineIcons name="magnifier" size={24} color="#FA69B7" />
              );
              break;
            case "Wallet":
              iconName = focused ? (
                <MaterialCommunityIcons
                  name="ticket-confirmation"
                  size={24}
                  color="#FA69B7"
                />
              ) : (
                <MaterialCommunityIcons
                  name="ticket-confirmation-outline"
                  size={24}
                  color="#FA69B7"
                />
              );
              break;
            case "HistoryNavigator":
              iconName = focused ? (
                <FontAwesome name="history" size={24} color="#FA69B7" />
              ) : (
                <MaterialIcons name="history" size={24} color="#FA69B7" />
              );
              break;
            case "ProfessionalProfile":
              iconName = focused ? (
                <FontAwesome name="user" size={24} color="#FA69B7" />
              ) : (
                <FontAwesome name="user-o" size={24} color="#FA69B7" />
              );
              break;
          }

          // You can return any component that you like here!
          return iconName;
        },

        tabBarShowLabel: false,
      })}
    >
      <ProfessionalTab.Screen
        name="HomeNavigation"
        component={HomeNavigation}
        options={{
          headerShown: false,
        }}
      />
      <ProfessionalTab.Screen
        name="Wallet"
        component={WalletScreen}
        options={{
          headerShown: false,
        }}
      />
      <ProfessionalTab.Screen
        name="HistoryNavigator"
        component={HistoryNavigator}
        options={{
          headerShown: false,
        }}
      />
      <ProfessionalTab.Screen
        name="ProfessionalProfile"
        component={ProfileNavigation}
        options={{
          headerShown: false,
        }}
      />
    </ProfessionalTab.Navigator>
  );
};

export default ProfessionalTabNavigator;
