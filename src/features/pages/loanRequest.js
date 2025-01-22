import React, { useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import { useNavigate } from 'react-router-dom';
import {loanRequestService} from "../apiServices/userServices"
import {amountValidation, 
        durationValidation,
      } from "../apiServices/validationService"

import SpinningButton from "../utilities/spinnerButton"

import {Card, calculate, WalletIcon,InterestIcon} from "../utilities/reuseAbles"
    



const LoanRequest = () => {
  const navigate = useNavigate()
  const [duration, setDuration] = useState('');
  const [amountBorrowed, setAmountBorrowed] = useState('');
  const [result, setResult] = useState()
  const [isLoading, setIsLoading] = useState(false)
  React.useEffect(() => {
    const checkUserLogin = localStorage.getItem("user")
    const user = JSON.parse(checkUserLogin)
    if (!user){
      navigate("/login")
    }

  },[navigate]);



  
  const handleAmount = (e)=>{
    setAmountBorrowed(parseInt(e.target.value))

    
  }
  const handleDuration = (e)=>{
    const selectedValue = e.target.value;
   if (selectedValue==="YEARLY"){
    setDuration(parseInt(12))

   }else{
        setDuration(parseInt(6))

   } 

  }


  const handleCaculate = async (event) => {
    if (!amountValidation(amountBorrowed)){
      NotificationManager.error("Invalid Amount" );
      return
    }
      if (!durationValidation(duration)){
        NotificationManager.error("Select Duration" );
        return
      }
    const response = calculate(amountBorrowed, duration)
    setResult(response)
  };

 
  const handLoanRequest = async ()=>{
    //const loanReference = String(Math.random() * (10 - 9) + "az");
    
    const data ={ amountBorrowed,duration , ...result}
    console.log(data)
    try{
      setIsLoading(true)
      const response = await loanRequestService(data)
      console.log(response.status)
      if (response.status===200){
        setIsLoading(false)
      navigate("/")
    }else{

      setDuration("")
      setAmountBorrowed("")
    }
    
    }catch(error){
      setAmountBorrowed("")
      setDuration("")
      
      NotificationManager.error( error.response.data.message);

    }
  
    
    

  }
    
  return (
  < div className='container'>  
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:ml-40">
        <Card className="w-1"
            title="Monthly Payable:" 
            value={result?.monthlyReturn.toLocaleString()} 
            icon={<WalletIcon />} 
        />
        <Card 
            title="Monthly Interest" 
            value={result?.totalInterest.toLocaleString()}
            icon={<InterestIcon />} 
        />
         <Card 
            title="Total Payable" 
            value={result?.totalAmountToBePaid.toLocaleString()}
            icon={<InterestIcon />} 
        />
    </div>
    
    <h5 className=" font-medium text-gray-900 dark:text-white text-center text-sm mt-10"> Please Fill Below details</h5>
    <div className="  md:mx-[400px] mt-5 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
    
    <div className="space-y-6 mt-10">
        <div>
            <input placeholder="Amount"   onChange={handleAmount}  type="amount"className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
        </div>
        <div>
            <select type="duration" placeholder="Select Duration"  onChange={handleDuration}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required >
            <option  > Select Duration </option>
            <option value={"YEARLY"} > One Year</option>
            <option value={"QUARTERLY"} > Six Month</option>

            </select>
        </div>
        
        <button onClick={handleCaculate}  className="w-full text-white bg-[#092256] hover:bg-[#092256] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Caculate</button>
       
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
        <SpinningButton   isLoading={isLoading} onClick={handLoanRequest} buttonName={"Request"}  classNames="w-full  inset-0 flex items-center justify-center text-white bg-[#092256]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"/> 
     
        </div>
    </div>
    <NotificationContainer />
</div>
    </div>
  );
};

export default LoanRequest;

