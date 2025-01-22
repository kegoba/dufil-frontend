import React from 'react';

const SuccessTransaction = () => {
  return (
    <div className=" flex items-center justify-center bg-green-500">
      <div className="bg-green-500 p-8 rounded-lg shadow-lg text-center">
        <svg
          className="mx-auto mb-4 w-24 h-24 text-green-500"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586l-3.293-3.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
            clipRule="evenodd"
          />
        </svg>
        <h2 className="text-2xl font-semibold text-green-500 mb-2">Transaction Successful</h2>
        <p className="text-gray-600 mb-6">Thank you! Your transaction has been completed successfully.</p>
        <button
          className=" bg-green-500 py-2 px-4 rounded hover:bg-blue-600"
          onClick={() => window.location.href = '/'} // Change this to your desired redirection URL
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default SuccessTransaction;
