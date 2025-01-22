import React,{useEffect} from "react"
import { useNavigate } from "react-router-dom";
 import { jwtDecode } from 'jwt-decode';




  
  export const tokenExpirationMiddleware = () => {
    const token = localStorage.getItem('token');
  
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
  
      if (decodedToken.exp < currentTime) {
        localStorage.removeItem('token');
        return false;
      }
      return true;
    }
  
    return true;
  };