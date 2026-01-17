import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { 
    FaSearch, FaTruck, FaCheckCircle, FaClock, 
    FaTimesCircle, FaSync, FaBox, FaDollarSign, FaShoppingCart 
} from 'react-icons/fa';

const ManageOrders = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = () => {
        setLoading(true);
        axios.get('https://smart-ecommerce-server.vercel.app/all-orders')
            .then(res => {
                setOrders(res.data);
                setFilteredOrders(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    useEffect(() => {
        const result = orders.filter(order =>
            order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.productName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredOrders(result);
    }, [searchTerm, orders]);

    const stats = {
        total: orders.length,
        pending: orders.filter(o => o.status === 'Pending').length,
        delivered: orders.filter(o => o.status === 'Delivered').length,
        revenue: orders.reduce((sum, o) => sum + (parseFloat(o.totalPrice) || 0), 0)
    };

    const updateStatus = (id, newStatus) => {
        axios.patch(`https://smart-ecommerce-server.vercel.app/orders/${id}`, { status: newStatus })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                    });
                    Toast.fire({ icon: 'success', title: `Status set to ${newStatus}` });
                    setOrders(orders.map(o => o._id === id ? { ...o, status: newStatus } : o));
                }
            });
    };

    return (
        <div className="min-h-screen p-4 lg:p-10 transition-colors duration-300">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Orders Hub</h2>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">Fulfill orders and manage logistics efficiently.</p>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={fetchOrders} className="btn btn-md bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800">
                            <FaSync className={loading ? "animate-spin" : ""} /> Refresh
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard icon={<FaShoppingCart />} label="Total Orders" value={stats.total} color="blue" />
                    <StatCard icon={<FaClock />} label="Pending" value={stats.pending} color="amber" />
                    <StatCard icon={<FaCheckCircle />} label="Delivered" value={stats.delivered} color="emerald" />
                    
                </div>

                {/* search & filter */}
                <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-4 items-center">
                    <div className="relative flex-1 w-full">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Quick search by email, order ID, or product..." 
                            className="input w-full pl-12 bg-slate-50 dark:bg-slate-800/50 border-transparent focus:border-indigo-500 rounded-2xl transition-all"
                            onChange={(e) => setSearchTerm(e.target.value)}/>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="table w-full border-separate border-spacing-0">
                            <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 uppercase text-[11px] font-bold tracking-widest">
                                <tr>
                                    <th className="py-6 px-8">Customer</th>
                                    <th className="py-6">Product & Amount</th>
                                    <th className="py-6">Status</th>
                                    <th className="py-6 text-center">Management Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {loading ? (
                                    <tr><td colSpan="4" className="py-20 text-center"><span className="loading loading-bars loading-lg text-indigo-600"></span></td></tr>
                                ) : filteredOrders.map(order => (
                                    <tr key={order._id} className="group hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-all duration-200">
                                        <td className="py-6 px-8">
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-500">
                                                    {order.customerEmail.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="text-slate-900 dark:text-slate-200 font-bold group-hover:text-indigo-600 transition-colors">{order.customerEmail}</div>
                                                    <div className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">ID: #{order._id.slice(-6)}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-6">
                                            <div className="flex flex-col">
                                                <span className="text-slate-700 dark:text-slate-300 font-semibold">{order.productName}</span>
                                                <span className="text-indigo-600 dark:text-indigo-400 font-black text-lg">${order.totalPrice}</span>
                                            </div>
                                        </td>
                                        <td className="py-6">
                                            <StatusBadge status={order.status} />
                                        </td>
                                        <td className="py-6">
                                            <div className="flex justify-center">
                                                <select 
                                                    className="select select-sm bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-xs font-bold rounded-xl focus:ring-2 focus:ring-indigo-500 shadow-sm transition-all" 
                                                    onChange={(e) => updateStatus(order._id, e.target.value)}
                                                    defaultValue={order.status}>
                                                    <option value="Pending">Pending</option>
                                                    <option value="Shipped">Shipped</option>
                                                    <option value="Delivered">Delivered</option>
                                                    <option value="Cancelled">Cancelled</option>
                                                </select>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ icon, label, value, color }) => (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-5 group hover:shadow-md transition-all">
        <div className={`p-4 bg-${color}-50 dark:bg-${color}-900/20 text-${color}-600 dark:text-${color}-400 rounded-2xl group-hover:scale-110 transition-transform`}>
            {React.cloneElement(icon, { size: 24 })}
        </div>
        <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white">{value}</p>
        </div>
    </div>
);

const StatusBadge = ({ status }) => {
    const styles = {
        Delivered: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400 border-emerald-100',
        Shipped: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-blue-100',
        Pending: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400 border-amber-100',
        Cancelled: 'bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400 border-rose-100'
    };
    return (
        <span className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border ${styles[status]}`}>
            {status}
        </span>
    );
};

export default ManageOrders;