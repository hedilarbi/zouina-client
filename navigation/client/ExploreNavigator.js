import { TouchableOpacity } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../screens/client/HomeScreen";
import { Ionicons } from "@expo/vector-icons";

import CategoryScreen from "../../screens/client/CategoryScreen";
import BasketScreen from "../../screens/client/BasketScreen";
import AppointementNavigator from "./AppointementNavigator";
import ProfessionalProfileScreen from "../../screens/client/ProfessionalProfileScreen";
import ConfirmScreen from "../../screens/client/ConfirmScreen";

const ExploreNavigator = () => {
  const ExploreStack = createNativeStackNavigator();
  return (
    <ExploreStack.Navigator>
      <ExploreStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <ExploreStack.Screen
        name="Category"
        component={CategoryScreen}
        options={({ route, navigation }) => ({
          title: route.params.name,
          headerTitleAlign: "center",

          headerTintColor: "#BD72C8",
          headerTitleStyle: {
            fontFamily: "Montserrat-SemiBold",
            fontSize: 20,
          },
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Basket")}>
              <Ionicons name="ios-basket" size={35} color="#BD72C8" />
            </TouchableOpacity>
          ),
        })}
      />
      <ExploreStack.Screen
        name="Basket"
        component={BasketScreen}
        screenOptions={{ presentation: "modal" }}
        options={{
          title: "Panier",
          headerTitleAlign: "center",

          headerTintColor: "#BD72C8",
          headerTitleStyle: {
            fontFamily: "Montserrat-SemiBold",
            fontSize: 20,
          },
        }}
      />
      <ExploreStack.Screen
        name="Confirm"
        component={ConfirmScreen}
        // screenOptions={{ presentation: "modal" }}
        options={{
          title: "Confirmer",
          headerTitleAlign: "center",

          headerTintColor: "#BD72C8",
          headerTitleStyle: {
            fontFamily: "Montserrat-SemiBold",
            fontSize: 20,
          },
        }}
      />
      <ExploreStack.Screen
        name="Appointement"
        component={AppointementNavigator}
        options={{
          title: "Choisir professionelle",
          headerTitleAlign: "center",

          headerTintColor: "#BD72C8",
          headerTitleStyle: {
            fontFamily: "Montserrat-SemiBold",
            fontSize: 20,
          },
        }}
      />
      <ExploreStack.Screen
        name="Profile"
        component={ProfessionalProfileScreen}
        screenOptions={{ presentation: "modal" }}
        options={{
          headerTitleAlign: "center",

          headerTintColor: "#BD72C8",
          headerTitleStyle: {
            fontFamily: "Montserrat-SemiBold",
            fontSize: 20,
          },
        }}
      />
    </ExploreStack.Navigator>
  );
};

export default ExploreNavigator;
