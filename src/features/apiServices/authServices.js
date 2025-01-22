
import {axiosInstance} from "./axiosConfig"


export const getAllUserServices  = async ()=> {
  const response = await axiosInstance.get("/admin/getalluser");

  return response.data
    
}



export const registerUser  = async (data)=> {
  const response = await axiosInstance.post("/auth/signup",data);

  return response.data
    
}

export const loginUser = async (data) => {
  try {
    const response = await axiosInstance.post("/auth/signin", data);
    if (response.status === 200) {
      localStorage.setItem("user", JSON.stringify(response.data.data));
      localStorage.setItem("token", response.data.data.token);
      return response;
    }
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
  return null;
};

//pending
export const changePasswordServices  = async (data)=> {
  const response = await axiosInstance.post("/user/change-password",data); 

  return response
    
}

export const forgotPasswordServices  = async (data)=> {
  const response = await axiosInstance.post("/user/forgot-password",data);

  return response
    
}

export const resetPasswordServices  = async (data)=> {
  const response = await axiosInstance.post("/user/reset-password",data); 

  return response
    
}






   





