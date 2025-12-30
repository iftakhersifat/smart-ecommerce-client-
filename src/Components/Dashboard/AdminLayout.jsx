import React from 'react';
import { NavLink, Outlet } from 'react-router';
import { FaBoxOpen, FaPlusCircle, FaShoppingCart, FaUsers, FaHome } from 'react-icons/fa';

const AdminLayout = () => {
    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-base-200">
            {/* Sidebar */}
            <div className="w-full md:w-64 bg-slate-900 text-white p-6">
                <h2 className="text-2xl font-black mb-10 text-indigo-400">Admin Panel</h2>
                <ul className="space-y-4 font-semibold">
                    <li><NavLink to="/admin/manage-products" className={({isActive}) => isActive ? "text-indigo-400 flex items-center gap-3" : "flex items-center gap-3 hover:text-indigo-300"}><FaBoxOpen /> Manage Products</NavLink></li>
                    <li><NavLink to="/admin/add-product" className={({isActive}) => isActive ? "text-indigo-400 flex items-center gap-3" : "flex items-center gap-3 hover:text-indigo-300"}><FaPlusCircle /> Add Product</NavLink></li>
                    <li><NavLink to="/admin/manage-orders" className={({isActive}) => isActive ? "text-indigo-400 flex items-center gap-3" : "flex items-center gap-3 hover:text-indigo-300"}><FaShoppingCart /> All Orders</NavLink></li>
                    <li><NavLink to="/manage-users" className={({isActive}) => isActive ? "text-indigo-400 flex items-center gap-3" : "flex items-center gap-3 hover:text-indigo-300"}><FaUsers /> Manage Users</NavLink></li>
                    <div className="divider bg-slate-700 h-[1px] my-6"></div>
                    <li><NavLink to="/" className="flex items-center gap-3"><FaHome /> Back to Home</NavLink></li>
                </ul>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-8">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;