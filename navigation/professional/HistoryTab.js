import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HistoryScreen from "../../screens/professional/HistoryScreen";
import SchedualHistoryScreen from "../../screens/professional/SchedualHistoryScreen";
import React from "react";

const HistoryTab = () => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontFamily: "Montserrat-SemiBold",
          fontSize: 15,
          paddingTop: 15,
          marginTop: 20,
        },
        lazy: true,
        tabBarIndicatorStyle: {
          backgroundColor: "#BD72C8",
          height: 3,
        },
      }}
    >
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          title: "Historique",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#BD72C8",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontFamily: "Montserrat-SemiBold",
            fontSize: 20,
          },
        }}
      />
      <Tab.Screen
        name="Scheduled"
        component={SchedualHistoryScreen}
        options={{
          title: "Reservation",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#BD72C8",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontFamily: "Montserrat-SemiBold",
            fontSize: 20,
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default HistoryTab;
