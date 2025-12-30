import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../Firebase/AuthProvider';
import toast from 'react-hot-toast';
import { FiSun, FiMoon, FiMenu, FiLogOut, FiUser, FiSettings } from 'react-icons/fi';
import { LayoutDashboard, ShoppingBag, Info, PhoneCall } from 'lucide-react';
import { FaUsersCog } from 'react-icons/fa';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const root = window.document.documentElement;
    root.setAttribute("data-theme", theme);
    theme === "dark" ? root.classList.add("dark") : root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === "light" ? "dark" : "light"));

  const handleLogOut = () => {
    logOut()
      .then(() => toast.success('Logged out successfully!'))
      .catch((error) => toast.error(error.message));
  };

  const navStyle = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 text-sm font-semibold ${
      isActive
        ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-none"
        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800"
    }`;

  const commonLinks = (
    <>
      <li><NavLink to="/" className={navStyle}>Home</NavLink></li>
      <li><NavLink to="/products-list" className={navStyle}><ShoppingBag size={16}/> Shop</NavLink></li>
      {user && <li><NavLink to="/order-list" className={navStyle}><LayoutDashboard size={16}/> My Orders</NavLink></li>}
    </>
  );

  const roleBasedLinks = (
    <>
      {user && user.role === 'admin' && (
        <>
          <li><NavLink to="/manage-users" className={navStyle}><FaUsersCog size={16} /> Manage Users</NavLink></li>
          <li><NavLink to="/admin/manage-products" className={`${navStyle} text-red-500`}>Admin Panel</NavLink></li>
        </>
      )}
      {user && user.role === 'employee' && (
        <li><NavLink to="/admin/manage-products" className={`${navStyle} text-amber-500`}>Employee Panel</NavLink></li>
      )}
    </>
  );

  return (
    <div className="sticky top-0 z-50 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border-b border-gray-100 dark:border-zinc-800 transition-all duration-300">
      <div className="navbar max-w-7xl mx-auto px-4 lg:px-6 h-20">
        
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden dark:text-white mr-2 p-0">
              <FiMenu size={24} />
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-4 z-[1] p-4 shadow-2xl bg-white dark:bg-zinc-800 rounded-3xl w-72 border dark:border-zinc-700 space-y-2">
              <div className="px-4 py-2 mb-2 border-b dark:border-zinc-700">
                <p className="text-xs font-black uppercase tracking-widest text-indigo-600">Navigation</p>
              </div>
              {commonLinks}
              {roleBasedLinks}
              <div className="divider opacity-50"></div>
              <li><NavLink to="/about" className={navStyle}><Info size={16}/> About</NavLink></li>
              <li><NavLink to="/contact" className={navStyle}><PhoneCall size={16}/> Contact</NavLink></li>
            </ul>
          </div>

          <NavLink to="/" className="flex items-center gap-2 group">
            <div className="bg-indigo-600 p-2 rounded-xl text-white group-hover:rotate-12 transition-transform shadow-lg shadow-indigo-200 dark:shadow-none">
              <ShoppingBag size={22} strokeWidth={2.5} />
            </div>
            <h1 className="text-xl md:text-2xl font-black tracking-tighter dark:text-white">
              Smart<span className="text-indigo-600">Store</span>
            </h1>
          </NavLink>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="flex items-center gap-2 px-1">
            {commonLinks}
            {roleBasedLinks}
          </ul>
        </div>

        <div className="navbar-end gap-2 md:gap-4">
          <button 
            onClick={toggleTheme} 
            className="p-3 rounded-2xl bg-gray-50 dark:bg-zinc-800 text-gray-600 dark:text-yellow-400 hover:ring-2 ring-indigo-500/20 transition-all active:scale-95"
          >
            {theme === "light" ? <FiMoon size={20} /> : <FiSun size={20} />}
          </button>

          {user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ring-2 ring-indigo-500/20 p-0.5 hover:ring-indigo-500/50 transition-all">
                <div className="w-10 rounded-full overflow-hidden">
                  <img alt="Profile" src={user?.photoURL || "https://i.ibb.co/mR9c97X/user.png"} />
                </div>
              </div>
              <ul tabIndex={0} className="mt-4 z-[1] p-3 shadow-2xl menu dropdown-content bg-white dark:bg-zinc-800 rounded-[2rem] w-64 border dark:border-zinc-700 overflow-hidden">
                <div className="bg-indigo-50 dark:bg-indigo-900/20 px-5 py-4 rounded-[1.5rem] mb-2">
                  <p className="font-black text-slate-900 dark:text-white truncate">{user?.displayName}</p>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                    Role: {user?.role || "Customer"}
                  </span>
                </div>
                <li><Link to="/profile" className="py-3 px-4 font-semibold text-slate-600 dark:text-slate-300"><FiUser size={18} className="mr-2 text-indigo-500"/> Profile</Link></li>
                <li><Link to="/settings" className="py-3 px-4 font-semibold text-slate-600 dark:text-slate-300"><FiSettings size={18} className="mr-2 text-indigo-500"/> Settings</Link></li>
                <li className="mt-2 pt-2 border-t dark:border-zinc-700">
                  <button onClick={handleLogOut} className="text-rose-500 hover:text-rose-600 font-bold py-3 px-4">
                    <FiLogOut size={18} className="mr-2"/> Log Out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link 
              to="/login"
              className="btn bg-indigo-600 border-none text-white hover:bg-indigo-700 px-6 rounded-2xl font-bold uppercase tracking-widest text-xs shadow-lg shadow-indigo-100 dark:shadow-none h-12 transition-all active:scale-95" 
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;