import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import basketReducer from "./slices/basketSlice";
import codePromoReducer from "./slices/promoCodeSlice";
import professionalReducer from "./slices/professionalSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    basket: basketReducer,
    promoCode: codePromoReducer,
    professional: professionalReducer,
  },
});
