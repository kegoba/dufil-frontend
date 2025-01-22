import React from 'react';

const LoanHistory = ({ data }) => {
  return (
    <div className="p-4 max-w-4xl mx-auto">

    <h1 className="text-sm font-bold mb-6 text-center">Loan History</h1>
   
    <div className="container overflow-auto   w-full  ">
      <table className=" bg-white border border-gray-300 ">
        <thead className='bg-[#092256] text-white'>
          <tr className="bg-muted text-muted-foreground">
          <th className="py-2 px-4 border-b whitespace-nowrap md:w-1/5 sm:w-2">Date</th>
            <th className="py-2 px-4 border-b whitespace-nowrap md:w-1/5 sm:w-2">Duration</th>
            <th className="py-2 px-4 border-b whitespace-nowrap md:w-1/5 sm:w-2">Repayment</th>
            <th className="py-2 px-4 border-b whitespace-nowrap md:w-1/5 sm:w-2">Principal</th>
            <th className="py-2 px-4 border-b whitespace-nowrap md:w-1/5 sm:w-2">Amount Payable</th>
            <th className="py-2 px-4 border-b whitespace-nowrap md:w-1/5 sm:w-2">Status</th>
          </tr>
        </thead>
       <tbody>
          {data.length > 0 ? (
            data.map((loan, key) => (
              <tr key={key}>
                <td className="py-2 px-4 border-b whitespace-nowrap md:w-1/5 sm:w-2">{new Date(loan.date).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b whitespace-nowrap md:w-1/5 sm:w-2">{loan.duration}</td>
                <td className="py-2 px-4 border-b whitespace-nowrap md:w-1/5 sm:w-2">{loan?.monthlyReturn?.toLocaleString()}</td>
                <td className="py-2 px-4 border-b whitespace-nowrap md:w-1/5 sm:w-2">{loan?.amountBorrowed?.toLocaleString()}</td>
                <td className="py-2 px-4 border-b whitespace-nowrap md:w-1/5 sm:w-2">{loan?.totalAmountToBePaid?.toLocaleString()}</td>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    loan.status === "approved"
                      ? "bg-green-100 text-green-600"
                      : loan.status === "pending"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {loan.status}
                </span>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="py-2 px-4 text-center border-b">
                You don't have any Loan History
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
  );
};

export default LoanHistory;
