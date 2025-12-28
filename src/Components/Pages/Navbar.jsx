import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../Firebase/AuthProvider';
import toast from 'react-hot-toast';
import { FiSun, FiMoon } from 'react-icons/fi';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  
  // --- Theme Logic ---
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
    } else {
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  const handleLogOut = () => {
    logOut()
      .then(() => toast.success('Logout successfully!'))
      .catch((error) => toast.error(error.message || "Log out failed"));
  };

  const navStyle = ({ isActive }) => 
    isActive 
      ? "text-indigo-600 dark:text-indigo-400 font-semibold underline decoration-2 underline-offset-4" 
      : "text-gray-600 dark:text-gray-300 font-medium hover:text-indigo-600 transition";

  const links = (
    <>
      <li><NavLink to="/" className={navStyle}>Home</NavLink></li>
      <li><NavLink to="/products-list" className={navStyle}>Products/Services</NavLink></li>
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
    <div className="sticky top-0 z-50 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border-b border-gray-200 dark:border-zinc-800 transition-colors duration-300">
      <div className="navbar max-w-6xl mx-auto px-6">

        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden dark:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h10m-10 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 w-52 rounded-xl bg-white dark:bg-zinc-800 shadow-lg border dark:border-zinc-700 z-[1]">
              {links}
              <li>
                <details>
                  <summary className="dark:text-gray-300">More</summary>
                  <ul className="p-2">{moreLinks}</ul>
                </details>
              </li>
            </ul>
          </div>

          <h1 className="text-xl md:text-2xl font-bold tracking-wide text-indigo-600 dark:text-indigo-400">
            Smart<span className="text-gray-800 dark:text-white">E-Commerce</span>
          </h1>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-4 px-1">
            {links}
            <li>
              <details>
                <summary className="cursor-pointer text-gray-700 dark:text-gray-300 hover:text-indigo-600">
                  More
                </summary>
                <ul className="p-2 bg-white dark:bg-zinc-800 rounded-xl shadow-lg w-40 border dark:border-zinc-700">
                  {moreLinks}
                </ul>
              </details>
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="navbar-end gap-2 md:gap-4">
          {/* toggle */}
          <button 
            onClick={toggleTheme} 
            className="btn btn-ghost btn-circle text-gray-600 dark:text-yellow-400 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all duration-300"
            title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
          >
            {theme === "light" ? <FiMoon size={20} /> : <FiSun size={20} />}
          </button>

          {/* login or logout button*/}
          {user ? (
            <button 
              onClick={handleLogOut} 
              className='btn bg-gradient-to-r from-red-500 to-pink-500 border-none text-white px-5 rounded-xl font-medium shadow-md hover:shadow-lg transition-transform active:scale-95'
            >
              Log Out
            </button>
          ) : (
            <NavLink 
              to="/login"
              className="btn bg-gradient-to-r from-blue-500 to-indigo-600 border-none text-white px-6 rounded-xl font-medium shadow-md hover:shadow-lg transition-transform active:scale-95" 
            >
              Login
            </NavLink>
          )}
        </div>

      </div>
    </div>
  );
};

export default Navbar;