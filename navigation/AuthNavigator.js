import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "../screens/auth/OnboardingScreen";

import LoginScreen from "../screens/auth/LoginScreen";
import OtpScreen from "../screens/auth/OtpScreen";
import ProfileSetupScreen from "../screens/client/ProfileSetupScreen";

const AuthNavigator = () => {
  const AuthStack = createNativeStackNavigator();
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{
          headerShown: false,
        }}
      />

      <AuthStack.Screen
        name="Otp"
        component={OtpScreen}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="ProfileSetup"
        component={ProfileSetupScreen}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
