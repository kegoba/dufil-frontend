
import {axiosInstance} from "./axiosConfig"


export const getAllUserServices  = async ()=> {
  const response = await axiosInstance.get("/admin/getalluser");

  return response.data
    
}





export const getItemList = async (params) => {
  const response = await axiosInstance.get(`/item/findall`,{params});
  return response.data;
};







export const AddItem  = async (data)=> {
  const response = await axiosInstance.post("/item/add", data);

  return response.data
    
}


export const getItem  = async (id)=> {
  const response = await axiosInstance.get(`/item/findone/${id}`);

  return response.data
    
}
   
export const updateItem  = async (id, data)=> {
  const response = await axiosInstance.put(`/item/update/${id}`,data);

  return response.data
    
}

export const deleteItem  = async (id)=> {
  const response = await axiosInstance.delete(`/item/delete/${id}`);

  return response.data
    
}



