import { combineReducers } from '@reduxjs/toolkit';


import {
  LOGIN,
  LOGOUT,
} from "./authTypes"


const initialState = {
    isAuthenticated: false,
    user: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN:
        console.log(action.type)
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload,
        };
      case LOGOUT:
          console.log(action)
        return {
          ...state,
          isAuthenticated: false,
          user: null,
        };
      default:
        return state;
    }
  };
  
   ;
  


  const rootReducer = combineReducers({
    auth: authReducer,
  });
  
  export default rootReducer