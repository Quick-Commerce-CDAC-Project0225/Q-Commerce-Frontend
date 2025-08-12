import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://52.66.243.195:8080/api/v1',
  withCredentials: true, 
});

export default axiosInstance;
