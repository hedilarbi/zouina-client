import React, { useState } from "react";
import { useEffect } from "react";
import { Dimensions, Animated, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const { width } = Dimensions.get("window");
import mime from "mime";
import { BASE_URL } from "../../assets/constants";
import SetName from "../../components/setUpProfile/SetName";
import SetMail from "../../components/setUpProfile/SetMail";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "../../slices/userSlice";

const ProfileSetupScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [slideAnimValue] = useState(new Animated.Value(0));
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [birthday, setBirthday] = useState({
    day: "",
    month: "",
    year: "",
  });
  const { _id } = useSelector(selectUser);

  const dispatch = useDispatch();
  useEffect(() => {
    Animated.timing(slideAnimValue, {
      toValue: -width * currentStep,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [currentStep]);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const updateProfile = async () => {
    const formdata = new FormData();
    if (image) {
      formdata.append("file", {
        uri: image,
        type: mime.getType(image),
        name: image.split("/").pop(),
      });
    }
    formdata.append("name", name);
    formdata.append("email", mail);
    if (birthday.day != "" && birthday.month != "" && birthday.year != "") {
      formdata.append(
        "birthday",
        birthday.day + "/" + birthday.month + "/" + birthday.year
      );
    }

    try {
      const response = await fetch(`${BASE_URL}/users//update/profile/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formdata,
      });
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      const data = await response.json();

      dispatch(setUser(data));
      //navigation.navigate("MainNavigator");
    } catch (err) {
      Alert.alert(err.message);
    }
  };

  return (
    <SafeAreaView className="flex-row flex-1 bg-white">
      <SetName
        image={image}
        setImage={setImage}
        name={name}
        setName={setName}
        handleNext={handleNext}
        width={width}
        slideAnimValue={slideAnimValue}
      />
      <SetMail
        setBirthday={setBirthday}
        handlePrevious={handlePrevious}
        width={width}
        slideAnimValue={slideAnimValue}
        mail={mail}
        setMail={setMail}
        birthday={birthday}
        updateProfile={updateProfile}
      />
    </SafeAreaView>
  );
};

export default ProfileSetupScreen;