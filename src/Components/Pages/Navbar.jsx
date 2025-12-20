import React from 'react';
import { NavLink } from 'react-router';

const Navbar = () => {
    const links = <>
    <li><NavLink to="/" className={({isActive})=> isActive ? 'text-blue-600 font-medium underline' : 'hover:text-indigo-500 font-medium transition'}>Home</NavLink></li>
    </>
    const moreLinks = <>
    <li><NavLink to="/about" className={({isActive})=> isActive ? 'text-blue-600 font-medium underline' : 'hover:text-indigo-500 font-medium transition'}>About Us</NavLink></li>
    </>
    return (
        <div className="shadow-md sticky top-0 z-50 bg-white">
            <div className="navbar max-w-6xl mx-auto px-6 md:px-6 lg:px-0">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {links}
        <li>
          <a>More</a>
          <ul className="p-2">
            {moreLinks}
          </ul>
        </li>
      </ul>
    </div>
    <h1 className="btn btn-ghost text-xl text-indigo-500">Smart E-Commerce</h1>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {links}
      <li>
        <details>
          <summary>More</summary>
          <ul className="p-2 bg-base-100 w-40 z-1">
            {moreLinks}
          </ul>
        </details>
      </li>
    </ul>
  </div>
  <div className="navbar-end">
    <NavLink className="bg-linear-to-r from-blue-500 to-indigo-600 shadow-lg hover:shadow-xl text-white px-4 py-1 rounded-lg font-medium hover:bg-blue-700" to="/login">Login</NavLink>
  </div>
</div>
        </div>
    );
};

export default Navbar;