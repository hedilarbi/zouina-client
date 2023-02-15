import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setUserDataToken } from "../../slices/userSlice";
import { validateSignInFormInputs } from "../../utils/Validators";
import { loginUser } from "../../api/user";
import { setItemAsync } from "expo-secure-store";

const SignInForm = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isLoading, setIsloading] = useState(false);
  const [formFields, setFormFields] = useState({
    phone_number: "",
    password: "",
    expo_token: "",
  });
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setFormFields({ ...formFields, expo_token: token })
    );
  }, []);
  const [formErrors, setFormerrors] = useState({});

  const signInClient = async () => {
    setFormerrors({});
    const { valid, errors } = validateSignInFormInputs(
      formFields.phone_number,

      formFields.password
    );
    if (!valid) {
      setFormerrors(errors);
    } else {
      try {
        setIsloading(true);
        const { data } = await loginUser(formFields);

        dispatch(setUserDataToken(data));
        await setItemAsync("token", data.token);
        setIsloading(false);
      } catch (err) {
        setIsloading(false);
        if (err.response) {
          setFormerrors({ server: err.response.data.message });
        } else {
          Alert.alert("connexion problem");
        }
      }
    }
  };
  return (
    <View className="w-full flex-1 justify-between py-10">
      {formErrors.server && (
        <Text className="text-center text-red-600">{formErrors.server}</Text>
      )}
      {isLoading && (
        <View className="absolute w-full h-full justify-center items-center z-50 ">
          <ActivityIndicator size="large" />
        </View>
      )}
      <Text
        className="text-white text-3xl tracking-widest text-center"
        style={{ fontFamily: "Montserrat-SemiBold" }}
      >
        Connexion
      </Text>
      <View className="space-y-10 ">
        <View>
          <TextInput
            placeholder="Numéro Telephone"
            placeholderTextColor={"#E7ACAA"}
            className=" border-b-2 border-pr py-2 text-lg text-white"
            style={{ fontFamily: "Montserrat-Medium" }}
            value={formFields.phone}
            keyboardType="numeric"
            onChangeText={(text) =>
              setFormFields({ ...formFields, phone_number: text })
            }
          />
          {formErrors.phone_number && (
            <Text
              className="text-red-400 mt-4 text-lg"
              style={{ fontFamily: "Montserrat-Medium" }}
            >
              {formErrors.phone_number}
            </Text>
          )}
        </View>
        <View className="">
          <TextInput
            placeholder="Mot de passe"
            placeholderTextColor={"#E7ACAA"}
            className=" border-b-2 border-pr py-2 text-lg text-white"
            style={{ fontFamily: "Montserrat-Medium" }}
            value={formFields.password}
            secureTextEntry={true}
            onChangeText={(text) =>
              setFormFields({ ...formFields, password: text })
            }
          />
          {formErrors.password && (
            <Text
              className="text-red-400 mt-4 text-lg"
              style={{ fontFamily: "Montserrat-Medium" }}
            >
              {formErrors.password}
            </Text>
          )}
        </View>
      </View>
      <View className="mt-4">
        <TouchableOpacity
          className="w-full bg-pr py-2 mb-10 rounded-md "
          onPress={signInClient}
        >
          <Text
            className="text-white text-center text-xl "
            style={{ fontFamily: "Montserrat-SemiBold" }}
          >
            Se connecter
          </Text>
        </TouchableOpacity>
        <Text
          className="text-white text-center text-lg mt-4 "
          style={{ fontFamily: "Montserrat-Medium" }}
        >
          Vous n'avez pas de compte?
        </Text>
        <TouchableOpacity
          className="mt-4"
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text
            className="text-center text-xl text-pr"
            style={{ fontFamily: "Montserrat-SemiBold" }}
          >
            S'inscrire
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignInForm;

async function registerForPushNotificationsAsync() {
  let token;

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}
