import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import React, { useState } from "react";

import RNDateTimePicker from "@react-native-community/datetimepicker";

import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "../slices/userSlice";
import { updateUser } from "../api/user";

const PersonalInfo = () => {
  const user = useSelector(selectUser);

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [formFields, setFormFields] = useState({
    full_name: user.full_name,
    email: user.email,
    birthday: user.birthday ? new Date(user.birthday) : "",
  });

  const onDateSelected = (event, selectedDate) => {
    setShow(false);
    setFormFields({ ...formFields, birthday: selectedDate });
  };

  const saveChanges = async () => {
    setIsLoading(true);
    try {
      const { data } = await updateUser(
        user._id,
        formFields.full_name,
        formFields.email,
        formFields.birthday
      );
      dispatch(setUser(data));
      setIsLoading(false);
      Alert.alert("profile modifié");
    } catch (error) {
      setIsLoading(false);
      Alert.alert("Erreur ");
    }
  };
  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {isLoading && (
        <View className="absolute h-full w-full justify-center items-center z-50  ">
          <ActivityIndicator size="large" />
        </View>
      )}

      <View className="justify-center items-center">
        <View className=" h-24 w-24 rounded-full bg-pr justify-center ">
          {user.image ? (
            <Image
              source={{ uri: user.image }}
              style={{ resizeMode: "cover", flex: 1 }}
              className="rounded-full"
            />
          ) : (
            <Text
              className="capitalize text-6xl text-center mt-3 text-white"
              style={{ fontFamily: "Montserrat-SemiBold" }}
            >
              {user.full_name[0]}
            </Text>
          )}
        </View>
        <Text
          style={{ fontFamily: "Montserrat-SemiBold" }}
          className="mt-2 text-lg tracking-widest"
        >
          {user.phone_number}
        </Text>
      </View>
      <View className="mt-4">
        <View className="mt-6">
          <Text
            style={{ fontFamily: "Montserrat-SemiBold" }}
            className="text-lg"
          >
            Nom et Prénom
          </Text>
          <TextInput
            placeholder={formFields.full_name}
            className="text-lg  border-b px-1 py-2"
            placeholderTextColor={"#E7ACAA"}
            style={{ fontFamily: "Montserrat-Medium" }}
            value={formFields.full_name}
            onChangeText={(text) =>
              setFormFields({ ...formFields, full_name: text })
            }
          />
        </View>
        <View className="mt-6">
          <Text
            style={{ fontFamily: "Montserrat-SemiBold" }}
            className="text-lg"
          >
            Email
          </Text>
          <TextInput
            placeholder={formFields.email}
            className="text-lg  border-b px-1 py-2"
            placeholderTextColor={"#E7ACAA"}
            style={{ fontFamily: "Montserrat-Medium" }}
            value={formFields.email}
            onChangeText={(text) =>
              setFormFields({ ...formFields, email: text })
            }
          />
        </View>
        <View className="mt-6">
          <Text
            style={{ fontFamily: "Montserrat-SemiBold" }}
            className="text-lg"
          >
            Date de naissance
          </Text>
          <TouchableOpacity
            className="border-b px-1 py-2"
            onPress={() => setShow(true)}
          >
            <Text
              style={{ fontFamily: "Montserrat-Medium" }}
              className="text-lg text-[#E7ACAA]"
            >
              {formFields.birthday === ""
                ? ""
                : formFields.birthday.getDate() +
                  " / " +
                  (formFields.birthday.getMonth() + 1) +
                  " / " +
                  formFields.birthday.getFullYear()}
            </Text>
          </TouchableOpacity>
          {show && (
            <RNDateTimePicker
              value={formFields.birthday}
              mode="date"
              onChange={onDateSelected}
            />
          )}
        </View>
      </View>
      <TouchableOpacity
        className="mt-10 bg-pr py-3 rounded-md"
        onPress={saveChanges}
      >
        <Text
          style={{ fontFamily: "Montserrat-SemiBold" }}
          className="text-xl text-center text-white"
        >
          Sauvegarder
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default PersonalInfo;
