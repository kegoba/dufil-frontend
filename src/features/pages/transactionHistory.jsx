import React from 'react';

const TransactionHistory = ({ data }) => {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-sm font-bold mb-4 text-center">Transaction History</h2>
      <div className="container overflow-auto max-h-screen w-full">
        <table className="  bg-white border border-gray-300">
          <thead className="bg-[#092256] text-white rounded">
            <tr>
              <th className="py-2 px-4 border-b whitespace-nowrap md:w-1/5 sm:w-1/2">Date</th>
              <th className="py-2 px-4 border-b whitespace-nowrap md:w-1/5 sm:w-1/2">Amount</th>
              <th className="py-2 px-4 border-b whitespace-nowrap md:w-1/5 sm:w-1/2">Transaction Type</th>
              <th className="py-2 px-4 border-b whitespace-nowrap md:w-1/5 sm:w-1/2">Reference</th>
              <th className="py-2 px-4 border-b whitespace-nowrap md:w-1/5 sm:w-1/2">Narration</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((transaction, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b whitespace-nowrap md:w-1/5 sm:w-1/2">{new Date(transaction.date).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border-b whitespace-nowrap md:w-1/5 sm:w-1/2">{transaction.amount}</td>
                  <td className="py-2 px-4 border-b whitespace-nowrap md:w-1/5 sm:w-1/2">{transaction.transactionType}</td>
                  <td className="py-2 px-4 border-b whitespace-nowrap md:w-1/5 sm:w-1/2">{transaction.paymentReference}</td>
                  <td className="py-2 px-4 border-b whitespace-nowrap md:w-1/5 sm:w-1/2">{transaction.narration}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="py-2 px-4 text-center border-b"
                >
                  You don't have any transaction history
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory;
