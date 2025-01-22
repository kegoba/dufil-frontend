import React, { useState, useEffect } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { Table, Spinner} from '../utilities/reuseAbles';
import { getloanRequestService, cancelloanRequestService } from "../apiServices/userServices";

const LoanHistory1 = () => {
  const [loan, setLoan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const actionType = {
    Cancel_Loan: "Cancel Loan",
    Liquidate_Loan: "Liquidate Loan",
  };

  const columns = [
    { header: 'Date', accessor: 'date' },
    { header: 'Duration in Months', accessor: 'duration' },
    { header: 'Repayment', accessor: 'monthlyReturn' },
    { header: 'Total Amount To Be Paid', accessor: 'totalAmountToBePaid' },
    { header: 'Amount Borrowed', accessor: 'amountBorrowed' },
    { header: 'Status', accessor: 'status' },
  ];

  useEffect(() => {
    const fetchLoanRequests = async () => {
      try {
        const response = await getloanRequestService();
        if (response) {
          setLoan(response.data.data);
        } else {
          console.error('No data found in response');
          setError('No data found in response');
        }
      } catch (error) {
        console.error('Error fetching loan requests:', error);
        setError('Error fetching loan requests');
      } finally {
        setLoading(false);
      }
    };

    fetchLoanRequests();
  }, []);

  const handleCancel = async (item) => {
    try {
      setLoading(true);
      const response = await cancelloanRequestService(item._id);
      if (response) {
        setLoading(false);
        setTimeout(() => {
          NotificationManager.success(response.data.data);
        }, 1000);
      }
    } catch (error) {
      setLoading(false);
      setTimeout(() => {
        NotificationManager.error(error.response.data.message);
      }, 1000);
    }
  };

  const handleLiquidate = (item) => {
    console.log('handleLiquidate:', item._id);
    // Add your reject logic here
  };

  if (loading) {
    return <Spinner/>
  }

 
  return (
      <div className="container overflow--auto">
      
        <div className=" container overflow-auto max-h-screen w-full ">
        {Array.isArray(loan) && loan.length > 0 ? (
          <Table
            columns={columns}
            data={loan}
            onApprove={handleCancel}
            onReject={handleLiquidate}
            actionType={actionType}
          />
        ) : (
          <div>No loan records available.</div>
        )}
   
      </div>
      <NotificationContainer />
    </div>
  );
};

export default LoanHistory1;
