import axios from 'axios';
import CONFIG from '../config';

const API = axios.create({
    baseURL: CONFIG.API_BASE_URL,
    withCredentials: true, // Important if you're using HttpOnly cookies
});

// Login
export const login = async (credentials) => {
    const response = await API.post(CONFIG.AUTH.LOGIN, credentials);
    return response.data;
};

// Signup
export const signup = async (userData) => {
    const response = await API.post(CONFIG.AUTH.SIGNUP, userData);
    return response.data;
};

// Logout
export const logout = async () => {
    const response = await API.post(CONFIG.AUTH.LOGOUT);
    return response.data;
};

// Refresh Token
export const refreshToken = async () => {
    const response = await API.post(CONFIG.AUTH.REFRESH);
    return response.data;
};

export default {
    login,
    signup,
    logout,
    refreshToken,
};

import axiosInstance from "../services/service";

export const loginUser = async (credentials) => {
  try {
    const response = await axiosInstance.post("/api/auth/login", credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};
