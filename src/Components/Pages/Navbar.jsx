import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../Firebase/AuthProvider';
import toast from 'react-hot-toast';
import { FiSun, FiMoon, FiMenu, FiLogOut, FiUser, FiHeart, FiLayers, FiList, FiX } from 'react-icons/fi';
import { ShoppingBag, Info, PhoneCall, Home, LayoutGrid } from 'lucide-react';
import { FaUsersCog } from 'react-icons/fa';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [scrolled, setScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const html = document.querySelector('html');
    isDrawerOpen ? (html.style.overflow = 'hidden') : (html.style.overflow = 'unset');
    return () => { html.style.overflow = 'unset'; };
  }, [isDrawerOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.setAttribute("data-theme", theme);
    theme === "dark" ? root.classList.add("dark") : root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === "light" ? "dark" : "light"));

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success('Securely logged out');
        setIsDrawerOpen(false);
      })
      .catch((error) => toast.error(error.message));
  };

  const navStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 text-sm font-bold tracking-tight ${
      isActive ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none" : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-zinc-800"
    }`;

  const commonLinks = (
    <>
      <NavLink onClick={() => setIsDrawerOpen(false)} to="/" className={navStyle}><Home size={18}/> Home</NavLink>
      <NavLink onClick={() => setIsDrawerOpen(false)} to="/products-list" className={navStyle}><ShoppingBag size={18}/> Shop</NavLink>
      {user && (
        <>
          <NavLink onClick={() => setIsDrawerOpen(false)} to="/order-list" className={navStyle}><FiList size={18}/> Orders</NavLink>
          <NavLink onClick={() => setIsDrawerOpen(false)} to="/wishlist" className={navStyle}><FiHeart size={18}/> Wishlist</NavLink>
          <NavLink onClick={() => setIsDrawerOpen(false)} to="/compare" className={navStyle}><FiLayers size={18}/> Compare</NavLink>
        </>
      )}
    </>
  );

  return (
    <>
      <div className={`sticky top-0 z-[60] transition-all duration-500 ${
        scrolled ? "bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-zinc-800 py-3" : "bg-white dark:bg-zinc-950 lg:bg-transparent py-5"}`}>
        <div className="max-w-6xl mx-auto px-6 md:px-6 lg:px-0">
          <div className="flex items-center justify-between">
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsDrawerOpen(true)}
                className="lg:hidden p-2.5 rounded-xl bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-white active:scale-90 transition-transform">
                <FiMenu size={24} />
              </button>

              <Link to="/" className="flex items-center gap-2.5 group">
                <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg">
                  <ShoppingBag size={22} strokeWidth={2.5} />
                </div>
                <h1 className="text-xl font-black tracking-tighter text-slate-900 dark:text-white">
                  Smart<span className="text-indigo-600">Store</span>
                </h1>
              </Link>
            </div>

            <div className="hidden lg:flex bg-slate-100/50 dark:bg-zinc-900/50 p-1.5 rounded-2xl border border-slate-200/50 dark:border-white/5">
              <div className="flex items-center gap-1">{commonLinks}</div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              {/* Desktop Management Panel: Only for Admin and Employee */}
              {user && (user.role === 'admin' || user.role === 'employee') && (
                <Link 
                  to={user.role === 'admin' ? "/admin/manage-products" : "/employee/manage-products"}
                  className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 text-amber-600 rounded-xl text-[9px] font-black uppercase tracking-widest border border-amber-500/20">
                  <FaUsersCog size={12}/> {user.role} Panel
                </Link>
              )}

              <button onClick={toggleTheme} className="p-2.5 sm:p-3 rounded-xl bg-white dark:bg-zinc-900 text-slate-600 dark:text-yellow-400 border border-slate-200 dark:border-zinc-800 transition-all active:rotate-12">
                {theme === "light" ? <FiMoon size={20} /> : <FiSun size={20} />}
              </button>

              {user ? (
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="relative cursor-pointer">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden ring-2 ring-indigo-500/20 shadow-sm transition-transform active:scale-95">
                      <img className="w-full h-full object-cover" src={user?.photoURL || "https://i.ibb.co/mR9c97X/user.png"} alt="User" />
                    </div>
                  </div>
                  <ul tabIndex={0} className="mt-4 z-[1] p-2 shadow-2xl menu dropdown-content bg-white dark:bg-zinc-900 rounded-[1.5rem] w-64 border dark:border-zinc-800 animate-in fade-in slide-in-from-top-4">
                      <div className="bg-slate-50 dark:bg-zinc-800/50 m-2 px-4 py-3 rounded-xl text-center">
                        <p className="font-bold text-slate-900 dark:text-white truncate text-sm">{user?.displayName}</p>
                        <p className="text-[10px] text-slate-500 truncate uppercase tracking-widest font-black">{user?.role || "Customer"}</p>
                      </div>
                      <li><Link to="/profile" className="py-2.5 font-bold text-slate-600 dark:text-slate-300"><FiUser size={16}/> Profile</Link></li>
                      <div className="divider my-1 opacity-50"></div>
                      <button onClick={handleLogOut} className="w-full py-2.5 bg-rose-50 dark:bg-rose-500/10 text-rose-500 rounded-xl font-black text-[10px] uppercase tracking-widest">Sign Out</button>
                  </ul>
                </div>
              ) : (
                <Link to="/login" className="bg-indigo-600 text-white px-5 sm:px-7 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-indigo-600/20">Login</Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={`fixed inset-0 z-[100] transition-all duration-500 ${isDrawerOpen ? "visible opacity-100" : "invisible opacity-0"}`}>
        <div 
          className={`absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity duration-500 ${isDrawerOpen ? "opacity-100" : "opacity-0"}`} 
          onClick={() => setIsDrawerOpen(false)}></div>

        <div className={`absolute left-0 top-0 h-full w-[280px] sm:w-[320px] bg-white dark:bg-zinc-950 shadow-2xl transition-transform duration-500 ease-in-out ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="flex flex-col h-full">
            <div className="p-6 flex items-center justify-between border-b dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/50">
              <div className="flex items-center gap-2">
                <div className="bg-indigo-600 p-1.5 rounded-lg text-white shadow-md"><ShoppingBag size={18} /></div>
                <span className="font-black dark:text-white uppercase tracking-tighter">SmartStore</span>
              </div>
              <button onClick={() => setIsDrawerOpen(false)} className="p-2 rounded-xl bg-white dark:bg-zinc-800 dark:text-white shadow-sm ring-1 ring-slate-200 dark:ring-white/5 active:scale-90">
                <FiX size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
              {/* Drawer Management Panel: Only for Admin and Employee */}
              {user && (user.role === 'admin' || user.role === 'employee') && (
                <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
                  <p className="text-[10px] font-black uppercase text-amber-600 tracking-[0.2em] mb-3">Management Access</p>
                  <NavLink 
                    onClick={() => setIsDrawerOpen(false)} 
                    to={user.role === 'admin' ? "/admin/manage-products" : "/employee/manage-products"} 
                    className="flex items-center gap-3 px-4 py-3 bg-amber-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-amber-500/20"
                  >
                    <LayoutGrid size={18}/> {user.role === 'admin' ? "Admin Dashboard" : "Employee Dashboard"}
                  </NavLink>
                </div>
              )}

              <p className="text-[10px] font-black uppercase text-slate-400 px-4 py-2 tracking-widest">Main Menu</p>
              <div className="flex flex-col space-y-1">{commonLinks}</div>
              
              <div className="divider opacity-10"></div>
              <p className="text-[10px] font-black uppercase text-slate-400 px-4 py-2 tracking-widest">Support</p>
              <NavLink onClick={() => setIsDrawerOpen(false)} to="/about" className={navStyle}><Info size={18}/> About Us</NavLink>
              <NavLink onClick={() => setIsDrawerOpen(false)} to="/contact" className={navStyle}><PhoneCall size={18}/> Contact Support</NavLink>
            </div>

            {user && (
              <div className="p-6 bg-slate-50 dark:bg-zinc-900/50 border-t dark:border-zinc-800 mt-auto">
                <div className="flex items-center gap-3 mb-6 px-2">
                  <img className="w-10 h-10 rounded-xl object-cover ring-2 ring-white dark:ring-zinc-800 shadow-md" src={user?.photoURL} alt="User" />
                  <div className="overflow-hidden">
                    <p className="font-bold text-sm dark:text-white truncate">{user?.displayName}</p>
                    <p className="text-[10px] text-slate-500 truncate uppercase font-black">{user?.role}</p>
                  </div>
                </div>
                <button 
                  onClick={handleLogOut}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-rose-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-rose-500/20 active:scale-95 transition-all"
                >
                  <FiLogOut /> Sign Out Securely
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;