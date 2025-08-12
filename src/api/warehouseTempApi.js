// src/api/warehouseApi.js
import axios from "axios";

const BASE_URL = "http://52.66.243.195:8080/api/v1/warehouses";

export const getAllWarehouses = () => axios.get(BASE_URL);
