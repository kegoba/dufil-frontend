
import React, { useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fixedSaving} from "../apiServices/userServices"
import {amountValidation, 
        durationValidation,
      } from "../apiServices/validationService"

import SpinningButton from "../utilities/spinnerButton"
import {Card,InterestIcon,calculate} from "../utilities/reuseAbles"



const FixedSaving = () => {
  const navigate = useNavigate()
  const [duration, setDuration] = useState('');
  const [amount , setAmount ] = useState('');
  const [result, setResult] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const user = useSelector((state)=>state.auth.user)




  
  React.useEffect(() => {
    const checkUserLogin = localStorage.getItem("user")
    const user = JSON.parse(checkUserLogin)
    if (!user){
      navigate("/login")
    }

  },[navigate]);



 
  const handleAmount = (e)=>{
    setAmount(parseInt(e.target.value))

    
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
    if (!amountValidation(amount )){
      NotificationManager.error("Invalid Amount" );
      return
    }
      if (!durationValidation(duration)){
        NotificationManager.error("Select Duration" );
        return
      }
    const response = calculate(amount, duration)
    setResult(response)
  };

 
  const handleSumit = async ()=>{
  const balance = user?.data?.balance
    if (balance < amount ){
        NotificationManager.error("Your Wallet is Not Funded" );
        
      }
    //const loanReference = String(Math.random() * (10 - 9) + "az");
    
    const data ={ amount ,duration , ...result}
   
    try{
      setIsLoading(true)
      const response = await fixedSaving(data)
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log(response.status)
      if (response.status===201){
      setIsLoading(false)
      navigate("/")
    }else{
      setDuration("")
      setAmount ("")
    }
    
    }catch(error){
      setAmount ("")
      setDuration("")
      
      NotificationManager.error( error.response.data.message);
      setIsLoading(false)
    }
  
    
    

  }
    
  return (
  <>  
    <h5 className=" font-medium text-gray-900 dark:text-white text-center text-sm mt-10"> Fixed Savings Investment</h5>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:ml-40">
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
        <SpinningButton   isLoading={isLoading} onClick={handleSumit} buttonName={"Fixed saving"}  classNames="w-full  inset-0 flex items-center justify-center text-white bg-[#092256]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"/> 
     
        </div>
    </div>
    <NotificationContainer />
</div>
    </>
  );
};

export default FixedSaving;

