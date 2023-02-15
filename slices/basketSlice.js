import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  services: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.services = [...state.services, action.payload];
    },
    removeFromBasket: (state, action) => {
      const index = state.services.findIndex(
        (service) => service.id === action.payload.id
      );
      let newBasket = [...state.services];

      newBasket = state.services.splice(index, 1);
    },
    clearBasket: (state) => {
      state.services = [];
    },
  },
});

export const { addToBasket, removeFromBasket, clearBasket } =
  basketSlice.actions;

export const selectBasketServices = (state) => state.basket.services;
export const selectBasketServicesWithID = (state, id) =>
  state.basket.services.filter((service) => service.id === id);

export const selectBasketTotal = (state) =>
  state.basket.services.reduce((total, service) => (total += service.price), 0);

export default basketSlice.reducer;
