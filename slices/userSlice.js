import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
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
        user: action.payload.user,
        data: action.payload.data,
        token: action.payload.token,
      };
    },
    setUser: (state, action) => {
      return {
        ...state,
        user: action.payload,
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
      state.user = {};
      state.data = {};
      state.token = null;
    },

    clearUser: (state) => {
      state.user = {};
    },
  },
});

export const {
  setToken,
  setData,
  setUserDataToken,
  clearUserDataToken,
  setUser,
  clearUser,
  setAvailability,
} = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectToken = (state) => state.user.token;
export const selectData = (state) => state.user.data;

export default userSlice.reducer;
