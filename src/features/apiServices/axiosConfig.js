import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { tokenExpired } from '../reduxServices/actions';




// Create an Axios instance
export const axiosInstance = axios.create({
 //baseURL: "http://localhost:8000/api/v1",
baseURL:"https://coperative.onrender.com/api/v1"
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  config => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');

    // If the token exists, add it to the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Return the modified config
    return config;
  },
  error => {
    // Handle request error here
    return Promise.reject(error);
  }
);





 