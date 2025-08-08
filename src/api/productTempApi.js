// // src/api/productApi.js
// import axios from "axios";

// const BASE_URL = "http://localhost:8082/api/v1/products";

// // Use the simple list endpoint to avoid Page parsing headaches
// export const getAllProducts = () => axios.get(`${BASE_URL}/all`);

// export const addProduct = (product) => axios.post(BASE_URL, product);
// export const updateProduct = (id, product) => axios.put(`${BASE_URL}/${id}`, product);
// export const deleteProduct = (id) => axios.delete(`${BASE_URL}/${id}`);


import axios from "axios";

const BASE_URL = "http://localhost:8082/api/v1/products";

export const getAllProducts = () => axios.get(`${BASE_URL}/all`);

export const addProduct = (product) => axios.post(BASE_URL, product);

export const updateProduct = (id, product) =>
  axios.put(`${BASE_URL}/${id}`, product);

export const deleteProduct = (id) => axios.delete(`${BASE_URL}/${id}`);
