// src/routes/PageRouter.js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from '../pages/login';
import Register from '../pages/register';
import Home from '../pages/home';

import TransactionHistory from '../pages/itemTable';


import Dashboard from '../pages/dashboard';
import Navbar from '../pages/navbar';
import Footer from '../pages/footer';
import ResetPassword from '../pages/reSetPassword';
import ForgotPassword from '../pages/forgotPassword';
import Sidebar from '../pages/sidebar';
import ChangePassword from '../pages/changePassword';
import PreviateRoute from "./previateRoute"
import AddItem from "../pages/addItem"


const PageRouter = () => {
  return (

    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        
        <div className="flex flex-grow overflow-hidden">
          <Sidebar />
          <div className="flex-grow p-4 overflow-x-auto lg:ml-30">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              <Route element={<PreviateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              </Route>
             
             
              <Route element={<PreviateRoute />}>
              <Route path="/transactionhistory" element={<TransactionHistory />} />
              </Route>
              
              <Route element={<PreviateRoute />}>
              <Route path="/changepassword" element={<ChangePassword />} />
              </Route>
              <Route element={<PreviateRoute />}>
              <Route path="/add-item" element={<AddItem />} /> 
              </Route>
             
              
            </Routes>
          </div>
        </div>
       
      </div>
    </BrowserRouter>

  );
};

export default PageRouter;
