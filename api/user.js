import axios from "axios";
import { BASE_URL } from "../assets/constants";

export const createUser = (user) =>
  axios.post(`${BASE_URL}/users/create`, {
    full_name: user.full_name,
    phone_number: user.phone_number,
    password: user.password,
    account_type: user.account_type,
    expo_token: user.expo_token,
  });

export const loginUser = (user) =>
  axios.post(`${BASE_URL}/users/login`, {
    phone_number: user.phone_number,
    password: user.password,
    expo_token: user.expo_token,
  });

export const getUserByToken = (token) =>
  axios.get(`${BASE_URL}/users/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const updatePassword = (id, old_password, new_password) =>
  axios.put(`${BASE_URL}/users/update/password/${id}`, {
    old_password,
    new_password,
  });

export const updateUser = (id, full_name, email, birthday) =>
  axios.put(`${BASE_URL}/users/update/user/${id}`, {
    full_name,
    email,
    birthday,
  });

export const updateAddress = (id, address, location) =>
  axios.put(`${BASE_URL}/users/update/address/${id}`, { address, location });
