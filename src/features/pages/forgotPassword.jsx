
import React, { useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import { useNavigate, Link} from 'react-router-dom';
import {forgotPasswordServices} from "../apiServices/authServices"
import { 
        emailValidation,
      } from "../utilities/validationService"


import SpinningButton from "../utilities/spinnerButton"
      
const ForgotPassword = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false)

 

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!emailValidation(email)) {
      NotificationManager.error( "Invalid Email");
      return;
    }
    
    const data = { email };
    try {
      setIsLoading(true)
      const user = await forgotPasswordServices(data);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      if (user) {
        NotificationManager.success("Reset Link Sent to Your Mail");
        setEmail('');
        
        // Adding a slight delay before navigating
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        setEmail('');
      }
    } catch (error) {
      setEmail('');
      NotificationManager.error(error.response.data.message || "An error occurred");
    }
    setIsLoading(false)
  };


  
  const handleEmail = (e)=>{
    const emailValue = e.target.value
   setEmail(emailValue.toLowerCase())

    
  }
 
  
  return (
  <>
    <div className="w-full max-w-sm md:mx-[450px] mt-20 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
    <div className="space-y-6">
        <h5 className="text-xl font-medium text-gray-900 dark:text-white"> Please Enter Your Email</h5>
        <div>
            <input type="email"  placeholder="Email"   onChange={handleEmail}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
        </div>
        <SpinningButton   isLoading={isLoading} onClick={handleSubmit} buttonName={"Confirm Email"}  classNames="w-full  inset-0 flex items-center justify-center text-white bg-[#092256]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"/> 
    </div>
    <NotificationContainer />
</div>
    </>
  );
};

export default ForgotPassword;

