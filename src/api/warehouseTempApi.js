// src/api/warehouseApi.js
import axios from "axios";

const BASE_URL = "http://localhost:8082/api/v1/warehouses";

export const getAllWarehouses = () => axios.get(BASE_URL);
