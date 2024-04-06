import { View, Text, FlatList, Animated, TouchableOpacity } from "react-native";
import React, { useState, useRef } from "react";
import slideItems from "../../assets/SlideItems";
import SlideItem from "./SlideItem";
import Pagination from "./Pagination";
const OnBoarding = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const slidesRef = useRef(null);
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  const scrollX = useRef(new Animated.Value(0)).current;

  const scrollTo = () => {
    if (currentIndex < slideItems.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    }
  };
  const skip = () => {
    if (currentIndex < slideItems.length - 1) {
      slidesRef.current.scrollToIndex({ index: slideItems.length - 1 });
    }
  };

  return (
    <View className="flex-1 justify-center items-center ">
      <View style={{ flex: 4 }}>
        <FlatList
          data={slideItems}
          renderItem={({ item }) => <SlideItem item={item} />}
          horizontal
          pagingEnabled
          // snapToAlignment="center"
          showsHorizontalScrollIndicator={false}
          viewabilityConfig={viewConfig}
          onViewableItemsChanged={viewableItemsChanged}
          scrollEventThrottle={50}
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          ref={slidesRef}
        />
      </View>
      {currentIndex < slideItems.length - 1 && currentIndex > 0 && (
        <View className="absolute bottom-20 w-full ">
          <Pagination data={slideItems} scrollX={scrollX} />
          <View className=" flex-row justify-between items-center px-5 mt-12">
            <TouchableOpacity onPress={skip} className="">
              <Text
                style={{ fontFamily: "Montserrat-SemiBold" }}
                className=" text-white text-lg"
              >
                Skip
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={scrollTo}
              className="bg-pr rounded-md px-4 py-2"
            >
              <Text
                style={{ fontFamily: "Montserrat-SemiBold" }}
                className=" text-white text-lg"
              >
                Suivant
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {currentIndex === slideItems.length - 1 && (
        <View className="absolute bottom-20 w-full">
          <Pagination data={slideItems} scrollX={scrollX} />
          <View className="  flex-row items-center justify-between px-5 mt-12">
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              className=""
            >
              <Text
                style={{ fontFamily: "Montserrat-SemiBold" }}
                className=" text-white text-lg"
              >
                S'inscrire
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              className="bg-pr rounded-md px-4 py-2"
            >
              <Text
                style={{ fontFamily: "Montserrat-SemiBold" }}
                className=" text-white text-lg"
              >
                Se connecter
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {currentIndex === 0 && (
        <View className="absolute bottom-20 w-full">
          <Pagination data={slideItems} scrollX={scrollX} />
          <View className="  flex-row items-center justify-between px-5 mt-12">
            <TouchableOpacity onPress={skip} className="">
              <Text
                style={{ fontFamily: "Montserrat-SemiBold" }}
                className=" text-white text-lg"
              >
                Skip
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={scrollTo}
              className="bg-pr rounded-md px-4 py-2"
            >
              <Text
                style={{ fontFamily: "Montserrat-SemiBold" }}
                className=" text-white text-lg"
              >
                Commencer
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default OnBoarding;
