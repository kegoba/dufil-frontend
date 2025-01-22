
import React, { useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { useDispatch } from 'react-redux';
import { login } from '../reduxServices/actions'
import { useNavigate, Link} from 'react-router-dom';
import {loginUser} from "../apiServices/userServices"
import {passwordValidation, 
        emailValidation,
      } from "../apiServices/validationService"

import SpinningButton from "../utilities/spinnerButton"

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  
 

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!passwordValidation(password)) {
      NotificationManager.error("Password Must Be More Than Four Digits", "Invalid Password");
      return;
    }
    if (!emailValidation(email)) {
      NotificationManager.error("Please Enter Valid Email", "Invalid email");
      return;
    }

    const data = { email, password };
    setIsLoading(true);
    try {
      const user = await loginUser(data);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      if (user) {
        dispatch(login(user));
        navigate("/");
      } else {
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      setEmail("");
      setPassword("");
      NotificationManager.error( error.response.data.message);
      setIsLoading(false);
    }
    setIsLoading(false);
  };


  
  const handleEmail = (e)=>{
    const emailValue = e.target.value
    setEmail(emailValue.toLowerCase())

    
  }
  const handlePassword = (e)=>{
    setPassword(e.target.value)
    
  }
  
  return (
  <>
    <div className="w-full max-w-sm md:mx-[450px] mt-20 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
    <div className="space-y-6">
        <h5 className="text-xl font-medium text-gray-900 dark:text-white"> Login</h5>
        <div>
            <input placeholder="Email"  value={email} onChange={handleEmail}  type="email"className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
        </div>
        <div>
            <input type="password" value={password} placeholder="Password" onChange={handlePassword}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
        </div>
        
        <SpinningButton   isLoading={isLoading} onClick={handleSubmit} buttonName={"Login"}  classNames="w-full  inset-0 flex items-center justify-center text-white bg-[#092256]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"/> 
        
        Not Registered? <Link to={"/register"} className="text-bg-[#2DC0AC] hover:underline dark:text-bg-[#2DC0AC]">Register</Link>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300"> </div>
        Forgoten Password? <Link to={"/forgot-password"} className="text-bg-[#2DC0AC] hover:underline dark:text-bg-[#2DC0AC]">Reset</Link>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
          
        </div>
    </div>
    <NotificationContainer />
</div>
    </>
  );
};

export default Login;

