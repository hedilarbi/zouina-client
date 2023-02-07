import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../../screens/client/ProfileScreen";
import PasswordScreen from "../../screens/client/PasswordScreen";
import ProfileInformationScreen from "../../screens/client/ProfileInformationScreen";
const ProfileNavigator = () => {
  const ProfileStack = createNativeStackNavigator();
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <ProfileStack.Screen
        name="Password"
        component={PasswordScreen}
        options={{
          title: "Changer Mot de passe",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#FA69B7",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontFamily: "Montserrat-SemiBold",
            fontSize: 20,
          },
        }}
      />
      <ProfileStack.Screen
        name="ProfileInformation"
        component={ProfileInformationScreen}
        options={{
          title: "Informations Profile",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#FA69B7",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontFamily: "Montserrat-SemiBold",
            fontSize: 20,
          },
        }}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileNavigator;
