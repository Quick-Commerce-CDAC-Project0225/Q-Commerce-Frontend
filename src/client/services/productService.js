// src/services/productService.js
import axios from 'axios';
import { API_ENDPOINTS } from '../../config';
// import axiosInstance from '../../utils/axiosInstance';
// import axios from '../utils/axiosInstance';

export const getAllProducts = async () => {
  const res = await axios.get(API_ENDPOINTS.PRODUCTS, {
      withCredentials: true // if using HTTP-only cookies for auth
    });
  return res.data.data; // returns the array of product objects
};
