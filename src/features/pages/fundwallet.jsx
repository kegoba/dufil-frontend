import React, { useState } from 'react';

import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import { useNavigate } from 'react-router-dom';
import {FundWalletservices} from "../apiServices/userServices"
import {
    amountValidation,
      } from "../apiServices/validationService"

const FundWallet = () => {
  const navigate = useNavigate()
  const [amount, setAmount] = useState('');
 
  
  React.useEffect(() => {
    const checkUserLogin = localStorage.getItem("user")
    const user = JSON.parse(checkUserLogin)
    if (!user){
      navigate("/login")
    }

  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!amountValidation(amount)){
      NotificationManager.error("Invalid Amount" );
      return
    }

    const data ={
       amount : parseInt(amount)
    }
    try{
      const response  =   await FundWalletservices(data)
      const { message: { status, data: { authorization_url } } } = response
      console.log( status,"status")
      console.log(authorization_url, "url")
      if (status===true){
    window.location.href = authorization_url
    }else{

      setAmount("")
      
    }
    
    }catch(error){
        setAmount("")
      console.log(error)
      NotificationManager.error("Could Not Get Payment Url");

    }
  };

  
  const handleAmount = (e)=>{
    const amount = e.target.value
    setAmount(amount)

    
  }
  
  return (
  <>
    <div className="w-full max-w-sm md:mx-[450px] mt-20 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
    <div className="space-y-6">
        <h5 className="text-xl font-medium text-gray-900 dark:text-white"> Wallet Funding</h5>
        <div>
            <input placeholder="Enter Amount"   onChange={handleAmount}  type="amount"className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
        </div>
       
        
        <button onClick={handleSubmit}  className="w-full text-white bg-[#092256] hover:bg-[#092256] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Proceed</button>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
        </div>
    </div>
    <NotificationContainer />
</div>
    </>
  );
};

export default FundWallet;

