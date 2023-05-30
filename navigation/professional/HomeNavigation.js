import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../screens/professional/HomeScreen";

import PrestationDetailsScreen from "../../screens/professional/PrestationDetailsScreen";

const HomeNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Details"
        component={PrestationDetailsScreen}
        options={{
          title: "Détails",
          headerTitleAlign: "center",

          headerTintColor: "#BD72C8",
          headerTitleStyle: {
            fontFamily: "Montserrat-SemiBold",
            fontSize: 20,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
