import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import { validateSignUpFormInputs } from "../../utils/Validators";
import { createUser } from "../../api/user";
import { setItemAsync } from "expo-secure-store";
import { setUserDataToken } from "../../slices/userSlice";

const SignUpForm = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isLoading, setIsloading] = useState(false);
  const [formFields, setFormFields] = useState({
    phone_number: "",
    password: "",
    validate_password: "",
    account_type: "client",
    expo_token: "",
  });
  const [formErrors, setFormerrors] = useState({});

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setFormFields({ ...formFields, expo_token: token })
    );
  }, []);

  const signUpClient = async () => {
    const { valid, errors } = validateSignUpFormInputs(
      formFields.phone_number,

      formFields.password,
      formFields.validate_password
    );
    if (!valid) {
      setFormerrors(errors);
    } else {
      setFormerrors({});
      setIsloading(true);
      try {
        const { data } = await createUser(formFields);

        dispatch(setUserDataToken(data));
        await setItemAsync("token", data.token);
        setIsloading(false);
      } catch (err) {
        setIsloading(false);
        setFormerrors({ server: err.response.data.message });
      }
    }
  };

  return (
    <View className="w-full flex-1 justify-between py-8">
      {formErrors.server && (
        <Text className="text-center text-red-600">{formErrors.server}</Text>
      )}
      {isLoading && (
        <View className="absolute w-full h-full justify-center items-center z-50 ">
          <ActivityIndicator size="large" />
        </View>
      )}
      <Text
        className="text-white text-3xl tracking-widest text-center mb-8"
        style={{ fontFamily: "Montserrat-SemiBold" }}
      >
        Inscription
      </Text>
      <View className="space-y-8 mt-10">
        <View>
          <Text
            style={{ fontFamily: "Montserrat-Medium" }}
            className="text-white text-xl"
          >
            Numéro de téléphone
          </Text>
          <TextInput
            className=" border-b-2 border-pr pt-2 text-lg text-white "
            style={{ fontFamily: "Montserrat-Medium" }}
            value={formFields.phone_number}
            keyboardType="numeric"
            onChangeText={(text) =>
              setFormFields({ ...formFields, phone_number: text })
            }
          />
          {formErrors.phone && (
            <Text
              className="text-red-400 mt-4 text-lg"
              style={{ fontFamily: "Montserrat-Medium" }}
            >
              {formErrors.phone_number}
            </Text>
          )}
        </View>
        <View>
          <Text
            style={{ fontFamily: "Montserrat-Medium" }}
            className="text-white text-xl"
          >
            Mot de passe
          </Text>
          <TextInput
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
        <View>
          <Text
            style={{ fontFamily: "Montserrat-Medium" }}
            className="text-white text-xl"
          >
            confirmer mot de passe
          </Text>
          <TextInput
            className=" border-b-2 border-pr py-2 text-lg text-white"
            style={{ fontFamily: "Montserrat-Medium" }}
            value={formFields.validate_password}
            onSubmitEditing={signUpClient}
            secureTextEntry={true}
            onChangeText={(text) =>
              setFormFields({ ...formFields, validate_password: text })
            }
          />
          {formErrors.validate_password && (
            <Text
              className="text-red-400 mt-4 text-lg"
              style={{ fontFamily: "Montserrat-Medium" }}
            >
              {formErrors.validate_password}
            </Text>
          )}
        </View>
        <View className="">
          <Text
            className="text-white text-lg"
            style={{ fontFamily: "Montserrat-Medium" }}
          >
            Type de compte
          </Text>
          <View className="flex-row mt-4 justify-between items-center space-x-2">
            <TouchableOpacity
              onPress={() =>
                setFormFields({ ...formFields, account_type: "client" })
              }
              className={
                formFields.account_type === "client"
                  ? "rounded-md  border-pr border-2 justify-center items-center bg-pr"
                  : "rounded-md  border-pr border-2 justify-center items-center"
              }
            >
              <Text
                className="text-white text-lg px-10 py-1"
                style={{ fontFamily: "Montserrat-Medium" }}
              >
                Cliente
              </Text>
            </TouchableOpacity>
            <Text
              className="text-white text-lg"
              style={{ fontFamily: "Montserrat-Medium" }}
            >
              Ou
            </Text>
            <TouchableOpacity
              className={
                formFields.account_type === "professional"
                  ? "rounded-md  border-pr border-2 justify-center items-center bg-pr"
                  : "rounded-md  border-pr border-2 justify-center items-center"
              }
              onPress={() =>
                setFormFields({ ...formFields, account_type: "professional" })
              }
            >
              <Text
                className="text-white text-lg px-2 py-1"
                style={{ fontFamily: "Montserrat-Medium" }}
              >
                Professionelle
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className="mt-4">
        <TouchableOpacity
          className="w-full bg-pr py-2 mt-10 rounded-md "
          onPress={signUpClient}
        >
          <Text
            className="text-white text-center text-xl "
            style={{ fontFamily: "Montserrat-SemiBold" }}
          >
            S'inscrire
          </Text>
        </TouchableOpacity>
        <Text
          className="text-white text-center text-lg mt-4 "
          style={{ fontFamily: "Montserrat-Medium" }}
        >
          Vous avez déja un compte?
        </Text>
        <TouchableOpacity
          className="mt-4"
          onPress={() => navigation.navigate("SignIn")}
        >
          <Text
            className="text-center text-xl text-pr"
            style={{ fontFamily: "Montserrat-SemiBold" }}
          >
            Se connecter
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpForm;

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
