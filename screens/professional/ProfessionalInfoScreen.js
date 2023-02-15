import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { selectData, selectUser, setData } from "../../slices/userSlice";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import mime from "mime";
import { BASE_URL } from "../../assets/constants";

const ProfessionalInfoScreen = ({}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { gallery, specialities, _id } = useSelector(selectData);
  const [images, setImages] = useState(gallery);

  const pickImage = async (index) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
    });

    if (result.cancelled) {
      return;
    }

    let selectedImages;
    if (result.hasOwnProperty("selected")) {
      selectedImages = [...images, ...result.selected.map(({ uri }) => uri)];
    } else {
      selectedImages = [...images, result.uri];
    }
    setImages(selectedImages);
  };

  const removeImage = (index) => {
    setImages(images.filter((image, i) => i !== index));
  };

  const updateProfile = async () => {
    setIsLoading(true);
    let newImages = [];
    let imagesToDelete = [];

    images.map((image) => {
      if (!image.includes("https://storage.googleapis.com/")) {
        newImages.push(image);
      }
    });

    gallery.map((image) => {
      if (!images.includes(image)) {
        imagesToDelete.push(image);
      }
    });

    const formdata = new FormData();
    if (newImages.length > 0) {
      newImages.map((image) => {
        formdata.append("files", {
          uri: image,
          type: mime.getType(image),
          name: image.split("/").pop(),
        });
      });
    }

    if (imagesToDelete.length > 0) {
      imagesToDelete.map((image) => {
        formdata.append("toDelete", image);
      });
    }
    console.log(formdata);
    await fetch(`${BASE_URL}/professionals/update/gallery/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formdata,
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(setData(data));
        setIsLoading(false);
        Alert.alert("Gallerie modifié");
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error.message);
      });
  };
  return (
    <SafeAreaView className="flex-1 bg-white px-4 py-2">
      {isLoading && (
        <View className="absolute top-0 left-0 h-full w-full justify-center items-center z-50">
          <ActivityIndicator size="large" />
        </View>
      )}
      <View className="">
        <Text style={{ fontFamily: "Montserrat-SemiBold" }} className="text-xl">
          Spécialités
        </Text>
        <View className="flex-row  mt-4 items-center space-x-4">
          {specialities.map((speciality, index) => (
            <Text
              className="bg-gray-300 text-black px-4 py-0.5 rounded-full text-base mr-2"
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
                    height: "40%",
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
      <TouchableOpacity
        className="mt-10 bg-pr py-3 rounded-md"
        onPress={updateProfile}
      >
        <Text
          style={{ fontFamily: "Montserrat-SemiBold" }}
          className="text-xl text-center text-white"
        >
          Sauvegarder
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProfessionalInfoScreen;
