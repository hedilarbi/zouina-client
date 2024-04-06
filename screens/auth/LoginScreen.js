import {
  View,
  KeyboardAvoidingView,
  ImageBackground,
  Platform,
  Text,
  TextInput,
  Image,
  Touchable,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import LinearGradientWrapper from "../../components/LinearGradientWrapper";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useRef } from "react";

const LoginScreen = () => {
  const navigation = useNavigation();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const phoneNumberInput = useRef(null);

  const sendOtp = async () => {
    Keyboard.dismiss();
    setError("");
    if (phoneNumber.length < 8 || phoneNumber.length > 8) {
      console.log(phoneNumber);
      setError("Numéro de téléphone invalide");
      return null;
    }
    setIsLoading(true);

    const formattedValue = "+216" + phoneNumber;

    // if (phoneNumber === "8196929494") {
    //   navigation.navigate("Otp", { phoneNumber: formattedValue });
    // } else {
    //   sendSmsVerification(formattedValue)
    //     .then((sent) => {
    //       navigation.navigate("Otp", { phoneNumber: formattedValue });
    //     })
    //     .then(() => setIsLoading(false))
    //     .catch((err) => {
    //       setIsLoading(false);
    //       Alert.alert("Error", err);
    //     });
    // }
    console.log(formattedValue);
    navigation.navigate("Otp", { phoneNumber: formattedValue });
  };
  return (
    <SafeAreaView className="flex-1 ">
      <KeyboardAvoidingView
        className="flex-1 justify-center items-center"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View
          style={{ height: "100%" }}
          className="absolute top-0 left-0 z-10 w-full"
        >
          <LinearGradient
            colors={["#93729A", "#F9679A"]}
            style={{ height: "100%" }}
            start={[0, 0]}
            end={[1, 1]}
          />
        </View>
        <View className="w-full px-4 z-20 translate-y-10">
          <View
            className=" bg-gry rounded-2xl px-4 py-4"
            style={{ elevation: 6 }}
          >
            <Text
              style={{ fontFamily: "Lato-Bold" }}
              className="text-base text-gray-800"
            >
              Se Connecter avec numéro de téléphone
            </Text>
            <Text
              style={{ fontFamily: "Lato-Regular" }}
              className="text-sm text-txt"
            >
              Connectez-vous avec un numéro valide
            </Text>
            <View
              className={
                error.length > 0
                  ? "bg-white  p-2 flex flex-row  mt-6 border-wr border  rounded-md w-full "
                  : "bg-white  p-2 flex flex-row  mt-6   border-gray-400 border rounded-md w-full"
              }
            >
              <View className="w-10 h-7 bg-gray-200 ">
                <Image
                  source={require("../../assets/icons/tunisia-flag.png")}
                  style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "cover",
                  }}
                  className="rounded-sm"
                />
              </View>
              <TextInput
                className="bg-transparent ml-2 text-base   flex-1 "
                placeholderTextColor="#525252"
                placeholder="Numéro de téléphone"
                keyboardType="numeric"
                onChangeText={(text) => setPhoneNumber(text)}
              />
            </View>
            <Text className="text-xs mt-2 text-gray-400  font-latoB">
              e.x 98 123 456
            </Text>
            <TouchableOpacity
              className="w-full mt-20 bg-pr rounded-md py-2"
              onPress={sendOtp}
            >
              <Text className="text-lg text-white text-center font-latoB">
                Connexion
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
