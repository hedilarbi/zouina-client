import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import DateTimePicker from "@react-native-community/datetimepicker";
import { formatDate } from "../../utils/dateHandlers";
import ErrorModal from "../../components/modals/ErrorModal";

const ProfileSetupScreen = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [coords, setCoords] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isFail, setIsFail] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date("2015-1-1"));

  const nameInput = useRef(null);
  const emailInput = useRef(null);

  useEffect(() => {
    if (isFail) {
      const timer = setTimeout(() => {
        setIsFail(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isFail]);

  const updateUser = async () => {
    // if (name.length <= 0) {
    //   nameInput.current.setNativeProps({
    //     style: {
    //       borderColor: "red",
    //       borderWidth: 2,
    //     },
    //   });
    //   return null;
    // }
    // const isEmailValid = emailValidator(email);
    // if (isEmailValid) {
    //   emailInput.current.setNativeProps({
    //     style: {
    //       borderColor: "red",
    //       borderWidth: 2,
    //     },
    //   });
    //   return null;
    // }
    // setIsLoading(true);
    // setUserInfo(_id, name, email, address, coords, date)
    //   .then((response) => {
    //     if (response.status) {
    //       dispatch(setUser(response.data));
    //     } else {
    //       console.log(response);
    //       setIsFail(true);
    //     }
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
  };

  const onChangeDate = ({ type }, selectedDate) => {
    if (type == "set") {
      setDate(selectedDate);

      if (Platform.OS == "android") {
        setShowDatePicker(false);

        setDateOfBirth(formatDate(selectedDate));
      }
    } else {
      setShowDatePicker(false);
    }
  };

  const confirmIOSDate = () => {
    setDateOfBirth(formatDate(date));
    setShowDatePicker(false);
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      className="flex-1 "
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className="flex-1 py-4 px-3 bg-indigo-50">
        <ErrorModal visiblity={isFail} />

        <View className="mt-3 flex-1">
          <Text className="text-xl font-montserrat font-semibold text-gray-800">
            Creation de profile
          </Text>

          <View className="mt-6">
            <Text className="font-latoB text-lg text-gray-500">
              Nom et Prenom
            </Text>
            <TextInput
              placeholder="Full Name"
              className=" py-2 px-2 bg-white rounded-md mt-2 text-gray-800 font-lato text-lg"
              onChangeText={(text) => setName(text)}
              ref={nameInput}
            />
          </View>
          <View className="mt-4 ">
            <Text className="font-latoB text-lg text-gray-500">Email</Text>
            <TextInput
              className=" py-2 px-2 bg-white rounded-md mt-2 text-gray-800 font-lato text-lg"
              placeholder="Email"
              onChangeText={(text) => setEmail(text)}
              ref={emailInput}
            />
          </View>

          <View className="mt-4 ">
            <Text className="font-latoB text-lg text-gray-500">
              Date de naissance
            </Text>
            {showDatePicker && (
              <DateTimePicker
                mode="date"
                display="spinner"
                value={date}
                onChange={onChangeDate}
                style={{ height: 120, marginTop: -10 }}
                maximumDate={new Date("2015-1-1")}
              />
            )}
            {showDatePicker && Platform.OS == "ios" && (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around ",
                }}
              >
                <TouchableOpacity
                  onPress={() => setShowDatePicker(false)}
                  className="bg-gray-400 rounded-md items-center px-4 py-2"
                >
                  <Text className="font-latoB text-lg text-gray-500">
                    Annuler
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={confirmIOSDate}
                  className="bg-pr rounded-md items-center px-4 py-2"
                >
                  <Text className="font-latoB text-lg text-gray-500">
                    Confirmer
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            {!showDatePicker && (
              <Pressable onPress={() => setShowDatePicker(true)}>
                <TextInput
                  className="py-2 px-2 bg-white rounded-md mt-2 text-black font-lato text-lg"
                  placeholder="25 / 10 / 1999"
                  value={dateOfBirth}
                  editable={false}
                  onPressIn={() => setShowDatePicker(true)}
                />
              </Pressable>
            )}
          </View>
        </View>
        <TouchableOpacity
          className={
            name.length > 0
              ? "bg-pr mt-10 py-3 rounded-md items-center"
              : "bg-gray-400 mt-10 py-3 rounded-md items-center"
          }
          onPress={updateUser}
          disabled={name.length > 0 ? false : true}
        >
          <Text className="font-latoB text-lg text-white">Continuer</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ProfileSetupScreen;
