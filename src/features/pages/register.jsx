
import React, { useState } from 'react';
import {Link} from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import {registerUser} from '../apiServices/authServices';
import SpinningButton from "../utilities/spinnerButton"

import {passwordValidation, 
    emailValidation,
   inputValidation ,
   phoneValidation,
} from "../utilities/validationService"



const Register = () => {

  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  
 

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!passwordValidation(password)){
      NotificationManager.error("Password Must Be More Than 4 Digits","Invalid Password" );
      return
    }
    if(!emailValidation(email)){
      NotificationManager.error("Please Enter Valid Email", "Invalid email");
      return
    }
    if(!inputValidation(lastName)){
      NotificationManager.error("Last Name Must Be More Than 4 Letters", "Invalid lastName");
      return
    }
    if(!inputValidation(firstName)){
      NotificationManager.error("Phone Number Must Be Must be 4 laters", "Invalid firstName ");
      return
    }
    const data ={
      email:email, 
      password:password, 
      last_name:lastName, 
      first_name : firstName
    }
    
    
   try{
    setIsLoading(true)
    const resp = await registerUser(data)
    await new Promise((resolve) => setTimeout(resolve, 2000));

      if (resp.responseCode=== 201){
        navigate("/login")
      
      }else{
        setEmail("")
        setFirstName("")
        setLastName("")
        setPassword("")

      }
      setIsLoading(false);
   }catch(error){
    console.log(error.response.data)
    NotificationManager.error( error.response.data.message);
    setIsLoading(false);
   }
    
  };

  const handleFirstName = (e)=>{
    e.preventDefault();
    setFirstName(e.target.value)

  }
  const handleEmail = (e)=>{
    e.preventDefault();
    setEmail(e.target.value)
    
  }
  const handlePassword = (e)=>{
    e.preventDefault();
    setPassword(e.target.value)
    
  }
  const handleLastName = (e)=>{
    e.preventDefault();
   
    setLastName(e.target.value)
    
  }

  return (
    
    <div className="w-full max-w-sm md:mx-[450px] mt-20 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
    <div className="space-y-6">
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Register User</h5>
        
        
        <div>
            <input type="text" placeholder="First Name" value={firstName} onChange={handleFirstName}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
        </div>
        <div>
            <input type="text" placeholder="Last Name" onChange={handleLastName} value={lastName}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
        </div>
        <div>
            <input placeholder="Email"  onChange={handleEmail} value={email}  type="email"className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
        </div>
        <div>
            <input type="password" placeholder="Password" onChange={handlePassword} value={password}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
        </div>
        
        <SpinningButton   isLoading={isLoading} onClick={handleSubmit} buttonName={"Register"}  classNames="w-full  inset-0 flex items-center justify-center text-white bg-[#092256]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"/> 
        
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Registered? <Link to={"/login"} className="text-bg-[#2DC0AC] hover:underline dark:text-bg-[#2DC0AC]">Login</Link>
        </div>
    </div>
    <NotificationContainer/>
</div>

    
  );
};

export default Register;

