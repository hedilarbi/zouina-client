import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";

const FormatedDate = ({ finishedAt, schedual_date, state }) => {
  const [date, setDate] = useState({
    date: "",
    time: "",
  });
  const formatDate = () => {
    let date1;
    if (state != "done") {
      date1 = new Date(schedual_date);
    } else {
      date1 = new Date(finishedAt);
    }
    setDate({
      date: date1.toDateString("fr-FR"),
      time: date1.toLocaleTimeString("fr-FR").slice(0, 5),
    });
  };
  useEffect(() => {
    formatDate();
  }, []);

  return (
    <>
      <View className="flex-row space-x-4 items-center mt-2">
        <FontAwesome name="calendar" size={22} color="#818589" />
        <Text style={{ fontFamily: "Montserrat-Medium" }} className="text-txt">
          {date.date}
        </Text>
      </View>
      <View className="flex-row space-x-4 items-center mt-4">
        <FontAwesome name="clock-o" size={22} color="#818589" />
        <Text style={{ fontFamily: "Montserrat-Medium" }} className="text-txt">
          {date.time}
        </Text>
      </View>
    </>
  );
};

export default FormatedDate;
