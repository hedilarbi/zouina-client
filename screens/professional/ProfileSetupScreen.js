import React, { useState, useEffect } from "react";
import {
  Dimensions,
  Animated,
  Alert,
  View,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import mime from "mime";

import SetName from "../../components/setUpProfile/SetName";
import SetMail from "../../components/setUpProfile/SetMail";
import SetSchedual from "../../components/setUpProfile/SetSchedual";
import SetGallery from "../../components/setUpProfile/SetGallery";
import SetSpecialities from "../../components/setUpProfile/SetSpecialities";
import { BASE_URL } from "../../assets/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  selectData,
  selectUser,
  setData,
  setUser,
} from "../../slices/userSlice";
const { width } = Dimensions.get("window");

const ProfileSetupScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [slideAnimValue] = useState(new Animated.Value(0));
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [specialities, setSpecialities] = useState([]);
  const [birthday, setBirthday] = useState({
    day: "",
    month: "",
    year: "",
  });
  const { schedual } = useSelector(selectData);

  const [workingTime, setWorkingTime] = useState(schedual);
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
    setIsLoading(true);
    const formdata1 = new FormData();
    if (image) {
      formdata1.append("file", {
        uri: image,
        type: mime.getType(image),
        name: image.split("/").pop(),
      });
    }
    formdata1.append("name", name);
    formdata1.append("email", mail);
    if (birthday.day != "" && birthday.month != "" && birthday.year != "") {
      formdata1.append(
        "birthday",
        birthday.day + "/" + birthday.month + "/" + birthday.year
      );
    }

    const formdata2 = new FormData();
    if (images.length > 0) {
      images.map((image) => {
        formdata2.append("files", {
          uri: image,
          type: mime.getType(image),
          name: image.split("/").pop(),
        });
      });
    }

    workingTime.map((day) => {
      formdata2.append("schedual", JSON.stringify(day));
    });
    if (specialities.length > 0) {
      specialities.map((speciality) => {
        formdata2.append("specialities", speciality);
      });
    }

    const updateProfessionalProProfile = fetch(
      `${BASE_URL}/professionals/update/profile/${_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formdata2,
      }
    );

    const updateUserProfile = fetch(`${BASE_URL}/users/update/profile/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formdata1,
    });

    Promise.all([updateProfessionalProProfile, updateUserProfile])
      .then((responses) => {
        return Promise.all(responses.map((response) => response.json()));
      })
      .then((datas) => {
        let data = {};
        let user = {};

        datas.map((item) => {
          if (Object.keys(item)[0] === "data") {
            data = item;
          } else {
            user = item;
          }
        });

        dispatch(setData(data.data));
        dispatch(setUser(user));
        setIsLoading(false);
      })
      .catch((err) => {
        Alert.alert(err.message);
        setIsLoading(false);
      });
  };

  return (
    <SafeAreaView className="flex-row flex-1 bg-white">
      {isLoading && (
        <View className="absolute top-0 left-0 h-full w-full z-50 justify-center items-center">
          <ActivityIndicator size="large" />
        </View>
      )}
      <SetName
        image={image}
        setImage={setImage}
        name={name}
        setName={setName}
        handleNext={handleNext}
        width={width}
        slideAnimValue={slideAnimValue}
      />
      <SetSchedual
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        width={width}
        slideAnimValue={slideAnimValue}
        workingTime={workingTime}
        setWorkingTime={setWorkingTime}
      />
      <SetGallery
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        width={width}
        slideAnimValue={slideAnimValue}
        images={images}
        setImages={setImages}
      />
      <SetSpecialities
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        width={width}
        slideAnimValue={slideAnimValue}
        specialities={specialities}
        setSpecialities={setSpecialities}
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
