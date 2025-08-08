// src/config.js

export const BASE_URL = "http://localhost:8082/api/v1"; // Adjust this as per your backend

export const API_ENDPOINTS = {
  LOGIN: `${BASE_URL}/auth/login`,
  SIGNUP: `${BASE_URL}/auth/signup`,
  LOGOUT: `${BASE_URL}/auth/logout`,
  USER_PROFILE: `${BASE_URL}/auth/refresh`,
  ADMIN_DASHBOARD: `${BASE_URL}/admin/dashboard`,
  ORDER_HISTORY: `${BASE_URL}/orders/me`,
  PRODUCTS: `${BASE_URL}/products`,
};
