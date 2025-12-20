import React, { useContext } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../Firebase/AuthProvider';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => toast.success('Logout successfully!'))
      .catch((error) => toast.error(error.message || "Log out failed"));
  };

  const navStyle = ({ isActive }) => isActive ? "text-indigo-600 font-semibold":"text-gray-600 font-medium hover:text-indigo-600 transition";

  const links = (
    <>
      <li><NavLink to="/" className={navStyle}>Home</NavLink></li>
      <li><NavLink to="/products" className={navStyle}>Products/Services</NavLink></li>
      <li><NavLink to="/dashboard" className={navStyle}>Dashboard</NavLink></li>
    </>
  );

  const moreLinks = (
    <>
      <li><NavLink to="/about" className={navStyle}>About Us</NavLink></li>
      <li><NavLink to="/contact" className={navStyle}>Contact</NavLink></li>
    </>
  );

  return (
    <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="navbar max-w-6xl mx-auto px-6">

        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h10m-10 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 w-52 rounded-xl bg-white shadow-lg border">
              {links}
              <li>
                <details>
                  <summary>More</summary>
                  <ul className="p-2">{moreLinks}</ul>
                </details>
              </li>
            </ul>
          </div>

          <h1 className="text-2xl font-bold tracking-wide text-indigo-600">
            Smart<span className="text-gray-800">E-Commerce</span>
          </h1>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-4">
            {links}
            <li>
              <details>
                <summary className="cursor-pointer text-gray-700 hover:text-indigo-600">
                  More
                </summary>
                <ul className="p-2 bg-white rounded-xl shadow-lg w-40">
                  {moreLinks}
                </ul>
              </details>
            </li>
          </ul>
        </div>

        {/* Right */}
        <div className="navbar-end">
          {user? <> <button onClick={handleLogOut} className='btn bg-linear-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 shadow-md hover:shadow-lg text-white px-4 py-1 rounded-xl font-medium hover:bg-red-600 transition'>Log Out</button></> : <> <NavLink className="bg-linear-to-r from-blue-500 to-indigo-600 shadow-lg hover:shadow-xl text-white px-4 py-1 rounded-lg font-medium hover:bg-blue-700" to="/login">Login</NavLink> </>}
        </div>

      </div>
    </div>
  );
};

export default Navbar;
