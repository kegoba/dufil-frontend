
import React, { useState,useEffect } from 'react';
import {Link} from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import { getItem, updateItem} from '../apiServices/itemServices';
import SpinningButton from "../utilities/spinnerButton"
import { inputValidation, } from "../utilities/validationService"
import { useParams } from 'react-router-dom'


const EdithItem = () => {

  const navigate = useNavigate()
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [item, setItem] = useState();
 
  const [isLoading, setIsLoading] = useState(false) 
  const { id } = useParams()

   




const user = useSelector((state)=> state?.auth?.user?.data)





useEffect(() => {
    const getItemApi = async () => {
    
      try {
        const response = await getItem(id);
        if (response.responseCode === 200) {
            const fetchedItem = response.data;
            setItem(fetchedItem);
            setName(fetchedItem.name);
            setDescription(fetchedItem.description); 
        } else {
          console.error('Error fetching dashboard details:', response);
        }
      } catch (error) {
        console.error('Error fetching dashboard details:', error);
      } finally {
      
      }
    };

    getItemApi();
  }, []);





  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!inputValidation(description)){
      NotificationManager.error("Invalid description");
      return
    }
    if(!inputValidation(name)){
      NotificationManager.error("Invalid Name");
      return
    }
    
    const data ={
     description : description, 
     name: name
    }

    console.log(data)
   try{
    setIsLoading(true)
  
    const resp = await updateItem(id,data)
    await new Promise((resolve) => setTimeout(resolve, 2000));
      if (resp.responseCode=== 200){
        NotificationManager.success("Item Updated Successfully");
        navigate("/dashboard")
       
      }else{
        setName("")
        setDescription("")
     

      }
      setIsLoading(false);
   }catch(error){
    NotificationManager.error( error.response.data.message);
   }
    
   setIsLoading(false);
  };

  



  
  const handleName= (e)=>{
    e.preventDefault();
    
    setName(e.target.value)
    
  }
  const handleDescription = (e)=>{
    e.preventDefault();
    setDescription(e.target.value)
    
  }
 



  return (
    
    <div className="w-full max-w-sm md:mx-[450px] mt-20 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
    <div className="space-y-6">
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Update Item</h5>
        
        
        <div>
        
            <input value={name} type="text" placeholder="Enter Name"  onChange={handleName}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
        </div>
        <div>
            <input  value={description} placeholder="Enter Descriotion"  onChange={handleDescription}  type="text"className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
        </div>
       
        
        <SpinningButton   isLoading={isLoading} onClick={handleSubmit} buttonName={"Update"}  classNames="w-full  inset-0 flex items-center justify-center text-white bg-[#092256]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"/> 
        
       
    </div>
    <NotificationContainer/>
</div>

    
  );
};

export default EdithItem;

