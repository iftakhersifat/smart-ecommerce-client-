import React, { useState, useRef, useEffect, useContext } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router';
import { FaBoxOpen, FaPlusCircle, FaShoppingCart, FaUsers, FaHome, FaChevronLeft, FaChevronRight, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { RiAdminFill } from "react-icons/ri";
import { AuthContext } from '../Firebase/AuthProvider';
import { LuBotMessageSquare } from "react-icons/lu";


const AdminLayout = () => {
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
            console.error("Logout error", error);
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
        { path: "/admin/manage-products", label: "Inventory", icon: <FaBoxOpen /> },
        { path: "/admin/add-product", label: "Add Product", icon: <FaPlusCircle /> },
        { path: "/admin/manage-orders", label: "All Orders", icon: <FaShoppingCart /> },
        { path: "/admin/manage-users", label: "User Management", icon: <FaUsers /> },
        { path: "/admin/messages", label: "Messages", icon: <LuBotMessageSquare /> },
    ];

    const navLinkStyles = ({ isActive }) => 
        `flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 ${
            isActive ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "text-slate-500 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-white"}`;

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-[#0b0e14] transition-colors duration-500">
            
            {/* Sidebar */}
            <aside className={`fixed md:sticky top-0 h-screen bg-white dark:bg-[#11141b] border-r border-slate-200 dark:border-white/5 transition-all duration-500 z-50 
                ${isExpanded ? "w-72" : "w-20"} 
                ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
                
                <button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="hidden md:flex absolute -right-3 top-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 w-6 h-6 rounded-full items-center justify-center text-[10px] shadow-md z-50 hover:scale-110 transition-transform cursor-pointer">
                    {isExpanded ? <FaChevronLeft className="text-slate-500" /> : <FaChevronRight className="text-slate-500" />}
                </button>

                <div className="flex flex-col h-full p-4">
                    {/* Logo */}
                    <div className={`flex items-center gap-3 mb-10 mt-2 px-2 ${!isExpanded && "md:justify-center"}`}>
                        <div className="min-w-[40px] h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-xl shadow-indigo-600/30">
                            <RiAdminFill size={20} />
                        </div>
                        {isExpanded && (
                            <div className="overflow-hidden">
                                <h2 className="text-xl font-black dark:text-white tracking-tighter italic">Admin<span className="text-indigo-600">Core</span></h2>
                            </div>
                        )}
                    </div>

                    <nav className="flex-1 space-y-2 overflow-y-auto no-scrollbar">
                        {menuItems.map((item) => (
                            <NavLink key={item.path} to={item.path} onClick={() => setIsMobileMenuOpen(false)} className={navLinkStyles}>
                                <span className="text-xl min-w-[24px]">{item.icon}</span>
                                {isExpanded && <span className="text-sm font-bold tracking-tight">{item.label}</span>}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Footer */}
                    <div className="relative mt-auto pt-4 border-t border-slate-100 dark:border-white/5" ref={profileRef}>
                        <button 
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className={`w-full flex items-center gap-3 p-2 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-all cursor-pointer ${!isExpanded && "md:justify-center"}`}>
                            {user?.photoURL ? (
                                <img src={user.photoURL} alt="admin" className="w-10 h-10 rounded-xl object-cover ring-2 ring-indigo-600/10" />) : (
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

                        {/* popover menu */}
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

            {/* Overlay */}
            {isMobileMenuOpen && (
                <div 
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-300"/>
            )}

            {/* main content*/}
            <main className="flex-1 flex flex-col min-w-0">
                <header className="h-16  md:hidden lg:fixed flex items-center justify-between px-6 bg-white/80 dark:bg-[#0b0e14]/80 backdrop-blur-md border-b border-slate-200 dark:border-white/5 sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setIsMobileMenuOpen(true)} 
                            className="md:hidden p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400">
                            <FaBars size={18} />
                        </button>
                    </div>
                    
                </header>

                {/* pages */}
                <div className="p-4 md:p-10 flex-1">
                    <div className="max-w-7xl mx-auto">
                         <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;