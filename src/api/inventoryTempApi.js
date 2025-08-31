import axios from "axios";

const BASE_URL = "http://65.1.207.157:8080/api/v1/inventory";

export const getAllInventories = (page = 0, size = 100, sort = "updatedAt,desc") =>
  axios.get(`${BASE_URL}?page=${page}&size=${size}&sort=${encodeURIComponent(sort)}`);

export const addInventory = (inventory) =>
  axios.post(BASE_URL, inventory); // { sku, productId, warehouseId }

export const updateInventory = (id, inventory) =>
  axios.put(`${BASE_URL}/${id}`, inventory);

export const deleteInventory = (id) =>
  axios.delete(`${BASE_URL}/${id}`);


