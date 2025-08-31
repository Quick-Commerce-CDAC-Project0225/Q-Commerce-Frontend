import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://65.1.207.157:8080/api/v1',
  withCredentials: true, 
});

export default axiosInstance;
