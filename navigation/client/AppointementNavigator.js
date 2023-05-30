import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import ImmediatelyScreen from "../../screens/client/ImmediatelyScreen";
import ProgramScreen from "../../screens/client/ProgramScreen";

const Tab = createMaterialTopTabNavigator();

const AppointementNavigator = ({ route }) => {
  const category = route.params.category;
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontFamily: "Montserrat-SemiBold", fontSize: 15 },
        lazy: true,
        tabBarIndicatorStyle: {
          backgroundColor: "#BD72C8",
          height: 3,
        },
      }}
    >
      <Tab.Screen
        name="Immediately"
        component={ImmediatelyScreen}
        options={{
          title: "Maintenant",
        }}
        initialParams={{ category: category }}
      />
      <Tab.Screen
        name="Program"
        component={ProgramScreen}
        options={{
          title: "Réserver",
        }}
        initialParams={{ category: category }}
      />
    </Tab.Navigator>
  );
};

export default AppointementNavigator;
