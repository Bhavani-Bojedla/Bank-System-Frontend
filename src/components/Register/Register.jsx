import React from 'react'
import { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
   useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        navigate('/dashboard');
        alert("Please logout to do a new registration")
      }
    }, [navigate]);
    const handleRegister = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('https://bank-system-67x1.onrender.com/api/bank/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
        });
  
        const data = await response.json();
  
        if (response.status === 201) {
          navigate('/');
        } else {
          alert('Registration failed');
        }
      } catch (error) {
        console.error('Error during registration:', error);
        alert('Registration failed');
      }
    };
  
    return (
      <div className="max-w-sm p-6 mx-auto bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-gray-700">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-600">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button type="submit" className="w-full py-2 text-white bg-green-500 rounded">Register</button>
        </form>
      </div>
    );
}
