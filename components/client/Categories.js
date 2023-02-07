import { View, Text, ScrollView } from "react-native";
import React from "react";
import CategoryCard from "./CategoryCard";

const Categories = ({ categories }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingTop: 12,
      }}
    >
      {categories.map((category) => {
        return (
          <CategoryCard
            key={category._id}
            name={category.name}
            image={category.image}
            id={category._id}
          />
        );
      })}
    </ScrollView>
  );
};

export default Categories;
