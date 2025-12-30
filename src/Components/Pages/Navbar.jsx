import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../Firebase/AuthProvider';
import toast from 'react-hot-toast';
import { FiSun, FiMoon, FiMenu, FiX, FiLogOut, FiUser, FiSettings } from 'react-icons/fi';
import { ShieldCheck, LayoutDashboard, ShoppingBag, Info, PhoneCall } from 'lucide-react';
import { FaUsersCog } from 'react-icons/fa';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // --- Theme Management ---
  useEffect(() => {
    const root = window.document.documentElement;
    root.setAttribute("data-theme", theme);
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === "light" ? "dark" : "light"));

  const handleLogOut = () => {
    logOut()
      .then(() => toast.success('Logged out successfully!'))
      .catch((error) => toast.error(error.message));
  };

  // --- NavLink Styling ---
  const navStyle = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
      isActive
        ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 font-bold"
        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800"
    }`;

  // --- Shared Links ---
  const commonLinks = (
    <>
      <li><NavLink to="/" className={navStyle}>Home</NavLink></li>
      <li><NavLink to="/products-list" className={navStyle}><ShoppingBag size={18}/> Shop</NavLink></li>
      <li><NavLink to="/order-list" className={navStyle}><LayoutDashboard size={18}/> My Orders</NavLink></li>
    </>
  );

  // --- Admin & Employee Specific Links ---
  const roleBasedLinks = (
    <>
      {/* Admin specific links */}
      {user?.role === 'admin' && (
        <li>
          <NavLink to="/manage-users" className={navStyle}>
            <FaUsersCog size={18} className="text-error" /> <span>Manage Users</span>
          </NavLink>
        </li>
      )}

{/* Logged in User check */}
{user && (
  <>
    {/* Jodi Admin ba Employee hoy, tobe Admin Panel dekhabe */}
    {(user.role === 'admin' || user.role === 'employee') ? (
      <li><Link to="/admin/manage-products" className="text-red-500 font-bold">Admin Panel</Link></li>
    ) : (
      /* Jodi normal user hoy, tobe My Orders dekhabe */
      <li><Link to="/dashboard">My Orders</Link></li>
    )}
  </>
)}
    </>
  );

  return (
    <div className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-900/90 backdrop-blur-lg border-b border-gray-200 dark:border-zinc-800 transition-colors duration-300">
      <div className="navbar max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Navbar Start: Logo & Mobile Menu */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden dark:text-white">
              <FiMenu size={24} />
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-2xl bg-white dark:bg-zinc-800 rounded-2xl w-64 border dark:border-zinc-700 space-y-2">
              {commonLinks}
              <div className="divider my-1"></div>
              {roleBasedLinks}
              <div className="divider my-1"></div>
              <li><NavLink to="/about" className={navStyle}><Info size={16}/> About Us</NavLink></li>
              <li><NavLink to="/contact" className={navStyle}><PhoneCall size={16}/> Contact</NavLink></li>
            </ul>
          </div>

          <NavLink to="/" className="flex items-center gap-2 group">
            <div className="bg-indigo-600 p-2 rounded-xl text-white group-hover:rotate-12 transition-transform shadow-lg shadow-indigo-200 dark:shadow-none">
              <ShoppingBag size={20} />
            </div>
            <h1 className="text-xl md:text-2xl font-black tracking-tighter dark:text-white">
              Smart<span className="text-indigo-600">Store</span>
            </h1>
          </NavLink>
        </div>

        {/* Navbar Center: Desktop Links */}
        <div className="navbar-center hidden lg:flex">
          <ul className="flex items-center gap-2 px-1">
            {commonLinks}
            {roleBasedLinks}
          </ul>
        </div>

        {/* Navbar End: Icons & Profile */}
        <div className="navbar-end gap-3">
          
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme} 
            className="p-2.5 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-yellow-400 hover:scale-110 transition-all active:scale-90"
          >
            {theme === "light" ? <FiMoon size={20} /> : <FiSun size={20} />}
          </button>

          {user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border-2 border-indigo-500/30 p-0.5">
                <div className="w-10 rounded-full">
                  <img alt="User profile" src={user?.photoURL || "https://i.ibb.co/mR9c97X/user.png"} />
                </div>
              </div>
              <ul tabIndex={0} className="mt-3 z-[1] p-3 shadow-xl menu menu-sm dropdown-content bg-white dark:bg-zinc-800 rounded-2xl w-56 border dark:border-zinc-700">
                <div className="px-4 py-3 border-b dark:border-zinc-700 mb-2">
                  <p className="font-bold text-sm truncate">{user?.displayName}</p>
                  <p className="text-xs opacity-60 truncate capitalize">Role: {user?.role || "User"}</p>
                </div>
                <li><a className="py-3 px-4"><FiUser className="mr-2"/> Profile</a></li>
                <li><a className="py-3 px-4"><FiSettings className="mr-2"/> Settings</a></li>
                <li className="mt-2 pt-2 border-t dark:border-zinc-700">
                  <button onClick={handleLogOut} className="text-error font-bold py-3 px-4">
                    <FiLogOut className="mr-2"/> Log Out
                  </button>
                </li>
              </ul>
            </div>
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