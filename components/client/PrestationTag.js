import React from "react";
import { Text } from "react-native";

const PrestationTag = ({ state }) => {
  if (state === "done") {
    return (
      <Text
        className="bg-green-400 px-3 py-1 flex-row rounded-full text-white"
        style={{ fontFamily: "Montserrat-Medium" }}
      >
        Effectué
      </Text>
    );
  } else if (state === "accepted") {
    return (
      <Text
        className="bg-[#FDDA0D] px-3 py-1 flex-row rounded-full"
        style={{ fontFamily: "Montserrat-Medium" }}
      >
        Réservé
      </Text>
    );
  } else if (state === "canceled") {
    return (
      <Text
        className="bg-red-400 px-3 py-1 flex-row rounded-full text-white"
        style={{ fontFamily: "Montserrat-Medium" }}
      >
        Annulé
      </Text>
    );
  } else {
    return (
      <Text
        className="bg-red-400 px-3 py-1 flex-row rounded-full text-white"
        style={{ fontFamily: "Montserrat-Medium" }}
      >
        Refusé
      </Text>
    );
  }
};

export default PrestationTag;
