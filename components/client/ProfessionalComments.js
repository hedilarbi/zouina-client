import { View, Text, Image } from "react-native";
import React from "react";
import Avatar from "../Avatar";

const ProfessionalComments = ({ comments }) => {
  return (
    <View className="p-4">
      {comments.map((comment) => {
        return (
          <View key={comment._id} className="mb-4 flex-row items-center">
            <Avatar
              image={comment.client.user.image}
              size="xlarge"
              radius="full"
            />
            <Text
              className="ml-4 px-2 text-txt"
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
