
import React, { useState,useEffect } from 'react';
import {Link} from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import {postWalletToWalletTransfer, getUserDetialsByPhone} from '../apiServices/userServices';
import SpinningButton from "../utilities/spinnerButton"
import {amountValidation, phoneValidation} from "../apiServices/validationService"



const WalletToWalletTransfer = () => {

  const navigate = useNavigate()
  const [beneficiaryPhone, setBeneficiaryPhone] = useState('');
  const [beneficiaryName, setBeneficiaryName] = useState('');
  const [beneficiaryId, setBeneficiaryId] = useState('');
  const [amount, setAmount] = useState('');
  const [narration, setNarration] = useState('');
  const [isLoading, setIsLoading] = useState(false) //
   




const user = useSelector((state)=> state?.auth?.user?.data)



  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!amountValidation(amount)){
      NotificationManager.error("Invalid Amount");
      return
    }
    if(!phoneValidation(beneficiaryPhone)){
      NotificationManager.error("Phone Number Must Be Must be 11 digits", "Invalid Phone Number");
      return
    }
    if(user.phone === beneficiaryPhone){
      NotificationManager.error("Sorry, You Cannot Transfer to Yourself");
      return
    }
    const data ={
      beneficiaryId, narration, amount,
    }

    console.log(data)
   try{
    setIsLoading(true)
    const resp = await postWalletToWalletTransfer(data)
    await new Promise((resolve) => setTimeout(resolve, 2000));
      if (resp.status=== 200){
        NotificationManager.success("Transaction Successful");
        navigate("/dashboard")
       
      }else{
        setAmount("")
        setBeneficiaryPhone("")
        setNarration("")

      }

   }catch(error){
    NotificationManager.error( error.response.data.message);
   }
    
   setIsLoading(false);
  };

  

const handleBeneficiaryAccount = async (e) => {
  e.preventDefault();
  const phone = e.target.value;
  setBeneficiaryPhone(phone)
  if(!phoneValidation(phone)){
    return
  }
  if (phone) {
    const data = { phone: phone };
    try {
      const response = await getUserDetialsByPhone(data);

      if (response.data.name) {
        console.log(response.data.name)
        const defaultNaration = `TRF ${user?.name} to ${response.data.name}`
        setBeneficiaryName(response.data.name);
        setBeneficiaryId(response.data.id)
        setNarration(defaultNaration);
        NotificationManager.success("User Found");
      } else {
        NotificationManager.error("User Not Found");
        setBeneficiaryName("");
      }
    } catch (error) {
      setBeneficiaryName("");
      setNarration("");
      NotificationManager.error( error.response.data.message);
    } 
  }
};

  
  const handleAmount = (e)=>{
    e.preventDefault();
    const value= parseInt(e.target.value)
    setAmount(value)
    
  }
  const handleNarration = (e)=>{
    e.preventDefault();
    setNarration(e.target.value)
    
  }
 



  return (
    
    <div className="w-full max-w-sm md:mx-[450px] mt-20 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
    <div className="space-y-6">
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Wallet To Wallet Transfer</h5>
        
        
        <div>
        {beneficiaryName && <p className='bg-[#092256] text-white'> {beneficiaryName}</p>}
            <input type="text" placeholder="Beneficiary Account Number"  onChange={handleBeneficiaryAccount}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
        </div>
        <div>
            <input placeholder="Enter Amount"  onChange={handleAmount}  type="amount"className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
        </div>
        <div>
            <input type="text" placeholder="Enter Naration" onChange={handleNarration}  value={narration}   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
        </div>
        
        <SpinningButton   isLoading={isLoading} onClick={handleSubmit} buttonName={"Proceed>>"}  classNames="w-full  inset-0 flex items-center justify-center text-white bg-[#092256]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"/> 
        
       
    </div>
    <NotificationContainer/>
</div>

    
  );
};

export default WalletToWalletTransfer;

