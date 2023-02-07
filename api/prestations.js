import axios from "axios";
import { Alert } from "react-native";
import { BASE_URL } from "../assets/constants";

export const createPrestation = (
  services,
  client_id,
  professional_id,
  total_price,
  type,
  time,
  date
) =>
  axios.post(`${BASE_URL}/prestations/create`, {
    services,
    client_id,
    professional_id,
    total_price,
    type,
    time,
    date,
  });

export const getImmediateClientPrestations = (id) =>
  axios.get(`${BASE_URL}/prestations/client/immediately/${id}`);

export const getSchedualClientPrestations = (id) =>
  axios.get(`${BASE_URL}/prestations/client/Schedual/${id}`);

export const getPrestation = (id) =>
  axios.get(`${BASE_URL}/prestations/prestation/client/${id}`);

export const getImmediateProfessionalPrestations = (id) =>
  axios.get(`${BASE_URL}/prestations/professional/immediately/${id}`);

export const getSchedualProfessionalPrestations = (id) =>
  axios.get(`${BASE_URL}/prestations/professional/Schedual/${id}`);

export const getProfessionalPrestation = (id) =>
  axios.get(`${BASE_URL}/prestations/prestation/professional/${id}`);

export const getAcceptedSchedualPrestation = (id) =>
  axios.get(`${BASE_URL}/prestations/professional/schedual/accepted/${id}`);

export const refusePrestation = async (id) => {
  try {
    await axios.put(`${BASE_URL}/prestations/prestation/refuse/${id}`);
  } catch (error) {
    Alert.alert(error.message);
  }
};
export const acceptPrestation = async (id) => {
  try {
    await axios.put(`${BASE_URL}/prestations/prestation/accept/${id}`);
  } catch (error) {
    Alert.alert(error.message);
  }
};
export const finishPrestation = async (id) => {
  try {
    await axios.put(`${BASE_URL}/prestations/prestation/finish/${id}`);
  } catch (error) {
    Alert.alert(error.message);
  }
};

export const cancelPrestation = async (id) =>
  axios.put(`${BASE_URL}/prestations/prestation/cancel/${id}`);

export const reviewPrestation = async (id, rate, comment) =>
  axios.put(`${BASE_URL}/prestations/prestation/review/${id}`, {
    comment,
    rate,
  });

export const getPrestationByID = async (id) =>
  axios.get(`${BASE_URL}/prestations/prestation/${id}`);
