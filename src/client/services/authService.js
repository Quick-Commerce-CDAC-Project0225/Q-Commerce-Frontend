// src/services/authService.js

// src/services/authService.js

import axios from "axios";
import { API_ENDPOINTS } from "../../config";

// Set withCredentials globally to allow cookies (like token via Set-Cookie header)
axios.defaults.withCredentials = true;

export const login = async (email, password) => {
  try {
    const response = await axios.post(
      API_ENDPOINTS.LOGIN,
      { email, password },
      { withCredentials: true } // ensures cookie is included
    );

    const role = response.data.data.role;
    
    return { role };
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};

export const signup = async (userData) => {
  try {
    const response = await axios.post(API_ENDPOINTS.SIGNUP, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Signup failed" };
  }
};
