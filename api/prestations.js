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
  axios.get(`${BASE_URL}/prestations/client/immediately/${id}`, {
    timeout: 10000,
  });

export const getSchedualClientPrestations = (id) =>
  axios.get(`${BASE_URL}/prestations/client/Schedual/${id}`, {
    timeout: 10000,
  });

export const getPrestation = (id) =>
  axios.get(`${BASE_URL}/prestations/prestation/client/${id}`, {
    timeout: 10000,
  });

export const getImmediateProfessionalPrestations = (id) =>
  axios.get(`${BASE_URL}/prestations/professional/immediately/${id}`, {
    timeout: 10000,
  });

export const getSchedualProfessionalPrestations = (id) =>
  axios.get(`${BASE_URL}/prestations/professional/Schedual/${id}`, {
    timeout: 10000,
  });

export const getProfessionalPrestation = (id) =>
  axios.get(`${BASE_URL}/prestations/prestation/professional/${id}`, {
    timeout: 10000,
  });

export const getAcceptedSchedualPrestation = (id) =>
  axios.get(`${BASE_URL}/prestations/professional/schedual/accepted/${id}`, {
    timeout: 10000,
  });

export const refusePrestation = async (id) => {
  try {
    await axios.put(`${BASE_URL}/prestations/prestation/refuse/${id}`, {
      timeout: 10000,
    });
  } catch (error) {
    if (error.response) {
      Alert.alert("Problème interne");
    } else {
      Alert.alert("problème internet");
    }
  }
};
export const acceptPrestation = async (id) => {
  try {
    await axios.put(`${BASE_URL}/prestations/prestation/accept/${id}`, {
      timeout: 10000,
    });
  } catch (error) {
    if (error.response) {
      Alert.alert("Problème interne");
    } else {
      Alert.alert("problème internet");
    }
  }
};
export const finishPrestation = async (id) => {
  try {
    await axios.put(`${BASE_URL}/prestations/prestation/finish/${id}`, {
      timeout: 10000,
    });
  } catch (error) {
    if (error.response) {
      Alert.alert("Problème interne");
    } else {
      Alert.alert("problème internet");
    }
  }
};
export const professionalAtDestination = async (id) => {
  try {
    await axios.put(`${BASE_URL}/prestations/prestation/destination/${id}`, {
      timeout: 10000,
    });
  } catch (error) {
    if (error.response) {
      Alert.alert("Problème interne");
    } else {
      Alert.alert("problème internet");
    }
  }
};

export const cancelPrestation = async (id) =>
  axios.put(`${BASE_URL}/prestations/prestation/cancel/${id}`, {
    timeout: 10000,
  });

export const reviewPrestation = async (id, rate, comment) =>
  axios.put(
    `${BASE_URL}/prestations/prestation/review/${id}`,
    {
      comment,
      rate,
    },
    {
      timeout: 10000,
    }
  );

export const getPrestationByID = async (id) =>
  axios.get(`${BASE_URL}/prestations/prestation/${id}`, {
    timeout: 10000,
  });
