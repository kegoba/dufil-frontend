import React, { useState, useEffect, useRef } from 'react';



export const  calculate = (amount, duration)=>{
  
    const totalInterest = (amount * (5 / 100) * duration);
    const totalAmountToBePaid = amount + totalInterest
    const monthlyReturn = totalAmountToBePaid/duration
    //const monthlyInterestRate = interestRate / 100 / numberOfMonths;  //Math.round
    return {totalInterest : parseInt(totalInterest),
          totalAmountToBePaid : parseInt(totalAmountToBePaid), 
          monthlyReturn:parseInt(monthlyReturn) };
  } 
  
  export const interestEarned = (principal, despositedDate,calculatedDate) => {
    const startDate = new Date(despositedDate);
    const endDate = new Date(calculatedDate);
    // Calculate time difference in milliseconds
    const timeDifference = endDate.getTime() - startDate.getTime();
    
    // Convert time difference to days
    const timeInDays = timeDifference / (1000 * 60 * 60 * 24);
    const interestRate = 4 / 100; // Convert percentage to decimal
    const interest = principal * interestRate * (timeInDays / 365); // Assuming 365 days in a year
    return interest;
  };



const ThreeDottedAction = ({ actions }) => {
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setShowMenu(false);
        }
    };

    useEffect(() => {
        if (showMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showMenu]);

    return (
        <div className="relative inline-block" ref={menuRef}>
            <button onClick={toggleMenu} className="p-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        fillRule="evenodd"
                        d="M6 10a2 2 0 100-4 2 2 0 000 4zm0 6a2 2 0 100-4 2 2 0 000 4zm0 6a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
            {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                     <ul className="py-1">
                        {actions.map((action, index) => (
                            <li
                                key={index}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                onClick={action.onClick}
                            >
                                {action.label}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};







export const Table = ({ columns, data, onApprove, onReject, actionType }) => {
    const actions = (item) => [
        {
            label: Object.values(actionType)[0],
            onClick: () => onApprove(item),
        },
        {
            label: Object.values(actionType)[1],
            onClick: () => onReject(item),
        },
    ];

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    const formatAmount = (amount) => {
        return Number(amount).toLocaleString();
    };

    const formatCellValue = (col, value) => {
        if (col.accessor === 'date') {
            return formatDate(value);
        } else if (
            col.accessor === 'monthlyReturn' ||
            col.accessor === 'totalAmountToBePaid' ||
            col.accessor === 'amountBorrowed'
        ) {
            return formatAmount(value);
        }
        return value;
    };

    if (!Array.isArray(data)) {
        return <div>No data available.</div>;
    }

    return (
        <div className="container overflow-x-auto overflow-y-auto">
            <div className="">
                <table className="w-full bg-white border border-gray-300">
                    <thead className='bg-[#092256] text-white'>
                        <tr>
                            {columns?.map((col, index) => (
                                <th key={index} className="py-2 px-4">
                                    {col.header}
                                </th>
                            ))}
                            <th className="py-2 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, rowIndex) => (
                            <tr key={rowIndex} className="border-b">
                                {columns?.map((col, colIndex) => (
                                    <td key={colIndex} className="py-2 px-4">
                                        {formatCellValue(col, item[col.accessor])}
                                    </td>
                                ))}
                                <td className="py-2 px-4 text-right">
                                    <ThreeDottedAction actions={actions(item)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};




export const Card = ({ title, value, icon }) => {
    return (
        <div className="bg-white w-60 shadow-md rounded-lg p-6 flex items-center">
            <div className="mr-4">{icon}</div>
            <div>
                <h2 className="text-lg font-semibold">{title}</h2>
                <p className="text-2xl font-bold">{value}</p>
            </div>
        </div>
    );
};



export const WalletIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 3a2 2 0 012-2h10a2 2 0 012 2v2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 010-4zM5 5h10V3H5v2zm0 2v8h10V9H9a1 1 0 110-2H5z" clipRule="evenodd" />
    </svg>
);

export const InterestIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M2 10a8 8 0 1114.32 5.907l2.387 2.387a1 1 0 01-1.414 1.414l-2.387-2.387A8 8 0 012 10zm8-6a6 6 0 100 12A6 6 0 0010 4z" clipRule="evenodd" />
    </svg>
);



export const ArrowDownIcon = ({ className, width = 24, height = 24, fill = "currentColor" }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
    >
      <path
        fillRule="evenodd"
        d="M12 21a1 1 0 01-.707-.293l-7-7a1 1 0 111.414-1.414L11 17.586V3a1 1 0 112 0v14.586l5.293-5.293a1 1 0 111.414 1.414l-7 7A1 1 0 0112 21z"
        clipRule="evenodd"
      />
    </svg>
  );

  export const SpinnerIcon = () => (
    <svg
      className="animate-spin h-5 w-5 text-white text-center"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
  



  


  export const Spinner = () => (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  
  
   