import {
  View,
  Text,
  Modal,
  Alert,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";

import { reviewPrestation } from "../../api/prestations";
import { BASE_URL } from "../../assets/constants";
import axios from "axios";
import { deleteItemAsync } from "expo-secure-store";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

export default function OnPrestationBanner({ prestationId }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  const getReviewState = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/prestations/prestation/review_state/${prestationId}`
      );

      if (data.review_status === false) {
        setModalVisible(true);
      }
      if (data.state === "accepted" && data.type === "Schedual") {
        setMessage("vous avez une réservation en cours");
      } else if (
        data.state === "accepted" &&
        data.type === "Immediately" &&
        data.at_destination === false
      ) {
        setMessage("Votre professionelle est en route");
      } else if (data.at_destination === true && data.state === "accepted") {
        setMessage("Préstation en cours");
      }
    } catch (error) {
      const { status } = error.response;
      if (status === 500) {
        Alert.alert("Problème interne");
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      getReviewState();
    })
  );

  const HandleSendReview = async () => {
    try {
      setModalVisible(false);
      await reviewPrestation(prestationId, rating, comment);
      await deleteItemAsync("prestationId");
    } catch (error) {
      if (error.response) {
        Alert.alert("Problème interne");
      } else {
        Alert.alert("problème internet");
      }
    }
  };

  return (
    <View className="items-center justify-center flex-1 ">
      <Text
        className="text-xl border-pr border-2 rounded-md px-16 py-4"
        style={{ fontFamily: "Montserrat-Medium" }}
      >
        {message}
      </Text>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View className="flex-1 justify-center  mt-6">
          <View
            className="m-6 bg-white rounded-3xl p-9 shadow-black"
            style={{
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 4,
            }}
          >
            <Text
              style={{ fontFamily: "Montserrat-SemiBold" }}
              className="text-xl text-txt"
            >
              Note
            </Text>
            <View className="flex-row space-x-2 my-4">
              {Array(5)
                .fill()
                .map((_, i) => {
                  return (
                    <TouchableWithoutFeedback
                      key={i}
                      onPress={() => setRating(i + 1)}
                    >
                      <FontAwesome
                        name={i + 1 <= rating ? "star" : "star-o"}
                        size={32}
                        color="gold"
                        style={{ marginRight: 6 }}
                      />
                    </TouchableWithoutFeedback>
                  );
                })}
            </View>
            <Text
              style={{ fontFamily: "Montserrat-SemiBold" }}
              className="text-xl text-txt"
            >
              Commentaire
            </Text>
            <TextInput
              placeholder="Votre commentaire"
              value={comment}
              className="py-3 text-xl rounded-md bg-gray-100 px-2 my-4 text-txt"
              style={{ fontFamily: "Montserrat-Medium" }}
              placeholderTextColor="gray"
              onChangeText={(text) => setComment(text)}
            />
            <TouchableOpacity
              className="py-2 mt-4 bg-pr rounded-md"
              onPress={HandleSendReview}
            >
              <Text
                className="text-center text-white text-xl"
                style={{ fontFamily: "Montserrat-SemiBold" }}
              >
                Envoyer
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
