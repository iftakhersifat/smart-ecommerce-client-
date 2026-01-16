import React, { useState, useRef, useEffect, useContext } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router';
import { FaBoxOpen, FaPlusCircle, FaShoppingCart, FaHome, FaChevronLeft, FaChevronRight, FaSignOutAlt, FaUserCircle, FaBars } from 'react-icons/fa';
import { RiLayoutGridFill } from "react-icons/ri";
import { AuthContext } from '../Firebase/AuthProvider';

const EmployeeLayout = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isExpanded, setIsExpanded] = useState(true);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const profileRef = useRef(null);


    const handleLogout = async () => {
        try {
            await logOut();
            navigate('/login');
        } catch (error) {
            console.error("Logout failed", error);
        }
    };


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const menuItems = [
        { path: "/employee/manage-products", label: "Inventory", icon: <FaBoxOpen /> },
        { path: "/employee/add-product", label: "Add Product", icon: <FaPlusCircle /> },
        { path: "/employee/manage-orders", label: "All Orders", icon: <FaShoppingCart /> },
    ];

    const navLinkStyles = ({ isActive }) => 
        `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
            isActive 
            ? "bg-indigo-600 dark:bg-cyan-600 text-white shadow-lg" 
            : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-cyan-400"
        }`;

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-[#0b0e14]">
            
            {/* Sidebar (Desktop) */}
            <aside className={`fixed md:sticky top-0 h-screen bg-white dark:bg-[#11141b] border-r border-slate-200 dark:border-white/5 transition-all duration-500 z-50 
                ${isExpanded ? "w-72" : "w-20"} 
                ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
            `}>
                
                {/* Collapse Button (Desktop only) */}
                <button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="hidden md:flex absolute -right-3 top-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 w-6 h-6 rounded-full items-center justify-center text-[10px] shadow-sm z-50 hover:bg-indigo-600 hover:text-white transition-all cursor-pointer"
                >
                    {isExpanded ? <FaChevronLeft /> : <FaChevronRight />}
                </button>

                <div className="flex flex-col h-full p-4">
                    {/* Logo */}
                    <div className={`flex items-center gap-3 mb-10 mt-2 px-2 ${!isExpanded && "md:justify-center"}`}>
                        <div className="min-w-[40px] h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
                            <RiLayoutGridFill size={20} />
                        </div>
                        {isExpanded && <h2 className="text-xl font-black dark:text-white tracking-tighter">Employee<span className="text-indigo-600">Panel</span></h2>}
                    </div>

                    {/* Nav Items */}
                    <nav className="flex-1 space-y-2">
                        {menuItems.map((item) => (
                            <NavLink key={item.path} to={item.path} onClick={() => setIsMobileMenuOpen(false)} className={navLinkStyles}>
                                <span className="text-xl">{item.icon}</span>
                                {isExpanded && <span className="text-sm font-bold">{item.label}</span>}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Footer - Dynamic User Profile */}
                    <div className="relative mt-auto pt-4 border-t border-slate-100 dark:border-white/5" ref={profileRef}>
                                            <button 
                                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                                className={`w-full flex items-center gap-3 p-2 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-all cursor-pointer ${!isExpanded && "md:justify-center"}`}
                                            >
                                                {user?.photoURL ? (
                                                    <img src={user.photoURL} alt="admin" className="w-10 h-10 rounded-xl object-cover ring-2 ring-indigo-600/10" />
                                                ) : (
                                                    <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-xl flex items-center justify-center font-black">
                                                        {user?.displayName?.charAt(0) || "A"}
                                                    </div>
                                                )}
                                                
                                                {isExpanded && (
                                                    <div className="text-left overflow-hidden">
                                                        <p className="text-xs font-black dark:text-white truncate">{user?.displayName || "Super Admin"}</p>
                                                        <p className="text-[9px] text-indigo-500 font-black uppercase tracking-widest">{user?.role || "Administrator"}</p>
                                                    </div>
                                                )}
                                            </button>
                    
                                            {/* ChatGPT-style Popover Menu */}
                                            {isProfileOpen && (
                                                <div className="absolute bottom-full left-0 mb-3 w-60 bg-white dark:bg-[#1c212c] border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl p-2 animate-in slide-in-from-bottom-2 duration-300 z-[60]">
                                                    <div className="px-3 py-2 border-b border-slate-100 dark:border-white/5 mb-1">
                                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Control Panel</p>
                                                    </div>
                                                    <button onClick={() => navigate('/')} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all">
                                                        <FaHome className="text-indigo-500" /> View Storefront
                                                    </button>
                                                    <div className="h-[1px] bg-slate-100 dark:bg-white/5 my-1"></div>
                                                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all">
                                                        <FaSignOutAlt /> Log Out System
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                </div>
            </aside>

            {/* Mobile Header Overlay */}
            {isMobileMenuOpen && (
                <div onClick={() => setIsMobileMenuOpen(false)} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden" />
            )}

            {/* Main Content Area */}
            <main className="flex-1 min-w-0">
                <header className="h-16  md:hidden lg:fixed flex items-center justify-between px-6 bg-white/80 dark:bg-[#0b0e14]/80 backdrop-blur-md sticky top-0 border-b border-slate-200 dark:border-white/5 z-40">
                    <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden p-2 text-slate-600 dark:text-slate-300">
                        <FaBars size={20} />
                    </button>
                </header>

                <div className="p-6 md:p-10 max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default EmployeeLayout;