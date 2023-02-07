import { View, Image } from "react-native";
import React from "react";

const ProfessionalGallery = ({ gallery }) => {
  return (
    <View className="flex-row flex-wrap justify-between py-4 gap-y-5 px-2">
      {gallery.map((image, index) => {
        return (
          <Image
            key={index}
            source={{ uri: image }}
            style={{ width: "32%", height: 190 }}
            className="rounded-md"
          />
        );
      })}
    </View>
  );
};

export default ProfessionalGallery;
