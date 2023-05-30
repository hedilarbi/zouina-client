import axios from "axios";
import { BASE_URL } from "../assets/constants";

export const getProfessionals = (speciality, location, date, time) =>
  axios.get(
    `${BASE_URL}/professionals/available`,

    {
      params: {
        date,
        time,
        speciality,
        latitude: location.latitude,
        longitude: location.longitude,
      },
      timeout: 10000,
    }
  );

export const getProfessionalByID = (id) =>
  axios.get(`${BASE_URL}/professionals/${id}`, {
    timeout: 10000,
  });

export const updateSchedual = (id, schedual) =>
  axios.put(`${BASE_URL}/professionals/update/schedual/${id}`, schedual, {
    timeout: 10000,
  });

export const updateAvailability = (id, availability) =>
  axios.put(
    `${BASE_URL}/professionals/update/availability/${id}`,

    {
      availability,
    },
    {
      timeout: 10000,
    }
  );
