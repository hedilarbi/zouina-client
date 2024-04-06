import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  TextInput,
  Alert,
  Keyboard,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { setItemAsync } from "expo-secure-store";
import { useDispatch } from "react-redux";

const OtpScreen = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { phoneNumber } = route.params;

  const [invalidCode, setInvalidCode] = useState(false);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputs = Array(6)
    .fill(0)
    .map((_, i) => useRef(null));

  const handleInputChange = (text, index) => {
    inputs[index].current.value = text;

    if (text.length === 1 && index < 5) {
      inputs[index + 1].current.focus();
    }
    const newOtp = otp.substring(0, index) + text + otp.substring(index + 1);
    setOtp(newOtp);
  };

  const handleKeyPress = (key, index) => {
    if (key === "Backspace") {
      if (index > 0 && inputs[index].current.value === "") {
        inputs[index - 1].current.focus();
      }
    }
    if (Number(key) && inputs[index].current?.value?.length > 0 && index < 5) {
      inputs[index + 1].current.focus();
      inputs[index + 1].current.value = key;
      const newOtp = otp.substring(0, index) + key + otp.substring(index + 1);
      setOtp(newOtp);
    }
  };
  const saveUserToken = async (token) => {
    await setItemAsync("token", token);
  };

  const verifyCode = async () => {
    Keyboard.dismiss();
    //setIsLoading(true);
    // try {
    //   if (otp === "000000") {
    //     const response = await createUser(phoneNumber);
    //     console.log(response);
    //     if (response.status) {
    //       await saveUserToken(response.data.token);
    //       dispatch(setUserToken(response.data.token));
    //       dispatch(setUser(response.data.user));
    //       setIsLoading(false);
    //     } else {
    //       Alert.alert("Problème de connexion");
    //       setIsLoading(false);
    //     }
    //     setIsLoading(false);
    //   } else {
    //     const success = await checkVerification(phoneNumber, otp);
    //     if (!success) {
    //       setInvalidCode(true);
    //     } else {
    //       const response = await createUser(phoneNumber);
    //       if (response.status) {
    //         await saveUserToken(response.data.token);
    //         dispatch(setUserToken(response.data.token));
    //         dispatch(setUser(response.data.user));
    //       }
    //       setIsLoading(false);
    //     }
    //   }
    // } catch (err) {
    //   Alert.alert("Error", err.message);
    //   setIsLoading(false);
    // }
    navigation.navigate("ProfileSetup");
  };

  const resendCode = async () => {
    // setIsLoading(true);
    // sendSmsVerification(phoneNumber)
    //   .then(() => setIsLoading(false))
    //   .catch((err) => {
    //     Alert.alert("Error", err);
    //     setIsLoading(false);
    //   });
  };
  return (
    <SafeAreaView className="bg-pink-50 flex-1">
      {isLoading && (
        <View
          className="justify-center items-center flex-1 h-full w-full absolute top-0 left-0 z-40"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <ActivityIndicator size="large" color="#F7A600" />
        </View>
      )}
      <View className="flex-1 p-5">
        <TouchableOpacity
          className="bg-pr justify-center items-center p-2 rounded-full w-10 h-10 "
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={22} color="white" />
        </TouchableOpacity>
        <Text className="text-center text-pr text-lg mt-10 font-latoB">
          Verifier Votre Numéro de Téléphone!
        </Text>
        <Text className="text-base  text-gray-500 mt-5 text-center font-lato">
          Nous avons envoyé un code OTP sur votre numéro de téléphone{" "}
          {phoneNumber}
        </Text>
        <View style={styles.container}>
          {inputs.map((input, index) => (
            <TextInput
              key={index}
              style={styles.input}
              keyboardType="numeric"
              onChangeText={(text) => handleInputChange(text, index)}
              maxLength={1}
              onKeyPress={({ nativeEvent }) =>
                handleKeyPress(nativeEvent.key, index)
              }
              ref={input}
            />
          ))}
        </View>
        {invalidCode && <Text style={styles.error}>Incorrect code.</Text>}
        <View className="flex-row items-center justify-center mt-10">
          <TouchableOpacity
            className="bg-pr rounded-full px-10 py-3 justify-center items-center"
            onPress={verifyCode}
          >
            <Text className="text-base font-latoB text-white">Vérifier</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row mt-8 items-center">
          <Text className="text-sm text-gray-500 font-latoB">
            Vous n'avez pas reçu le code ?
          </Text>
          <TouchableOpacity className="ml-1" onPress={resendCode}>
            <Text className="text-ms text-pr font-latoB">Renvoyer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 36,
  },
  input: {
    width: 40,
    height: 40,
    borderWidth: 1,
    textAlign: "center",
    fontSize: 20,
    borderColor: "#93729A",
  },

  prompt: {
    fontSize: 24,
    paddingHorizontal: 30,
    paddingBottom: 20,
  },

  message: {
    fontSize: 16,
    paddingHorizontal: 30,
  },

  error: {
    color: "red",
  },
});

export default OtpScreen;
