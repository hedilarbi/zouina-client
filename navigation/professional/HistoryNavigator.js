import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HistoryTab from "./HistoryTab";
import PrestationDetailsScreen from "../../screens/professional/PrestationDetailsScreen";

const HistoryNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HistoryTab"
        component={HistoryTab}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Details"
        component={PrestationDetailsScreen}
        options={{
          title: "Détails",
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
    </Stack.Navigator>
  );
};

export default HistoryNavigator;
