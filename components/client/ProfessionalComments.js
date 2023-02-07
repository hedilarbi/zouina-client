import { View, Text, Image } from "react-native";
import React from "react";

const ProfessionalComments = ({ comments }) => {
  return (
    <View className="p-4">
      {comments.map((comment) => {
        return (
          <View key={comment._id} className="mb-4 flex-row items-center">
            {comment.client.user.image ? (
              <Image
                source={{ uri: comment.client.user.image }}
                className="h-10 w-10 rounded-full"
              />
            ) : (
              <View className="bg-pr rounded-full w-10 h-10 justify-center items-center">
                <Text
                  className="capitalize text-white"
                  style={{ fontFamily: "Montserrat-Bold" }}
                >
                  {comment.client.user.full_name[0]}
                </Text>
              </View>
            )}
            <Text
              className="ml-4 px-2"
              style={{ fontFamily: "Montserrat-Medium" }}
            >
              {comment.comment}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default ProfessionalComments;
