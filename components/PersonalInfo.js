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
import Avatar from "./Avatar";

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
      if (error.response) {
        Alert.alert("Problème interne");
      } else {
        Alert.alert("problème internet");
      }
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
        <Avatar image={user.image} size="large" radius="full" />
        <Text
          style={{ fontFamily: "Montserrat-SemiBold" }}
          className="mt-2 text-lg tracking-widest text-txt"
        >
          {user.phone_number}
        </Text>
      </View>
      <View className="mt-4">
        <View className="mt-6">
          <Text
            style={{ fontFamily: "Montserrat-SemiBold" }}
            className="text-lg text-txt"
          >
            Nom et Prénom
          </Text>
          <TextInput
            placeholder={formFields.full_name}
            className="text-lg  border-b px-1 py-2 text-txt"
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
            className="text-lg text-txt"
          >
            Email
          </Text>
          <TextInput
            placeholder={formFields.email}
            className="text-lg  border-b px-1 py-2 text-txt"
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
            className="text-lg text-txt"
          >
            Date de naissance
          </Text>
          <TouchableOpacity
            className="border-b px-1 py-2"
            onPress={() => setShow(true)}
          >
            <Text
              style={{ fontFamily: "Montserrat-Medium" }}
              className="text-lg text-txt"
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
              value={formFields.birthday || new Date()}
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
