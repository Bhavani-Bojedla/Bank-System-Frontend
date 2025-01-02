import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function History() {
  const [balance, setBalance] = useState(0);
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
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
      setHistory(data.history);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  return (
    <div className="max-w-lg p-6 mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-gray-700">Transaction History</h2>
      <p className="mb-6 text-lg text-gray-600">Balance: ${balance}</p>

      <h3 className="mb-4 text-xl font-semibold text-gray-700">Transaction History:</h3>
      <ul className="pl-5 list-disc">
        {history.length > 0 ? (
          history.map((transaction, index) => (
            <li key={index} className="text-gray-600">{transaction}</li>
          ))
        ) : (
          <li className="text-gray-600">No transactions found.</li>
        )}
      </ul>
    </div>
  );
}
