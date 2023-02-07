import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "../../slices/userSlice";
import { updateAddress } from "../../api/user";
const SetAddresseScreen = ({ navigation }) => {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [address, setAddress] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { _id } = useSelector(selectUser);

  const handleLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
    }
    // Get the user's current location
    let location = await Location.getCurrentPositionAsync({});

    setLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    setShowMap(true);
  };
  const handleNext = async () => {
    setIsLoading(true);
    try {
      const { data } = await updateAddress(_id, address, location);
      dispatch(setUser(data));
      navigation.navigate("ProfileSetup");
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  return (
    <SafeAreaView className=" h-full py-8 flex-1 bg-white">
      {/* <View className="bg-white absolute top-5 left-0 w-full z-50">
        <GooglePlacesAutocomplete
          nearbyPlacesAPI="GoogleReverseGeocoding"
          debounce={400}
          minLength={3}
          placeholder="Search"
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
            setLocation({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
            });
          }}
          fetchDetails={true}
          query={{
            key: "AIzaSyDFAJzbmTW3_YfwQiYLSlHeRUR7vKYTc-c",
            language: "fr",
          }}
          onFail={(error) => console.error(error)}
        />
      </View> */}
      <View className="bg-white px-4 space-y-2">
        <View>
          <Text
            style={{ fontFamily: "Montserrat-SemiBold" }}
            className="text-lg"
          >
            Entrer votre adresse
          </Text>
          <TextInput
            className="border-b pt-2 text-lg"
            value={address}
            onChangeText={(text) => setAddress(text)}
            style={{ fontFamily: "Montserrat-SemiBold" }}
          />
        </View>
        <Text
          style={{ fontFamily: "Montserrat-SemiBold" }}
          className="text-center text-lg"
        >
          Ou
        </Text>
        <TouchableOpacity
          className="flex-row items-center justify-center border rounded-full py-2"
          onPress={handleLocation}
        >
          <Ionicons name="locate" size={24} color="black" />
          <Text
            style={{ fontFamily: "Montserrat-SemiBold" }}
            className="text-lg"
          >
            Utiliser votre localisation actuelle
          </Text>
        </TouchableOpacity>
      </View>
      {showMap ? (
        <View className="flex-1 justify-center items-center mt-4">
          <MapView
            region={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onPress={(e) => {
              setLocation({
                longitude: e.nativeEvent.coordinate.longitude,
                latitude: e.nativeEvent.coordinate.latitude,
              });
            }}
            className="h-full w-full"
          >
            <Marker coordinate={location} />
          </MapView>
        </View>
      ) : (
        <View className="flex-1"></View>
      )}
      <TouchableOpacity
        className={
          address.length === 0 &&
          (location.longitude === 0 || location.latitude === 0)
            ? "bg-gray-500 mt-10 w-2/3 mx-auto rounded-md py-2"
            : "bg-pr mt-10 w-2/3 mx-auto py-2 rounded-md"
        }
        onPress={handleNext}
        disabled={
          address.length === 0 &&
          (location.longitude === 0 || location.latitude === 0)
            ? true
            : false
        }
      >
        <Text
          className="text-center text-white text-lg"
          style={{ fontFamily: "Montserrat-SemiBold" }}
        >
          SUIVANT
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SetAddresseScreen;
