// src/services/authService.js

import axios from "axios";
import { API_ENDPOINTS } from "../../config";

axios.defaults.withCredentials = true; // Always send cookies

export const login = async (email, password) => {
  const response = await axios.post(
    API_ENDPOINTS.LOGIN,
    { email, password },
    { withCredentials: true } // include cookies in the response
  );

  const role = response.data.data.role;
  return { role };
};