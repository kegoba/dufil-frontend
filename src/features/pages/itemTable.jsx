import React from 'react';

const ItemTable = ({ data }) => {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-sm font-bold mb-4 text-center">List Of Item</h2>
      <div className="container overflow-auto max-h-screen w-full">
        <table className="  bg-white border border-gray-300">
          <thead className="bg-[#092256] text-white rounded">
            <tr>
              <th className="py-2 px-4 border-b whitespace-nowrap md:w-1/5 sm:w-1/2">Date</th>
              <th className="py-2 px-4 border-b whitespace-nowrap md:w-1/5 sm:w-1/2">name</th>
              <th className="py-2 px-4 border-b whitespace-nowrap md:w-1/5 sm:w-1/2">description</th>
              <th className="py-2 px-4 border-b whitespace-nowrap md:w-1/5 sm:w-1/2">delete</th>
              <th className="py-2 px-4 border-b whitespace-nowrap md:w-1/5 sm:w-1/2">edit</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b whitespace-nowrap md:w-1/5 sm:w-1/2">{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border-b whitespace-nowrap md:w-1/5 sm:w-1/2">{item.name}</td>
                  <td className="py-2 px-4 border-b whitespace-nowrap md:w-1/5 sm:w-1/2">{item.description}</td>
                  <td className="py-2 px-4 border-b whitespace-nowrap md:w-1/5 sm:w-1/2">{}</td>
                  <td className="py-2 px-4 border-b whitespace-nowrap md:w-1/5 sm:w-1/2">{}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="py-2 px-4 text-center border-b"
                >
                  You don't have any Item
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemTable;
