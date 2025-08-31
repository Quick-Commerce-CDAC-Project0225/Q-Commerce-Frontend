// src/api/warehouseApi.js
import axios from "axios";

const BASE_URL = "http://65.1.207.157:8080/api/v1/warehouses";

export const getAllWarehouses = () => axios.get(BASE_URL);
