import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { selectData } from "../../slices/userSlice";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

const ProfessionalInfoScreen = ({}) => {
  const { gallery, specialities } = useSelector(selectData);
  const [images, setImages] = useState(gallery);

  const pickImage = async (index) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      selectionLimit: 2,
    });

    if (result.cancelled) {
      return;
    }

    let newImages;
    if (result.hasOwnProperty("selected")) {
      newImages = [...images, ...result.selected.map(({ uri }) => uri)];
    } else {
      newImages = [...images, result.uri];
    }
    setImages(newImages);
  };

  const removeImage = (index) => {
    const newImages = images.filter((image, i) => i !== index);

    setImages(newImages);
  };
  return (
    <SafeAreaView className="flex-1 bg-white px-4 py-2">
      <View className="">
        <Text style={{ fontFamily: "Montserrat-SemiBold" }} className="text-xl">
          Spécialités
        </Text>
        <View className="flex-row justify-between mt-4 items-center space-x-4">
          {specialities.map((speciality, index) => (
            <Text
              className="bg-gray-300 text-black px-4 py-0.5 rounded-full text-base"
              style={{ fontFamily: "Montserrat-Medium" }}
              key={index}
            >
              {speciality}
            </Text>
          ))}
        </View>
      </View>
      <View className="mt-4 flex-1">
        <Text style={{ fontFamily: "Montserrat-SemiBold" }} className="text-xl">
          Gallerie
        </Text>
        <View className="flex-row flex-wrap justify-between flex-1 mt-4">
          {Array(6)
            .fill()
            .map((_, i) => {
              return (
                <View
                  style={{
                    width: "30%",
                    height: "30%",
                    borderStyle: "dashed",
                  }}
                  key={i}
                  className=" mb-6 rounded-md"
                >
                  {images[i] ? (
                    <Image
                      source={{ uri: images[i] }}
                      style={{ resizeMode: "cover" }}
                      className="flex-1  rounded-md"
                    />
                  ) : (
                    <TouchableOpacity
                      onPress={() => pickImage(i)}
                      className="flex-1 rounded-md bg-gray-300 border-2 border-gray-400"
                    ></TouchableOpacity>
                  )}

                  {images[i] ? (
                    <TouchableOpacity
                      className="absolute -bottom-2 -right-3 bg-white rounded-full"
                      onPress={() => removeImage(i)}
                    >
                      <AntDesign name="closecircle" size={28} color="#FA69B7" />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      className="absolute -bottom-2 -right-3 bg-white rounded-full"
                      onPress={() => pickImage(i)}
                    >
                      <AntDesign name="pluscircle" size={28} color="#FA69B7" />
                    </TouchableOpacity>
                  )}
                </View>
              );
            })}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfessionalInfoScreen;
