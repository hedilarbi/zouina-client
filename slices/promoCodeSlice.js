import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  codePromo: null,
};

export const codePromoSlice = createSlice({
  name: "codePromo",
  initialState,
  reducers: {
    activateCodePromo: (state, action) => {
      state.codePromo = action.payload;
    },
    desactivatedCodePromo: (state) => {
      state.codePromo = null;
    },
  },
});

export const { activateCodePromo, desactivatedCodePromo } =
  codePromoSlice.actions;

export const selectCodePromo = (state) => state.codePromo.codePromo;

export default codePromoSlice.reducer;
