import axios from "axios";

import { BASE_URL } from "../assets/constants";

export const getServicesByCategory = async (category_id) =>
  axios.get(`${BASE_URL}/services/${category_id}`, {
    timeout: 10000,
  });
