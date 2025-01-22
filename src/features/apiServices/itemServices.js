
import {axiosInstance} from "./axiosConfig"


export const getAllUserServices  = async ()=> {
  const response = await axiosInstance.get("/admin/getalluser");

  return response.data
    
}





export const getItemList = async (page = 1, limit = 20, search = '') => {
  const response = await axiosInstance.get(`/item/findall?page=${page}&limit=${limit}&search=${search}`);
  return response.data;
};







export const AddItem  = async (data)=> {
  const response = await axiosInstance.post("/item/add", data);

  return response.data
    
}



   





