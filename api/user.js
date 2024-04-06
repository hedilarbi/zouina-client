import axios from "axios";
import { BASE_URL } from "../assets/constants";

export const createUser = (user) =>
  axios.post(`${BASE_URL}/users/create`, {
    phone_number: user.phone_number,

    expo_token: user.expo_token,
  });

export const loginUser = (user) =>
  axios.post(
    `${BASE_URL}/users/login`,
    {
      phone_number: user.phone_number,

      expo_token: user.expo_token,
    },
    {
      timeout: 10000,
    }
  );

export const logoutUser = (id) => axios.put(`${BASE_URL}/users/logout/${id}`);

export const getUserByToken = (token) =>
  axios.get(`${BASE_URL}/users/`, {
    timeout: 5000,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const updatePassword = (id, old_password, new_password) =>
  axios.put(
    `${BASE_URL}/users/update/password/${id}`,
    {
      old_password,
      new_password,
    },
    {
      timeout: 10000,
    }
  );

export const updateUser = (id, full_name, email, birthday) =>
  axios.put(
    `${BASE_URL}/users/update/user/${id}`,

    {
      full_name,
      email,
      birthday,
    },
    {
      timeout: 10000,
    }
  );

export const updateAddress = (id, address, location) =>
  axios.put(
    `${BASE_URL}/users/update/address/${id}`,
    { address, location },
    {
      timeout: 10000,
    }
  );
