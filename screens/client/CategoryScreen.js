import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getServicesByCategory } from "../../api/service";
import { useNavigation, useRoute } from "@react-navigation/native";
import ServiceCard from "../../components/client/ServiceCard";
import { useSelector } from "react-redux";
import { selectBasketServices } from "../../slices/basketSlice";

const CategoryScreen = () => {
  const [servicesList, setServicesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState("");
  const route = useRoute();
  const navigation = useNavigation();

  const servicesInBasket = useSelector(selectBasketServices);
  const getServices = async () => {
    const { data } = await getServicesByCategory(route.params.id);
    setCategory(data[0].category.name);
    const groupedServices = data.reduce((results, service) => {
      (results[service.sub_category] =
        results[service.sub_category] || []).push(service);
      return results;
    }, {});
    setServicesList(groupedServices);
    setIsLoading(false);
  };

  useEffect(() => {
    getServices();
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      {servicesInBasket.length != 0 && (
        <View className="absolute bottom-3 w-full z-50  px-4">
          <TouchableOpacity
            className="   bg-pr py-2 rounded-md"
            onPress={() =>
              navigation.navigate("Appointement", {
                category,
              })
            }
          >
            <Text
              className="text-center text-white text-lg"
              style={{ fontFamily: "Montserrat-SemiBold" }}
            >
              Selectionner Profesionelle
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView className="px-4  flex-1 ">
        {Object.entries(servicesList).map(([key, services]) => {
          return (
            <View key={key} className="pb-4">
              <Text
                className="text-2xl  text-txt mb-4"
                style={{ fontFamily: "Montserrat-SemiBold" }}
              >
                {key}
              </Text>

              {services.map((service) => {
                return (
                  <ServiceCard
                    category={service.category.name}
                    key={service._id}
                    name={service.name}
                    price={service.price}
                    durationMax={service.duration[1]}
                    durationMin={service.duration[0]}
                    image={service.image}
                    id={service._id}
                  />
                );
              })}
            </View>
          );
        })}
      </ScrollView>
    </>
  );
};

export default CategoryScreen;
