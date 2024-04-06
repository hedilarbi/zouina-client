import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
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
  // const navigation = useNavigation();
  // const dispatch = useDispatch();
  // const [isLoading, setIsloading] = useState(false);
  // const [formFields, setFormFields] = useState({
  //   phone_number: "",

  //   expo_token: "",
  // });
  // const [formErrors, setFormerrors] = useState({});

  // useEffect(() => {
  //   registerForPushNotificationsAsync().then((token) =>
  //     setFormFields({ ...formFields, expo_token: token })
  //   );
  // }, []);

  // const signUpClient = async () => {
  //   const { valid, errors } = validateSignUpFormInputs(formFields.phone_number);
  //   if (!valid) {
  //     setFormerrors(errors);
  //   } else {
  //     setFormerrors({});
  //     setIsloading(true);
  //     try {
  //       const { data } = await createUser(formFields);

  //       dispatch(setUserDataToken(data));
  //       await setItemAsync("token", data.token);
  //       setIsloading(false);
  //     } catch (err) {
  //       setIsloading(false);
  //       if (err.response) {
  //         setFormerrors({ server: err.response.data.message });
  //       } else {
  //         Alert.alert("problème d'internet");
  //       }
  //     }
  //   }
  // };

  return (
    <View>
      <Text>hi</Text>
    </View>
    // <ScrollView
    //   className="w-full flex-1 py-8 "
    //   showsVerticalScrollIndicator={false}
    //   contentContainerStyle={styles.contentContainer}
    // >
    //   {formErrors.server && (
    //     <Text className="text-center text-red-600">{formErrors.server}</Text>
    //   )}
    //   {isLoading && (
    //     <View className="absolute w-full h-full justify-center items-center z-50 ">
    //       <ActivityIndicator size="large" />
    //     </View>
    //   )}
    //   <Text
    //     className="text-white text-3xl tracking-widest text-center mb-8"
    //     style={{ fontFamily: "Montserrat-SemiBold" }}
    //   >
    //     Inscription
    //   </Text>
    //   <View className="space-y-12 mt-10 ">
    //     <View>
    //       <TextInput
    //         className=" border-b-2 border-pr pt-2 text-lg text-white "
    //         style={{ fontFamily: "Montserrat-Medium" }}
    //         value={formFields.phone_number}
    //         placeholder="Numéro de téléphone"
    //         placeholderTextColor="#FFFFFF"
    //         keyboardType="numeric"
    //         onChangeText={(text) =>
    //           setFormFields({ ...formFields, phone_number: text })
    //         }
    //       />
    //       {formErrors.phone_number && (
    //         <Text
    //           className="text-red-400 mt-4 text-lg"
    //           style={{ fontFamily: "Montserrat-Medium" }}
    //         >
    //           {formErrors.phone_number}
    //         </Text>
    //       )}
    //     </View>
    //   </View>

    //   <View className="mt-20">
    //     <TouchableOpacity
    //       className="w-full bg-pr py-2 mt-10 rounded-md "
    //       onPress={signUpClient}
    //     >
    //       <Text
    //         className="text-white text-center text-xl "
    //         style={{ fontFamily: "Montserrat-SemiBold" }}
    //       >
    //         S'inscrire
    //       </Text>
    //     </TouchableOpacity>
    //     <Text
    //       className="text-white text-center text-lg mt-4 "
    //       style={{ fontFamily: "Montserrat-Medium" }}
    //     >
    //       Vous avez déja un compte?
    //     </Text>
    //     <TouchableOpacity
    //       className="mt-4"
    //       onPress={() => navigation.navigate("SignIn")}
    //     >
    //       <Text
    //         className="text-center text-xl text-pr"
    //         style={{ fontFamily: "Montserrat-SemiBold" }}
    //       >
    //         Se connecter
    //       </Text>
    //     </TouchableOpacity>
    //   </View>
    // </ScrollView>
  );
};

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
    token = (
      await Notifications.getExpoPushTokenAsync({
        experienceId: "@hedilarbi95/client",
      })
    ).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}
const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: "space-between",
  },
});

export default SignUpForm;
