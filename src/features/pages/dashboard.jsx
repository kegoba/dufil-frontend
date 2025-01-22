import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TransactionHistory from './transactionHistory';
import LoanHistory from './loanHistory';
import { Card, WalletIcon, InterestIcon, interestEarned, Spinner } from '../utilities/reuseAbles';
import { getDashboardDetails } from '../apiServices/userServices';
import GetFixedSavings from "./getFixedSavings"

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [savings, setSavings] = useState({ balance: 0, interest: 0 });
  const [loans, setLoans] = useState([]);
  const [transaction, setTransaction] = useState([]);
  const [cashOut, setCashOut] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true)
  const [fixedDeposit, setfixedDeposit] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardDetails = async () => {
      try {
        const response = await getDashboardDetails();
        if (response.status === 200) {
          const savingsData = response.data.wallet[0];
          const { date, interest, balance } = savingsData;

          const depositedDate = new Date(date).toISOString().slice(0, 10);
          const calculatedDate = new Date().toISOString().slice(0, 10);

          const cash = interestEarned(balance, depositedDate, calculatedDate);

          setTransaction(response.data.transaction);
          setCashOut(cash);
          setUser(response.data.user);
          setSavings({ interest, balance });
          setLoans(response.data.loans);
          setfixedDeposit(response.data.fixedsaving);
          console.log(response.data.fixedsaving, "fix")
        } else {
          console.error('Error fetching dashboard details:', response);
        }
      } catch (error) {
        console.error('Error fetching dashboard details:', error);
      } finally {
        setLoading(false); // Ensure loading is set to false after fetching data
      }
    };

    fetchDashboardDetails();
  }, [navigate]);

  if (loading) {
    return <Spinner  className='text-center h-5'/>
  }
   

  
   

  return (
    <div>
      <div className="grid grid-cols-2 gap-6 md:ml-40 overflow-auto w-full">
        <Card
          className="w-1"
          title="Wallet Balance"
          value={savings.balance.toFixed(2)}
          icon={<WalletIcon />}
        />
        <Card
          title="Interest Earned"
          value={cashOut.toFixed(2)}
          icon={<InterestIcon />}
        />
      </div>
      <div className='mt-5'>
      <TransactionHistory data={transaction} />
      </div>
      <div className='mt-5'>
      <LoanHistory data={loans} />
      </div>

      <div className='mt-5'>
      <GetFixedSavings data={fixedDeposit}/>
      </div> 
    </div>
  );
};

export default Dashboard;
