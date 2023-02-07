import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../../screens/professional/ProfileScreen";
import PasswordScreen from "../../screens/professional/PasswordScreen";

import SchedualScreen from "../../screens/professional/SchedualScreen";
import PersonalInfoScreen from "../../screens/professional/PersonalInfoScreen";
import ProfessionalInfoScreen from "../../screens/professional/ProfessionalInfoScreen";
const ProfileNavigation = () => {
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
          title: "Changer mot de passe",
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
        name="PersonalInfo"
        component={PersonalInfoScreen}
        options={{
          title: "Informations professionnelle",
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
        name="ProfessionalInfo"
        component={ProfessionalInfoScreen}
        options={{
          title: "Informations profile",
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
        name="Schedual"
        component={SchedualScreen}
        options={{
          title: "Emploie du temps",
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

export default ProfileNavigation;
