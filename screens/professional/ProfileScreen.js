import { useNavigation } from "@react-navigation/native";
import { deleteItemAsync } from "expo-secure-store";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { clearUserDataToken, selectUser } from "../../slices/userSlice";
import {
  Entypo,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { logoutUser } from "../../api/user";
import Avatar from "../../components/Avatar";
const ProfileScreen = () => {
  const user = useSelector(selectUser);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const logout = async () => {
    try {
      await deleteItemAsync("token");
      await logoutUser(user._id);
      dispatch(clearUserDataToken());
    } catch (error) {
      if (error.response) {
        Alert.alert("Oops problème");
      } else {
        Alert.alert("problème de réseau");
      }
    }
  };
  return (
    <ScrollView
      className="py-6 px-4 bg-white flex-1"
      contentContainerStyle={{
        paddingBottom: 25,
        paddingTop: 25,
      }}
    >
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
        <View className="mt-6 space-y-4 ">
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => navigation.navigate("PersonalInfo")}
          >
            <View className="bg-pr rounded-full w-10 h-10 items-center justify-center">
              <FontAwesome5 name="user-alt" size={19} color="white" />
            </View>
            <Text
              className="ml-2 text-base flex-1 text-txt"
              style={{ fontFamily: "Montserrat-Medium" }}
            >
              Informations personelles
            </Text>
            <Entypo name="chevron-right" size={22} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => navigation.navigate("ProfessionalInfo")}
          >
            <View className="bg-pr rounded-full w-10 h-10 items-center justify-center">
              <MaterialCommunityIcons
                name="face-woman-shimmer"
                size={21}
                color="white"
              />
            </View>
            <Text
              className="ml-2 text-base flex-1 text-txt"
              style={{ fontFamily: "Montserrat-Medium" }}
            >
              Informations professionnelles
            </Text>
            <Entypo name="chevron-right" size={22} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => navigation.navigate("Schedual")}
          >
            <View className="bg-pr rounded-full w-10 h-10 items-center justify-center">
              <FontAwesome name="calendar" size={21} color="white" />
            </View>
            <Text
              className="ml-2 text-base flex-1 text-txt"
              style={{ fontFamily: "Montserrat-Medium" }}
            >
              Emploie du temps
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
              className="ml-2 text-base flex-1 text-txt"
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
              className="ml-2 text-base flex-1 text-txt"
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
              className="ml-2 text-base flex-1 text-txt"
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
            className="ml-2 text-base flex-1 text-txt"
            style={{ fontFamily: "Montserrat-Medium" }}
          >
            Déconnexion
          </Text>
          <Entypo name="chevron-right" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
