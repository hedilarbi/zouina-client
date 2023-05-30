import { Text, TouchableOpacity } from "react-native";
import React from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
const TimePicker = ({ session, setWorkingTime, state, day, time }) => {
  const [show, setShow] = useState(false);
  const newTime = new Date(time);

  const onTimeSelected = (event, selectedDate) => {
    setWorkingTime((prevState) => {
      const newState = prevState.map((obj) => {
        if (obj.day === day) {
          if (session === "morning_session") {
            if (state === "open") {
              return {
                ...obj,
                morning_session: { ...obj.morning_session, open: selectedDate },
              };
            } else {
              return {
                ...obj,
                morning_session: {
                  ...obj.morning_session,
                  close: selectedDate,
                },
              };
            }
          } else {
            if (state === "open") {
              return {
                ...obj,
                afternoon_session: {
                  ...obj.afternoon_session,
                  open: selectedDate,
                },
              };
            } else {
              return {
                ...obj,
                afternoon_session: {
                  ...obj.afternoon_session,
                  close: selectedDate,
                },
              };
            }
          }
        }
        return obj;
      });
      return newState;
    });
    setShow(false);
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setShow(true)}
        className="bg-slate-300 rounded-md px-2 py-1  ml-4"
      >
        <Text style={{ fontFamily: "Montserrat-Medium" }} className="text-txt">
          {newTime.getHours() < 10
            ? "0" + newTime.getHours()
            : newTime.getHours()}{" "}
          :{" "}
          {newTime.getMinutes() < 10
            ? "0" + newTime.getMinutes()
            : newTime.getMinutes()}
        </Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={newTime}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onTimeSelected}
          minuteInterval={15}
        />
      )}
    </>
  );
};

export default TimePicker;
