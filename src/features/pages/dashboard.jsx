import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteItem, getItemList } from '../apiServices/itemServices';
import ItemTable from './itemTable';
import { Card, WalletIcon, InterestIcon, Spinner } from '../utilities/reuseAbles';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import SpinningButton from '../utilities/spinnerButton';

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Only updates the searchQuery when the user types
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmitSearch = async () => {
    if (!searchQuery.trim()) return; // Prevent empty search query submission
    setLoading(true);
    try {
      const response = await getItemList({ page: currentPage, limit: 20, search: searchQuery });
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

  const fetchDashboardDetails = async () => {
    setLoading(true);
    try {
      const response = await getItemList({ page: currentPage, limit: 20, search: searchQuery });
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

  useEffect(() => {
    fetchDashboardDetails();
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteItem(id);
      if (response.responseCode === 200) {
        NotificationManager.success('Deleted successfully');
        fetchDashboardDetails();
      } else {
        console.error('Error deleting item:', response);
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edith-item/${id}`);
  };

  if (loading) {
    return <Spinner className="text-center h-5" />;
  }

  return (
    <div>
      <div className="grid grid-cols-1 mt-10 md:grid-cols-2 gap-4 md:gap-6 md:ml-40 overflow-auto w-full">
        <input
          type="text"
          placeholder="Search items..."
          value={searchQuery}
          onChange={handleSearch}
          className="border p-2 rounded w-full mb-4 md:mb-0 md:w-3/4"
        />
        
        <SpinningButton
          isLoading={isLoading}
          onClick={handleSubmitSearch}
          buttonName="Search"
          classNames="w-full md:w-3/4 inset-0 flex items-center justify-center text-white bg-[#092256] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        />
      </div>

      <div className="mt-20">
        <ItemTable data={items} onDelete={handleDelete} onEdit={handleEdit} />
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
      <NotificationContainer />
    </div>
  );
};

export default Dashboard;
