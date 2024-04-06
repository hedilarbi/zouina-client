import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./store";

import { getUserByToken } from "./api/user";
import { useEffect, useState } from "react";
import { selectToken, selectUser, setUserDataToken } from "./slices/userSlice";
import AuthNavigator from "./navigation/AuthNavigator";
import { deleteItemAsync, getItemAsync } from "expo-secure-store";

import "expo-dev-client";
import ClientNavigator from "./navigation/client/ClientNavigator";
import ProfessionalNavigator from "./navigation/professional/ProfessionalNavigator";
import { Alert } from "react-native";
import CustomStatusBar from "./components/CustomStatusBar";
import * as SplashScreen from "expo-splash-screen";
import {
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  Montserrat_400Regular_Italic,
} from "@expo-google-fonts/montserrat";
import { Lato_400Regular, Lato_700Bold } from "@expo-google-fonts/lato";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isLoading, setIsloading] = useState(false);
  const [fontsLoaded] = useFonts({
    "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-Medium": require("./assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-SemiBold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
    "Lato-Bold": require("./assets/fonts/Lato-Bold.ttf"),

    "Lato-Regular": require("./assets/fonts/Lato-Regular.ttf"),
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Lato_400Regular,
    Lato_700Bold,
  });

  const RootNavigation = () => {
    // const dispatch = useDispatch();

    // const token = useSelector(selectToken);

    // async function restoreToken() {
    //   try {
    //     const userToken = await getItemAsync("token");

    //     if (userToken) {
    //       const { data } = await getUserByToken(userToken);
    //       if (data) {
    //         dispatch(setUserDataToken({ data: data, token: userToken }));
    //       }
    //       setIsloading(false);
    //     } else {
    //       setIsloading(false);
    //     }
    //   } catch (error) {
    //     if (error.response) {
    //       Alert.alert("probleme interne");
    //     } else {
    //       Alert.alert("problème ré ");
    //     }
    //   }
    // }

    // useEffect(() => {
    //   restoreToken();
    // }, []);
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
        {/* <AuthNavigator /> */}
        {/* {!token ? <AuthNavigator /> : <ClientNavigator />} */}
        <ClientNavigator />
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
