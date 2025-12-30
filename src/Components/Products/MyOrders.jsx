import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { FaTrash, FaEdit, FaRegClock, FaCheckCircle, FaTruck, FaTimesCircle, FaBoxOpen, FaFilter } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import { AuthContext } from '../Firebase/AuthProvider';

const MyOrders = () => {
    const { user } = useContext(AuthContext);
    const [myOrders, setMyOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('All'); // Filter State
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            if (user?.email) {
                try {
                    setLoading(true);
                    const response = await axios.get(`http://localhost:5000/my-orders?email=${user.email}`);
                    setMyOrders(response.data);
                } catch (error) {
                    console.error("Error fetching orders:", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchOrders();
    }, [user]);

    // Filter Logic
    const filteredOrders = activeTab === 'All' 
        ? myOrders 
        : myOrders.filter(order => order.status === activeTab);

    // Dynamic Filter Tabs Configuration
    const tabs = [
        { name: 'All', icon: <FaBoxOpen /> },
        { name: 'Pending', icon: <FaRegClock /> },
        { name: 'Shipped', icon: <FaTruck /> },
        { name: 'Delivered', icon: <FaCheckCircle /> },
        { name: 'Cancelled', icon: <FaTimesCircle /> },
    ];

    const handleCancel = async (id, status) => {
        if (status !== 'Pending') {
            return Swal.fire({
                title: "Action Restricted",
                text: `Order is already ${status}.`,
                icon: "info",
                confirmButtonColor: "#3B82F6"
            });
        }

        const result = await Swal.fire({
            title: "Cancel Order?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#EF4444",
            cancelButtonColor: "#64748B",
            confirmButtonText: "Yes, Cancel it",
            customClass: { popup: 'rounded-[2rem]' }
        });

        if (result.isConfirmed) {
            try {
                const response = await axios.delete(`http://localhost:5000/orders/${id}`);
                if (response.data.deletedCount > 0) {
                    setMyOrders(myOrders.filter(order => order._id !== id));
                    Swal.fire("Cancelled", "Order removed successfully.", "success");
                }
            } catch (error) {
                Swal.fire("Error", "Could not delete order.", "error");
            }
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Pending': return "bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20";
            case 'Shipped': return "bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20";
            case 'Delivered': return "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20";
            default: return "bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20";
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Pending': return <FaRegClock className="animate-spin-slow" />;
            case 'Shipped': return <FaTruck className="animate-bounce" />;
            case 'Delivered': return <FaCheckCircle />;
            default: return <FaTimesCircle />;
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <span className="loading loading-ring loading-lg text-primary"></span>
            <p className="mt-4 font-black text-slate-400 uppercase tracking-widest text-[10px]">Filtering Orders...</p>
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
                <div className="space-y-2 text-center lg:text-left">
                    <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">My Orders</h2>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">History & Tracking</p>
                </div>

                <div className="flex items-center gap-8 bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div className="text-center border-r dark:border-slate-800 pr-8">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total</p>
                        <p className="text-3xl font-black dark:text-white">{myOrders.length}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Investment</p>
                        <p className="text-3xl font-black text-primary">${myOrders.reduce((acc, curr) => acc + parseFloat(curr.totalPrice), 0).toFixed(0)}</p>
                    </div>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-10 bg-slate-100/50 dark:bg-slate-800/50 p-2 rounded-[1.5rem] backdrop-blur-sm w-fit">
                {tabs.map((tab) => (
                    <button
                        key={tab.name}
                        onClick={() => setActiveTab(tab.name)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                            activeTab === tab.name 
                            ? "bg-white dark:bg-slate-700 text-primary shadow-md scale-105" 
                            : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                        }`}
                    >
                        {tab.icon}
                        {tab.name}
                    </button>
                ))}
            </div>

            {/* Orders Feed */}
            <div className="grid gap-8">
                {filteredOrders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 bg-slate-50 dark:bg-slate-900/40 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
                        <FaBoxOpen className="text-6xl text-slate-200 mb-6" />
                        <h3 className="text-xl font-black text-slate-900 dark:text-white">No {activeTab} Orders</h3>
                        <p className="text-slate-500 mt-2">There are no items currently in this category.</p>
                    </div>
                ) : (
                    filteredOrders.map(order => (
                        <div key={order._id} className="group relative bg-white dark:bg-slate-900 rounded-[2.5rem] p-2 pr-6 border border-slate-100 dark:border-slate-800 transition-all hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>

                            <div className="flex flex-col lg:flex-row items-center gap-8 relative z-10">
                                <div className="w-full lg:w-44 h-44 rounded-[2rem] bg-slate-50 dark:bg-slate-800 p-6 flex-shrink-0 flex items-center justify-center">
                                    <img 
                                        src={order.productImage} 
                                        className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500" 
                                        alt={order.productTitle} 
                                    />
                                </div>

                                <div className="flex-1 flex flex-col md:flex-row items-center justify-between w-full gap-8 py-4">
                                    <div className="space-y-3 text-center md:text-left flex-1">
                                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg border text-[10px] font-black uppercase tracking-widest ${getStatusStyle(order.status)}`}>
                                            {getStatusIcon(order.status)}
                                            {order.status}
                                        </div>
                                        <h3 className="text-2xl font-black text-slate-900 dark:text-white group-hover:text-primary transition-colors leading-tight">{order.productTitle}</h3>
                                        <div className="flex items-center justify-center md:justify-start gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                            <span className="font-mono text-slate-300">#{order._id.slice(-8).toUpperCase()}</span>
                                            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                            <span>{new Date(order.orderDate).toLocaleDateString()}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col md:flex-row items-center gap-10">
                                        <div className="text-center md:text-right">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Amount</p>
                                            <p className="text-4xl font-black text-slate-900 dark:text-white leading-none tracking-tighter">${order.totalPrice}</p>
                                        </div>

                                        <div className="flex gap-3">
                                            <button onClick={() => navigate(`/checkout/${order.productId}?editId=${order._id}`)}
                                                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${order.status === 'Pending' ? 'bg-slate-900 text-white hover:bg-primary' : 'bg-slate-100 text-slate-300 cursor-not-allowed'}`}
                                                disabled={order.status !== 'Pending'}><FaEdit size={20} /></button>
                                            <button onClick={() => handleCancel(order._id, order.status)}
                                                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${order.status === 'Pending' ? 'bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white border-rose-100 shadow-sm' : 'bg-slate-100 text-slate-300 cursor-not-allowed'}`}
                                                disabled={order.status !== 'Pending'}><FaTrash size={20} /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MyOrders;