import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ItemTable from './itemTable';
import { Card, WalletIcon, InterestIcon, Spinner } from '../utilities/reuseAbles';
import { getItemList } from '../apiServices/itemServices';

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardDetails = async () => {
      setLoading(true);
      try {
        const response = await getItemList({ page: currentPage, query: searchQuery });
        if (response.responseCode === 200) {
          setItems(response.data.items);
          setTotalPages(response.data.totalPages);
        } else {
          console.error('Error fetching dashboard details:', response);
        }
      } catch (error) {
        console.error('Error fetching dashboard details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardDetails();
  }, [currentPage, searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); 
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return <Spinner className="text-center h-5" />;
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-6 md:ml-40 overflow-auto w-full">
        <Card
          className="w-1"
          title="Wallet Balance"
          //value={savings.balance.toFixed(2)}
          icon={<WalletIcon />}
        />
        <Card
          title="Interest Earned"
          //value={cashOut.toFixed(2)}
          icon={<InterestIcon />}
        />
      </div>
      <div className="mt-5">
        <input
          type="text"
          placeholder="Search items..."
          value={searchQuery}
          onChange={handleSearch}
          className="border p-2 rounded w-full md:w-1/2 mb-5"
        />
        <ItemTable data={items} />
      </div>
      <div className="mt-5 flex justify-center items-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded mr-2 disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded ml-2 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Dashboard;