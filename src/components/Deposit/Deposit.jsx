import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Deposit() {
    const [amount, setAmount] = useState('');
    const navigate = useNavigate();
  
    const handleDeposit = async (e) => {
      e.preventDefault();
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged in');
        return;
      }
  
      try {
        const response = await fetch('https://bank-system-67x1.onrender.com/api/bank/deposit', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount }),
        });
  
        const data = await response.json();
        if (data.success) {
          alert(`Deposited $${amount}`);
          navigate('/dashboard');
        } else {
          alert('Deposit failed');
        }
      } catch (error) {
        console.error('Error during deposit:', error);
        alert('Deposit failed');
      }
    };
  
    return (
      <div className="max-w-sm p-6 mx-auto bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-gray-700">Deposit Money</h2>
        <form onSubmit={handleDeposit}>
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
          <button type="submit" className="w-full py-2 text-white bg-green-500 rounded">Deposit</button>
        </form>
      </div>
    );
}
