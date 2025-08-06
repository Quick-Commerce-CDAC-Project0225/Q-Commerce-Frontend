// src/config.js

export const BASE_URL = "http://localhost:8080/api/v1"; // Adjust this as per your backend

export const API_ENDPOINTS = {
  LOGIN: `${BASE_URL}/auth/login`,
  REGISTER: `${BASE_URL}/auth/register`,
  LOGOUT: `${BASE_URL}/auth/logout`,
  USER_PROFILE: `${BASE_URL}/user/profile`,
  ADMIN_DASHBOARD: `${BASE_URL}/admin/dashboard`,
};
