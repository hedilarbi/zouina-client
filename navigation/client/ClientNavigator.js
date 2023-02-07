import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ClientTabNavigator from "./ClientTabNavigator";
import ProfileSetupScreen from "../../screens/client/ProfileSetupScreen";
import { useSelector } from "react-redux";
import { selectUser } from "../../slices/userSlice";
import SetAddresseScreen from "../../screens/client/SetAddresseScreen";
import WaitingScreen from "../../screens/client/WaitingScreen";

const ClientNavigator = () => {
  const Stack = createNativeStackNavigator();
  const { is_profile_setup } = useSelector(selectUser);

  return (
    <Stack.Navigator>
      {is_profile_setup ? (
        <Stack.Group>
          <Stack.Screen
            name="MainNavigator"
            component={ClientTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Waiting"
            component={WaitingScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Group>
      ) : (
        <Stack.Group>
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
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default ClientNavigator;
