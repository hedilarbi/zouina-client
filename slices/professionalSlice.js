import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  professional: {
    user: {},
    id: "",
  },
};

export const professionalSlice = createSlice({
  name: "professional",
  initialState,
  reducers: {
    setProfessional: (state, action) => {
      state.professional.user = action.payload.user;
      state.professional.id = action.payload.id;
    },
    clearProfessional: (state, action) => {
      state.professional = {};
    },
  },
});

export const { setProfessional, clearProfessional } = professionalSlice.actions;

export const selectProfessional = (state) => state.professional.professional;

export default professionalSlice.reducer;
