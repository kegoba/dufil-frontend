
import React, { useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import { useNavigate, useParams} from 'react-router-dom';
import {changePasswordServices} from "../apiServices/authServices"
import {passwordValidation, 
      } from "../apiServices/validationService"

import SpinningButton from "../utilities/spinnerButton"
      
       

const ChangePassword = () => {
  const navigate = useNavigate()
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [confirmNewPassword , setConfirmNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false)
 

  const handleSubmit = async (event) => {
   
    event.preventDefault();
    if (!passwordValidation(oldPassword)) {
      NotificationManager.error("Your Old Password Is Not Valid");
      return;
    }
    if (!passwordValidation(confirmNewPassword)) {
        NotificationManager.error(" Your New Password Is Not Valid ");
        return;
      }

    if (newPassword !== confirmNewPassword) {
        NotificationManager.error( "Password Mismatch");
        return;
      }

    const data = { newPassword ,oldPassword};
  

    try {
        setIsLoading(true)
      const user = await changePasswordServices(data);
      if (user) {
        console.log("Login successful:", user);
        navigate("/dashboard");
        setIsLoading(false)
      } else {
        setConfirmNewPassword("");
        setNewPassword("");
      }
    } catch (error) {
        setConfirmNewPassword("");
        setNewPassword("");
        setIsLoading(false)
      NotificationManager.error("Wrong password or email", "Login failed", 1000);
    }
  };


  
  const handleConfirmNewPassword = (e)=>{
      
    setConfirmNewPassword(e.target.value)

    
  }
  const handleNewPassword = (e)=>{
  
    setNewPassword(e.target.value)
    
  }
  const handleOldPassword = (e)=>{
  
    setOldPassword(e.target.value)
    
  }
  
  return (
  <>
    <div className="w-full max-w-sm md:mx-[450px] mt-20 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
    <div className="space-y-6">
        <h5 className="text-xl font-medium text-gray-900 dark:text-white"> Change Your Password</h5>
        <div>
            <input type="password"  placeholder="Old password"   onChange={handleOldPassword}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
        </div>
        <div>
            <input type="password"  placeholder="New password"   onChange={handleNewPassword}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
        </div>
        <div>
            <input type="password"  placeholder="Confirm New Password" onChange={handleConfirmNewPassword}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
        </div>
        
        <SpinningButton   isLoading={isLoading} onClick={handleSubmit} buttonName={"Change Password"}  classNames="w-full  inset-0 flex items-center justify-center text-white bg-[#092256]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"/> 
        
       
    </div>
    <NotificationContainer />
</div>
    </>
  );
};

export default ChangePassword;

