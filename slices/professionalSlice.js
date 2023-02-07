import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  professional: {},
};

export const professionalSlice = createSlice({
  name: "professional",
  initialState,
  reducers: {
    setProfessional: (state, action) => {
      state.professional = action.payload;
    },
    clearProfessional: (state, action) => {
      state.professional = {};
    },
  },
});

export const { setProfessional, clearProfessional } = professionalSlice.actions;

export const selectProfessional = (state) => state.professional.professional;

export default professionalSlice.reducer;
