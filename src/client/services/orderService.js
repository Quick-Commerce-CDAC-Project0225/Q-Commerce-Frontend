import axios from 'axios';
import { API_ENDPOINTS } from '../../config';

export const getMyOrders = async () => {
  try {
    const response = await axios.get(API_ENDPOINTS.ORDER_HISTORY, {
      withCredentials: true // if using HTTP-only cookies for auth
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};
