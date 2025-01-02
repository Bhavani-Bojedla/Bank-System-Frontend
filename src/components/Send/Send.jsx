import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Send() {
  const [fromAccountId, setFromAccountId] = useState('');
  const [toAccountId, setToAccountId] = useState('');
  const [amount, setAmount] = useState('');
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
          setFromAccountId(data.id);
        } catch (error) {
          console.error('Error fetching balance:', error);
        }
      };
  
  const handleSend = async (e) => {
    e.preventDefault();
    
    if ( !toAccountId || !amount || isNaN(amount)) {
      alert('Please fill in all fields with valid data');
      return;
    }
    const token = localStorage.getItem('token');

    if (!token) {
      alert('You must be logged in');
      return;
    }
    
    try {
      const response = await fetch('https://bank-system-67x1.onrender.com/api/bank/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ fromAccountId, toAccountId, amount }),
      });

      const data = await response.json();
      if (data.message) {
        alert(data.message); 
      } else {
        alert('Transaction successful');
        navigate("/dashboard");
        setFromAccountId('');
        setToAccountId('');
        setAmount('');
      }
    } catch (error) {
      console.error('Error during money transfer:', error);
      alert('An error occurred during the transfer');
    }
  };

  return (
    <div className="max-w-sm p-6 mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-gray-700">Send Money</h2>
      <form onSubmit={handleSend}>
        <div className="mb-4">
        </div>
        <div className="mb-4">
          <label htmlFor="toAccountId" className="block text-gray-600">To Account ID</label>
          <input
            type="text"
            id="toAccountId"
            value={toAccountId}
            onChange={(e) => setToAccountId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="amount" className="block text-gray-600">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button type="submit" className="w-full py-2 text-white bg-blue-500 rounded">Send</button>
      </form>
    </div>
  );
}
