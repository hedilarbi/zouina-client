import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { clearUserDataToken, selectUser } from "../../slices/userSlice";
import { Entypo, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { deleteItemAsync } from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";
import { logoutUser } from "../../api/user";
import Avatar from "../../components/Avatar";

const ProfileScreen = () => {
  const user = useSelector(selectUser);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const logout = async () => {
    await logoutUser(user._id);
    await deleteItemAsync("token");
    dispatch(clearUserDataToken());
  };

  return (
    <SafeAreaView className="py-6 px-4 bg-white flex-1 ">
      <View className="mx-auto">
        <Avatar image={user.image} size="large" radius="full" />
      </View>
      <View className="mt-12 pr-6">
        <Text
          style={{ fontFamily: "Montserrat-SemiBold" }}
          className="text-xl text-txt"
        >
          Paramètres du compte
        </Text>
        <View className="mt-6 space-y-8 ">
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => navigation.navigate("ProfileInformation")}
          >
            <View className="bg-pr rounded-full w-10 h-10 items-center justify-center">
              <FontAwesome5 name="user-alt" size={19} color="white" />
            </View>
            <Text
              className="ml-2 text-lg flex-1 text-txt"
              style={{ fontFamily: "Montserrat-Medium" }}
            >
              Informations du profile
            </Text>
            <Entypo name="chevron-right" size={22} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => navigation.navigate("Password")}
          >
            <View className="bg-pr rounded-full w-10 h-10 items-center justify-center">
              <FontAwesome5 name="key" size={19} color="white" />
            </View>
            <Text
              className="ml-2 text-lg flex-1 text-txt"
              style={{ fontFamily: "Montserrat-Medium" }}
            >
              Changer mot de passe
            </Text>
            <Entypo name="chevron-right" size={22} color="black" />
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center">
            <View className="bg-pr rounded-full w-10 h-10 items-center justify-center">
              <Ionicons name="document-text" size={22} color="white" />
            </View>
            <Text
              className="ml-2 text-lg flex-1 text-txt"
              style={{ fontFamily: "Montserrat-Medium" }}
            >
              conditions d'utilisation
            </Text>
            <Entypo name="chevron-right" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center">
            <View className="bg-pr rounded-full w-10 h-10 items-center justify-center">
              <Ionicons name="document-text" size={22} color="white" />
            </View>
            <Text
              className="ml-2 text-lg flex-1 text-txt"
              style={{ fontFamily: "Montserrat-Medium" }}
            >
              politique de confidentialité
            </Text>
            <Entypo name="chevron-right" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className="flex-row items-center mt-16"
          onPress={logout}
        >
          <View className="h-10 w-10 rounded-full bg-pr items-center justify-center">
            <Entypo name="log-out" size={20} color="white" />
          </View>
          <Text
            className="ml-2 text-lg flex-1 text-txt"
            style={{ fontFamily: "Montserrat-Medium" }}
          >
            Déconnexion
          </Text>
          <Entypo name="chevron-right" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
