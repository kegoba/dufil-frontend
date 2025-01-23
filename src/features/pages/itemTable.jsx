import React from 'react';
import { DeleteIcon, EditIcon } from '../utilities/svg';

const ItemTable = ({ data, onDelete, onEdit }) => {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-sm font-bold mb-4 text-center">List Of Items</h2>
      <div className="container overflow-auto max-h-screen w-full">
        <table className="bg-white border border-gray-300">
          <thead className="bg-[#092256] text-white rounded">
            <tr>
              <th className="py-2 px-4 border-b whitespace-nowrap md:w-1/5 sm:w-1/2">Date</th>
              <th className="py-2 px-4 border-b whitespace-nowrap md:w-1/5 sm:w-1/2">Name</th>
              <th className="py-2 px-4 border-b whitespace-nowrap md:w-1/5 sm:w-1/2">Description</th>
              <th className="py-2 px-4 border-b whitespace-nowrap md:w-1/5 sm:w-1/2">Delete</th>
              <th className="py-2 px-4 border-b whitespace-nowrap md:w-1/5 sm:w-1/2">Edit</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b whitespace-nowrap md:w-1/5 sm:w-1/2">{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border-b whitespace-nowrap md:w-1/5 sm:w-1/2">{item.name}</td>
                  <td className="py-2 px-4 border-b whitespace-nowrap md:w-1/5 sm:w-1/2">{item.description}</td>
                  <td className="py-2 px-4 border-b text-center md:w-1/5 sm:w-1/2">
                    <button onClick={() => onDelete(item._id)} className="hover:text-red-600">
                      <DeleteIcon className="w-5 h-5 inline" />
                    </button>
                  </td>
                  <td className="py-2 px-4 border-b text-center md:w-1/5 sm:w-1/2">
                    <button onClick={() => onEdit(item._id)} className="hover:text-blue-600">
                      <EditIcon className="w-5 h-5 inline" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-2 px-4 text-center border-b">
                  You don't have any items
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
