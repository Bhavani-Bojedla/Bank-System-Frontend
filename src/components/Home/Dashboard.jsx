import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const [balance, setBalance] = useState(0);
    const navigate = useNavigate();
  
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
        alert("please Login")
      } else {
        fetchBalance(token);
      }
    }, [navigate]);
  
    const fetchBalance = async (token) => {
      try {
        const response = await fetch('https://bank-system-67x1.onrender.com/api/bank/history', {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` },
        });
        const data = await response.json();
        setBalance(data.balance);
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };
  
    const handleLogout = () => {
      localStorage.removeItem('token');
      navigate('/');
    };
  
    return (
      <div className="max-w-lg p-6 mx-auto bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-gray-700">Dashboard</h2>
        <div></div>
        <p className="mb-6 text-lg text-gray-600">Balance: ${balance}</p>
        <button
          onClick={() => navigate('/deposit')}
          className="w-full py-2 mb-2 text-white bg-blue-500 rounded"
        >
          Deposit
        </button>
        <button
          onClick={() => navigate('/withdraw')}
          className="w-full py-2 mb-2 text-white bg-red-500 rounded"
        >
          Withdraw
        </button>
        <button
          onClick={() => navigate('/send')}
          className="w-full py-2 mb-2 text-white bg-orange-500 rounded"
        >
          Send Money
        </button>
        <button
          onClick={() => navigate('/history')}
          className="w-full py-2 text-white bg-green-500 rounded"
        >
          History
        </button>
        <button
          onClick={handleLogout}
          className="w-full py-2 mt-4 text-white bg-gray-500 rounded"
        >
          Logout
        </button>
      </div>
    );
}
