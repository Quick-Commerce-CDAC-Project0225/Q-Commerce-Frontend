// import axios from 'axios';

// const client = axios.create({
//   baseURL: 'http://localhost:8082',
// });

// client.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// export default client;

// src/api/customerApi.js
import axios from "axios";

const BASE_URL = "http://localhost:8082/api/v1/users/customers";

export const getAllCustomers = () => axios.get(BASE_URL);

export const updateCustomer = (id, customer) =>
  axios.put(`${BASE_URL}/${id}`, customer);

export const deleteCustomer = (id) => axios.delete(`${BASE_URL}/${id}`);

export const getUserById = (id) =>
  axios.get(`http://localhost:8082/api/v1/users/${id}`);


