import { View, Text, Animated, TouchableOpacity, Image } from "react-native";
import React from "react";
import { FontAwesome, AntDesign } from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";

const SetGallery = ({
  slideAnimValue,
  width,
  handlePrevious,
  handleNext,
  images,
  setImages,
}) => {
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
    <Animated.View
      style={{
        transform: [{ translateX: slideAnimValue }],
        width: width,
      }}
      className="py-8 px-4 justify-between space-y-8"
    >
      <View className="flex-row justify-between">
        <TouchableOpacity onPress={handlePrevious}>
          <FontAwesome name="chevron-left" size={30} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext}>
          <Text
            className="text-gray-400 text-xl"
            style={{ fontFamily: "Montserrat-Bold" }}
          >
            SKIP
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text
          style={{ fontFamily: "Montserrat-SemiBold" }}
          className="text-gray-500 text-center text-xl"
        >
          Ajouter des photos
        </Text>
        <Text
          style={{ fontFamily: "Montserrat-Medium" }}
          className="text-gray-400 text-center text-lg"
        >
          Ces images seront affiché dans profile
        </Text>
      </View>
      <View className="flex-row flex-wrap justify-between flex-1  gap-y-4">
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
                className="   rounded-md"
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
      <TouchableOpacity
        className="bg-pr mt-10 w-2/3 mx-auto py-2 rounded-md"
        onPress={handleNext}
      >
        <Text
          className="text-center text-white text-lg"
          style={{ fontFamily: "Montserrat-SemiBold" }}
        >
          Suivant
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default SetGallery;
