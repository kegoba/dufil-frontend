
import {axiosInstance} from "./axiosConfig"


export const getAllUserServices  = async ()=> {
  const response = await axiosInstance.get("/admin/getalluser");

  return response.data
    
}

export const getAllLoanRequestServices  = async ()=> {
  const response = await axiosInstance.get("/admin/getloanrequest");

  return response.data
    
}
export const approveLoanRequestServices  = async (data)=> {
  const response = await axiosInstance.post("/admin/approveloanrequest");

  return response.data
    
}
//loanrequest

export const cancelloanRequestService  = async (loanId)=> {
  const response = await axiosInstance.post('/loan/cancel-loanrequest/'+loanId);

  return response

}

export const getloanRequestService  = async ()=> {
  const response = await axiosInstance.get('/loan/getloanrequest');

  return response

}
export const loanRequestService  = async (data)=> {
  const response = await axiosInstance.post("/loan/loanrequest",data);

  return response
    
}

export const registerUser  = async (data)=> {
  const response = await axiosInstance.post("/user/register",data);

  return response
    
}

export const loginUser = async (data) => {
  try {
    const response = await axiosInstance.post("/user/login", data);
    if (response.status === 200) {
      localStorage.setItem("user", JSON.stringify(response.data.data));
      localStorage.setItem("token", response.data.data.token);
      return response.data;
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


export const getDashboardDetails  = async (id)=> {
  const response = await axiosInstance.get("/user/dashboard");

  return response
    
}



export const FundWalletservices  = async (data)=> {
  const response = await axiosInstance.post("/wallet/fundwallet",data);

  return response.data
    
}


export const postWalletToWalletTransfer  = async (data)=> {
  const response = await axiosInstance.post("/wallet//wallet-t0-wallet-transfer", data);

  return response
    
}


export const getUserDetialsByPhone  = async (data)=> {
  const response = await axiosInstance.post("/user/getuserbyphone", data);

  return response
    
}
   


export const fixedSaving  = async (data)=> {
  const response = await axiosInstance.post("/saving/create-fixed-saving", data);

  return response
    
}


