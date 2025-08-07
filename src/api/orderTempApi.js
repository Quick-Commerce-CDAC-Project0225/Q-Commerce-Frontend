// src/api/orderApi.js
import axios from "axios";

// Replace with your backend base URL
const BASE_API = "http://localhost:8082/api/v1";

// Get all orders (Admin only)
export async function fetchAllOrders() {
  const token = localStorage.getItem("token"); // get token from localStorage
  const response = await axios.get(`${BASE_API}/orders`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data.data; // return only the 'data' part
}
