// import axios from 'axios';

// const client = axios.create({
//   baseURL: 'http://65.1.207.157:8080',
// });

// client.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// export default client;

// src/api/customerApi.js
import axios from "axios";

const BASE_URL = "http://65.1.207.157:8080/api/v1/users/customers";

export const getAllCustomers = () => axios.get(BASE_URL);

export const updateCustomer = (id, customer) =>
  axios.put(`${BASE_URL}/${id}`, customer);

export const deleteCustomer = (id) => axios.delete(`${BASE_URL}/${id}`);

export const getUserById = (id) =>
  axios.get(`http://65.1.207.157:8080/api/v1/users/${id}`);


