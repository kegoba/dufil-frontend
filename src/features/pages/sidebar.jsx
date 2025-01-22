import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../reduxServices/actions';
import { useDispatch } from "react-redux";
import { DasboardIcon, ArrowDownIcon, LogoutIcon, SavingIcon, FundIcon, SettingIcon, LoanIcon } from "../utilities/svg";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="relative h-screen">
  
      <div
      >
        <div className="flex mt-10 items-center justify-between h-16  p-4">
          <span>User Dashboard</span>
         
        </div>
        <ul className="flex-grow">
          <li className="flex items-center p-4 hover:bg-gray-200">
            <Link to="/dashboard" className="flex items-center w-full" >
              <DasboardIcon className="mr-4" />
              <span>Dashboard</span>
            </Link>
          </li>
 
          <li className="flex items-center p-4 hover:bg-gray-200">
            <div className="dropdown w-full">
              <div tabIndex={0} role="button" className="flex items-center w-full">
                <FundIcon className="mr-4" />
                <Link to="/add-item" >Add Item</Link>
                
                
              </div>
      
            </div>
          </li>
         
          <li className="flex items-center p-4 hover:bg-gray-200">
            <div className="dropdown w-full">
              <div tabIndex={0} role="button" className="flex items-center w-full">
                <SettingIcon className="mr-4" />
                Settings
                <ArrowDownIcon className="ml-auto  text-gray-500" />
              </div>
              <ul tabIndex={0} className="dropdown-content z-[1] p-4 shadow bg-base-100 w-52">
                <li className="p-4"><Link to="/changePassword" >Change Password</Link></li>
                <li className="p-4" >Update Profile</li>
              </ul>
            </div>
          </li>
          <li className="flex items-center p-4 hover:bg-gray-200">
            <button onClick={handleLogout} className="flex items-center w-full">
              <LogoutIcon className="mr-4" />
              Logout
            </button>
          </li>
        </ul>
      </div>

     
    </div>
  );
};

export default Sidebar;
