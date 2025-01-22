import {
  LOGIN,
  LOGOUT,
  TOKEN_EXPIRED
} from "./authTypes"



export const login = (user) => {
    return {
      type: LOGIN,
      payload: user,
    };
  };
  
export const logout = () => {
  return {
    type: LOGOUT,
  };
};




export const tokenExpired = () => ({
  type: TOKEN_EXPIRED,
});