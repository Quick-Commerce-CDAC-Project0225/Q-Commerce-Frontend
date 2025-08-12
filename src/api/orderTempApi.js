// // src/api/orderApi.js
// import axios from "axios";

// // Replace with your backend base URL
// const BASE_API = "http://52.66.243.195:8080/api/v1";

// // Get all orders (Admin only)
// export async function fetchAllOrders() {
//   // const token = localStorage.getItem("token"); // get token from localStorage
//   const response = await axios.get(`${BASE_API}/orders`, {
//     withCredentials: true
//   });
//   console.log("Fetched all orders:", response.data, response);
//   return response.data.data; // return only the 'data' part
// }


import axios from "axios";

// Replace with your backend base URL
const BASE_API = "http://52.66.243.195:8080/api/v1";

// ✅ Get all orders (Admin only)
export async function fetchAllOrders() {
  const response = await axios.get(`${BASE_API}/orders`, {
    withCredentials: true
  });
  console.log("Fetched all orders:", response.data, response);
  return response.data.data; // return only the 'data' part
}

// ✅ Update order status (PATCH)
export async function updateOrderStatus(orderId, newStatus) {
  const response = await axios.patch(
    `${BASE_API}/orders/${orderId}/status`,
    { status: newStatus },
    {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    }
  );
  console.log(`Status updated for order ${orderId} to ${newStatus}`, response.data);
  return response.data;
}
