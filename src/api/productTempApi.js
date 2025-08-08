// src/api/productApi.js
import axios from "axios";

const BASE_URL = "http://localhost:8082/api/v1/products"; // Change port if different

export const getAllProducts = (page = 1, size = 100) =>
  axios.get(`${BASE_URL}?page=${page}&size=${size}&orderBy=updatedAt-desc`);

export const addProduct = (product) => axios.post(BASE_URL, product);

export const updateProduct = (id, product) =>
  axios.put(`${BASE_URL}/${id}`, product);

export const deleteProduct = (id) => axios.delete(`${BASE_URL}/${id}`);

