import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./store";

import { getUserByToken } from "./api/user";
import { useEffect, useState } from "react";
import { selectToken, selectUser, setUserDataToken } from "./slices/userSlice";
import AuthNavigator from "./navigation/AuthNavigator";
import { getItemAsync } from "expo-secure-store";
import SplashScreen from "./screens/SplashScreen";

import ClientNavigator from "./navigation/client/ClientNavigator";
import ProfessionalNavigator from "./navigation/professional/ProfessionalNavigator";
import { Alert } from "react-native";

export default function App() {
  const [isLoading, setIsloading] = useState(true);
  const [fontsLoaded] = useFonts({
    "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-Medium": require("./assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-SemiBold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
  });

  const RootNavigation = () => {
    const userToken = useSelector(selectToken);
    const { account_type } = useSelector(selectUser);
    const dispatch = useDispatch();

    async function restoreToken() {
      try {
        const token = await getItemAsync("token");
        if (token != null) {
          const { data } = await getUserByToken(token);
          if (data) {
            dispatch(setUserDataToken({ user: data.user, data, token }));
          }
          setIsloading(false);
        } else {
          setIsloading(false);
        }
      } catch (error) {
        Alert.alert("Oops something went wrong, try again later");
      }
    }

    useEffect(() => {
      restoreToken();
    }, []);

    if (!fontsLoaded || isLoading) {
      return <SplashScreen />;
    }
    return (
      <NavigationContainer>
        {(userToken === null || !account_type || !userToken) && (
          <AuthNavigator />
        )}
        {account_type === "client" && userToken && <ClientNavigator />}
        {account_type === "professional" && userToken && (
          <ProfessionalNavigator />
        )}
      </NavigationContainer>
    );
  };

  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
}
