
import React from 'react';

const GetFixedSavings = ({ data }) => {

 
  return (
    <div className="p-4 max-w-4xl mx-auto">

    <h1 className="text-sm font-bold mb-6 text-center">Fixed Saving</h1>
   
    <div className="container overflow-auto   w-full  ">
      <table className=" bg-white border border-gray-300 ">
        <thead className='bg-[#092256] text-white'>
          <tr className="bg-muted text-muted-foreground">
          <th className="py-2 px-4 border-b whitespace-nowrap md:w-1/5 sm:w-2">Date</th>
            <th className="py-2 px-4 border-b whitespace-nowrap md:w-1/5 sm:w-2">fixedAmount</th>
            <th className="py-2 px-4 border-b whitespace-nowrap md:w-1/5 sm:w-2">Duration</th>
            <th className="py-2 px-4 border-b whitespace-nowrap md:w-1/5 sm:w-2">totalInterest</th>
            <th className="py-2 px-4 border-b whitespace-nowrap md:w-1/5 sm:w-2">Total Amount </th>
             
          </tr>
        </thead>
       <tbody>
          {data.length > 0 ? (
            data.map((loan, key) => (
              <tr key={key}>
                <td className="py-2 px-4 border-b whitespace-nowrap md:w-1/5 sm:w-2">{new Date(loan.date)?.toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b whitespace-nowrap md:w-1/5 sm:w-2">{loan?.fixedAmount?.toLocaleString()}</td>
                <td className="py-2 px-4 border-b whitespace-nowrap md:w-1/5 sm:w-2">{loan?.duration}</td>
                <td className="py-2 px-4 border-b whitespace-nowrap md:w-1/5 sm:w-2">{loan?.totalInterest?.toLocaleString()}</td>
                <td className="py-2 px-4 border-b whitespace-nowrap md:w-1/5 sm:w-2">{loan?.totalAmountToBePaid?.toLocaleString()}</td>
                
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

export default GetFixedSavings;
