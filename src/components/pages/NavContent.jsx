import React from 'react';
import { Link } from 'react-router-dom';

const NavContent = () => (
  <nav className="h-full flex flex-col justify-between p-8">
    <div className="space-y-4">
      <Link
        to="/"
        className="block text-2xl font-semibold text-gray-300 hover:text-gold transition-colors duration-300 transform hover:translate-x-2"
      >
        Home
      </Link>
      <Link
        to="/signup"
        className="block text-2xl font-semibold text-gray-300 hover:text-gold transition-colors duration-300 transform hover:translate-x-2"
      >
        Signup
      </Link>
      <Link
        to="/login"
        className="block text-2xl font-semibold text-gray-300 hover:text-gold transition-colors duration-300 transform hover:translate-x-2"
      >
        Login
      </Link>
      <Link
        to="/dashboard"
        className="block text-2xl font-semibold text-gray-300 hover:text-gold transition-colors duration-300 transform hover:translate-x-2"
      >
        Dashboard
      </Link>
    </div>
    <div className="text-gray-600 text-sm">
      <p>&copy; 2026 Taphouse</p>
    </div>
  </nav>
);

export default NavContent; 