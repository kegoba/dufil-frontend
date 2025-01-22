// routes/PreviateRoute.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { tokenExpirationMiddleware } from '../apiServices/tokenServices';



const PreviateRoute = () => {
  const isAuthenticated = useSelector((state) => state?.auth?.isAuthenticated);
  const hasTokenExpired = tokenExpirationMiddleware()
console.log(isAuthenticated, hasTokenExpired)
  return isAuthenticated && hasTokenExpired ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PreviateRoute;
