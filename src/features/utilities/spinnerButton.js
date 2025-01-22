import React from "react"

import {SpinnerIcon} from "./spinnerIcons"



const SpinningButton = ({ onClick, isLoading, classNames, buttonName }) => (
    <button
      onClick={onClick}
      
      disabled={isLoading}
      className={classNames}
    >
      {isLoading ? <SpinnerIcon /> : `${buttonName}`}
    </button>
  );
  
  export default SpinningButton;