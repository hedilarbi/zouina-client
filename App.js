import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./store";

import { getUserByToken } from "./api/user";
import { useEffect, useState } from "react";
import { selectToken, selectUser, setUserDataToken } from "./slices/userSlice";
import AuthNavigator from "./navigation/AuthNavigator";
import { getItemAsync } from "expo-secure-store";

import "expo-dev-client";
import ClientNavigator from "./navigation/client/ClientNavigator";
import ProfessionalNavigator from "./navigation/professional/ProfessionalNavigator";
import { Alert } from "react-native";
import CustomStatusBar from "./components/CustomStatusBar";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isLoading, setIsloading] = useState(true);
  const [fontsLoaded] = useFonts({
    "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-Medium": require("./assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-SemiBold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
  });

  const RootNavigation = () => {
    const dispatch = useDispatch();
    const { account_type } = useSelector(selectUser);
    const token = useSelector(selectToken);

    async function restoreToken() {
      try {
        const userToken = await getItemAsync("token");

        if (userToken) {
          const { data } = await getUserByToken(userToken);

          if (data) {
            dispatch(
              setUserDataToken({ user: data.user, data, token: userToken })
            );
          }
          setIsloading(false);
        } else {
          setIsloading(false);
        }
      } catch (error) {
        if (error.response) {
          Alert.alert("probleme interne");
        } else {
          Alert.alert("problème réseaux");
        }
      }
    }

    useEffect(() => {
      restoreToken();
    }, []);
    const appIsReady = async () => {
      await SplashScreen.hideAsync();
    };
    if (fontsLoaded && !isLoading) {
      appIsReady();
    } else {
      return null;
    }

    return (
      <NavigationContainer>
        {!token || !account_type ? (
          <AuthNavigator />
        ) : account_type === "client" ? (
          <ClientNavigator />
        ) : (
          <ProfessionalNavigator />
        )}
      </NavigationContainer>
    );
  };

  return (
    <Provider store={store}>
      <>
        <CustomStatusBar backgroundColor="white" barStyle="dark-content" />
        <RootNavigation />
      </>
    </Provider>
  );
}
