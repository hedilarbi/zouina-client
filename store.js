import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import basketReducer from "./slices/basketSlice";

import professionalReducer from "./slices/professionalSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    basket: basketReducer,

    professional: professionalReducer,
  },
});
