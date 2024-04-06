import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDataToken: (state, action) => {
      return {
        ...state,

        data: action.payload.data,
        token: action.payload.token,
      };
    },

    setToken: (state, action) => {
      return {
        ...state,
        token: action.payload,
      };
    },
    setData: (state, action) => {
      return {
        ...state,
        data: action.payload,
      };
    },
    setAvailability: (state, action) => {
      state.data.availability = action.payload;
    },

    clearUserDataToken: (state) => {
      state.data = {};
      state.token = null;
    },

    clearData: (state) => {
      state.data = {};
    },
  },
});

export const {
  setToken,
  setData,
  setUserDataToken,
  clearUserDataToken,

  clearData,
  setAvailability,
} = userSlice.actions;

export const selectToken = (state) => state.user.token;
export const selectData = (state) => state.user.data;

export default userSlice.reducer;
