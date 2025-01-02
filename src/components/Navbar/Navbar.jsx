import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div>
       <nav className="p-4 text-white bg-gray-800">
      <div className="flex items-center justify-between">
        <Link to="/dashboard" className="text-2xl">Bank System</Link>
        <div>
          <Link to="/" className="mr-4">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </div>
    </nav>
    </div>
  )
}
