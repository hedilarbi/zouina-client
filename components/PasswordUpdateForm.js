import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";

import { updatePassword } from "../api/user";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "../slices/userSlice";

const PasswordUpdateForm = () => {
  const dispatch = useDispatch();
  const { _id } = useSelector(selectUser);
  const [isLoading, setIsLoading] = useState(false);
  const [formFields, setFormFields] = useState({
    old: "",
    new: "",
    confirm: "",
  });

  const savePassword = async () => {
    if (formFields.new != formFields.confirm) {
      Alert.alert("le mot de passe et sa confirmation doivent etre identique");
    } else {
      setIsLoading(true);
      try {
        const { data, status } = await updatePassword(
          _id,
          formFields.old,
          formFields.new
        );
        dispatch(setUser(data));
        setIsLoading(false);
        Alert.alert("Mot de passe modifié");
      } catch (error) {
        setIsLoading(false);
        Alert.alert("mot de passe incorrecte");
      }
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {isLoading && (
        <View className="absolute w-full h-full justify-center items-center z-50 ">
          <ActivityIndicator size="large" />
        </View>
      )}

      <View className="mt-6">
        <Text style={{ fontFamily: "Montserrat-SemiBold" }} className="text-xl">
          Changer mot de passe
        </Text>
        <View className="mt-4">
          <View className="mt-2">
            <Text
              style={{ fontFamily: "Montserrat-SemiBold" }}
              className="text-lg"
            >
              Ancien mot de passe
            </Text>
            <TextInput
              className="border-b py-2 text-lg"
              secureTextEntry={true}
              value={formFields.old}
              style={{ fontFamily: "Montserrat-Medium" }}
              onChangeText={(text) =>
                setFormFields({ ...formFields, old: text })
              }
            />
          </View>
          <View className="mt-4">
            <Text
              style={{ fontFamily: "Montserrat-SemiBold" }}
              className="text-lg"
            >
              Nouveau mot de passe
            </Text>
            <TextInput
              className="border-b py-2 text-lg"
              secureTextEntry={true}
              value={formFields.new}
              style={{ fontFamily: "Montserrat-Medium" }}
              onChangeText={(text) =>
                setFormFields({ ...formFields, new: text })
              }
            />
          </View>
          <View className="mt-4">
            <Text
              style={{ fontFamily: "Montserrat-SemiBold" }}
              className="text-lg"
            >
              Confirmer mot de passe
            </Text>
            <TextInput
              className="border-b py-2 text-lg"
              secureTextEntry={true}
              value={formFields.confirm}
              style={{ fontFamily: "Montserrat-Medium" }}
              onChange={(text) =>
                setFormFields({ ...formFields, confirm: text })
              }
            />
          </View>
        </View>
      </View>
      <TouchableOpacity
        className="mt-10 bg-pr py-3 rounded-md"
        onPress={savePassword}
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

export default PasswordUpdateForm;
