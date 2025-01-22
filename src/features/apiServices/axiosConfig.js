import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { tokenExpired } from '../reduxServices/actions';





const baseURL =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_LOCAL_URL
    : process.env.REACT_APP_LIVE_URL;


export const axiosInstance = axios.create({
  baseURL: baseURL,  
});


axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);





 