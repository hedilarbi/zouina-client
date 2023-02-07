import axios from "axios";
import { BASE_URL } from "../assets/constants";

export const getProfessionals = (speciality, date, time) =>
  axios.get(`${BASE_URL}/professionals/available`, {
    params: { date, time, speciality },
  });

export const getProfessionalByID = (id) =>
  axios.get(`${BASE_URL}/professionals/${id}`);

export const updateSchedual = (id, schedual) =>
  axios.put(`${BASE_URL}/professionals/update/schedual/${id}`, schedual);

export const updateAvailability = (id, availability) =>
  axios.put(`${BASE_URL}/professionals/update/availability/${id}`, {
    availability,
  });
