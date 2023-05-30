import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectBasketServices } from "../../slices/basketSlice";
import { useEffect } from "react";
import BasketCard from "../../components/client/BasketCard";
import { useNavigation } from "@react-navigation/native";
import { selectProfessional } from "../../slices/professionalSlice";
import { createPrestation } from "../../api/prestations";
import { selectData } from "../../slices/userSlice";
import Avatar from "../../components/Avatar";

const ConfirmScreen = ({ route }) => {
  const navigation = useNavigation();
  const professional = useSelector(selectProfessional);
  const client_id = useSelector(selectData)._id;
  const { type, time, date } = route.params;
  const [groupedServicesInBasket, setGroupedServicesInBasket] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [servicesList, setServicesList] = useState([]);
  const services = useSelector(selectBasketServices);

  function createServicesListAndTotalPrice(groupedServices) {
    let services_list = [];
    let total_price = 0;

    Object.entries(groupedServices).map(([key, service]) => {
      services_list.push({
        service: service[0].id,
        quantity: service.length,
      });
      total_price += service[0].price * service.length;
    });
    setServicesList(services_list);
    setTotalPrice(total_price);
  }

  const groupServicesInBasket = () => {
    const groupedServices = services.reduce((results, service) => {
      (results[service.id] = results[service.id] || []).push(service);
      return results;
    }, {});

    createServicesListAndTotalPrice(groupedServices);
    setGroupedServicesInBasket(groupedServices);
  };
  useEffect(() => {
    groupServicesInBasket();
  }, [services]);

  const sendPrestationRequest = async () => {
    try {
      const { data } = await createPrestation(
        servicesList,
        client_id,
        professional.id,
        totalPrice,
        type,
        time,
        date
      );

      navigation.navigate("Waiting", {
        prestationId: data.prestation._id,
        category: services[0].category,
        type,
      });
    } catch (error) {
      console.log(error);
      if (error.response) {
        console.log(error.response.data);
        Alert.alert("Problème interne");
      } else {
        Alert.alert("problème internet");
      }
    }
  };

  return (
    <View className=" py-4 flex-1 justify-between bg-white">
      {services.length === 0 && (
        <View className="text-txt flex-1 justify-center items-center text-xl">
          <Text>Panier Vide</Text>
        </View>
      )}
      <View>
        <Text
          style={{ fontFamily: "Montserrat-SemiBold" }}
          className="px-2 text-xl text-txt"
        >
          services
        </Text>
        <ScrollView className="mt-4 border-t border-pr">
          {Object.entries(groupedServicesInBasket).map(([key, services]) => {
            return <BasketCard services={services} key={key} id={key} />;
          })}
        </ScrollView>
      </View>

      <View>
        <Text
          style={{ fontFamily: "Montserrat-SemiBold" }}
          className="px-2 text-xl text-txt"
        >
          Professionnelle
        </Text>
        <View className="flex-row items-center mt-4 px-2">
          <Avatar image={professional.user.image} size="small" radius="full" />
          <Text
            className="flex-1 text-lg ml-4 text-txt"
            style={{ fontFamily: "Montserrat-Medium" }}
          >
            {professional.user.full_name}
          </Text>
        </View>
      </View>
      <View className="flex-row justify-between px-2 mt-4">
        <Text
          style={{ fontFamily: "Montserrat-SemiBold" }}
          className="text-xl text-txt"
        >
          Prix Total
        </Text>
        <Text
          style={{ fontFamily: "Montserrat-Medium" }}
          className="text-xl text-txt"
        >
          {totalPrice} DZD
        </Text>
      </View>

      <TouchableOpacity className=" mx-4 bg-pr py-3 rounded-md">
        <Text
          className="text-center text-xl text-white"
          style={{ fontFamily: "Montserrat-Bold" }}
          onPress={sendPrestationRequest}
        >
          Confirmer Ordre
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ConfirmScreen;
