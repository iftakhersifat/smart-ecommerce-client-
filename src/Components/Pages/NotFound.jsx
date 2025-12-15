import React from 'react';
import { Link } from 'react-router';
import Navbar from './Navbar';

const NotFound = () => {
    return (
        <div>
        <Navbar></Navbar>
        <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-gray-100 to-gray-200 px-6">
          
        <h1 className="text-7xl md:text-9xl font-extrabold bg-linear-to-r from-red-500 to-pink-500 text-transparent bg-clip-text">404</h1>
        <p className="text-xl md:text-2xl text-gray-600 mt-4 mb-8 font-medium text-center">Oops! The page you’re looking for doesn’t exist.</p>

        <Link to="/" className="px-8 py-3 rounded-xl bg-linear-to-r from-teal-500 to-teal-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">Go Back Home
        </Link>
  
        </div>

        </div>
    );
};

export default NotFound;