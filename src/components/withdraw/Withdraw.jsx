import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Withdraw() {
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();

  const handleWithdraw = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in');
      return;
    }

    try {
      const response = await fetch('https://bank-system-67x1.onrender.com/api/bank/withdraw', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });

      const data = await response.json();
      if (data.success) {
        alert(`Withdrew $${amount}`);
        navigate('/dashboard');
      } else {
        alert(data.message);
      }
    } catch (error) {
        alert(error);
    }
  };

  return (
    <div className="max-w-sm p-6 mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-gray-700">Withdraw Money</h2>
      <form onSubmit={handleWithdraw}>
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
        <button type="submit" className="w-full py-2 text-white bg-red-500 rounded">Withdraw</button>
      </form>
    </div>
  );
}
