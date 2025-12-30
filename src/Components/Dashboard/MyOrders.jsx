import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { FaTrash, FaEdit, FaRegClock, FaCheckCircle, FaTruck, FaTimesCircle, FaShoppingBag, FaSearch } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import { AuthContext } from '../Firebase/AuthProvider';

const MyOrders = () => {
    const { user } = useContext(AuthContext);
    const [myOrders, setMyOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // 1. Fetch Orders using Axios
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

    // 2. Cancel Order with Axios
    const handleCancel = async (id, status) => {
        if (status !== 'Pending') {
            return Swal.fire({
                title: "Action Restricted",
                text: `Order is already ${status}. You can only cancel pending orders.`,
                icon: "info",
                confirmButtonColor: "#3B82F6"
            });
        }

        const result = await Swal.fire({
            title: "Cancel Order?",
            text: "This action cannot be undone. Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#EF4444",
            cancelButtonColor: "#64748B",
            confirmButtonText: "Yes, Cancel it",
            customClass: {
                popup: 'rounded-3xl'
            }
        });

        if (result.isConfirmed) {
            try {
                const response = await axios.delete(`http://localhost:5000/orders/${id}`);
                if (response.data.deletedCount > 0) {
                    setMyOrders(myOrders.filter(order => order._id !== id));
                    Swal.fire("Order Cancelled", "Your refund will be processed soon.", "success");
                }
            } catch (error) {
                Swal.fire("Error", "Could not delete order. Try again.", "error");
            }
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Pending': return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200";
            case 'Shipped': return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200";
            case 'Delivered': return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200";
            case 'Cancelled': return "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 border-rose-200";
            default: return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400 border-gray-200";
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
        <div className="flex flex-col items-center justify-center min-h-[400px]">
            <span className="loading loading-ring loading-lg text-primary"></span>
            <p className="mt-4 font-bold text-slate-400 animate-pulse uppercase tracking-widest text-xs">Loading Orders...</p>
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
                <div>
                    <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                        Order History
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Manage and track your recent purchases.</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-2 rounded-2xl border dark:border-slate-700 flex items-center gap-2 shadow-sm">
                    <span className="bg-primary text-white px-4 py-1.5 rounded-xl font-bold text-sm">
                        {myOrders.length} Total Orders
                    </span>
                </div>
            </div>

            {/* Orders List */}
            <div className="grid gap-6">
                {myOrders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-800/50 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-700">
                        <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                            <FaShoppingBag className="text-3xl text-slate-300" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">No Orders Found</h3>
                        <p className="text-slate-400 mb-6">Looks like you haven't made any purchases yet.</p>
                        <button onClick={() => navigate('/')} className="btn btn-primary rounded-xl px-8 shadow-lg shadow-blue-500/20">
                            Start Shopping
                        </button>
                    </div>
                ) : (
                    myOrders.map(order => (
                        <div key={order._id} className="group bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 p-6 transition-all hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-none hover:-translate-y-1">
                            <div className="flex flex-col lg:flex-row gap-8 items-center">
                                
                                {/* Product Summary */}
                                <div className="flex-1 flex flex-col md:flex-row items-center gap-6 w-full">
                                    <div className="w-24 h-24 bg-slate-50 dark:bg-slate-700 rounded-2xl flex items-center justify-center p-3 relative overflow-hidden">
                                        <FaShoppingBag className="text-slate-200 dark:text-slate-600 absolute scale-[2] -rotate-12" />
                                        <div className="font-black text-primary text-xs z-10 uppercase tracking-tighter text-center">Nexus Product</div>
                                    </div>
                                    <div className="text-center md:text-left space-y-1">
                                        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white group-hover:text-primary transition-colors leading-tight">
                                            {order.productTitle}
                                        </h3>
                                        <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-4 gap-y-1 text-sm text-slate-400 font-medium tracking-tight">
                                            <span className="flex items-center gap-1.5">
                                                ID: <span className="font-mono text-slate-900 dark:text-slate-200">#{order._id.slice(-8).toUpperCase()}</span>
                                            </span>
                                            <span className="w-1 h-1 bg-slate-300 rounded-full hidden md:block"></span>
                                            <span>Ordered: {new Date(order.orderDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Status & Price Group */}
                                <div className="flex flex-col md:flex-row items-center gap-8 w-full lg:w-auto border-t lg:border-t-0 lg:border-l dark:border-slate-700 pt-6 lg:pt-0 lg:pl-10">
                                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-black uppercase tracking-widest ${getStatusStyle(order.status)}`}>
                                        {getStatusIcon(order.status)}
                                        {order.status}
                                    </div>

                                    <div className="text-center md:text-right">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Paid</p>
                                        <p className="text-3xl font-black text-slate-900 dark:text-white leading-none">
                                            ${order.totalPrice}
                                        </p>
                                    </div>

                                    {/* Quick Actions */}
                                    <div className="flex gap-3">
                                        <button 
                                            onClick={() => navigate(`/checkout/${order.productId}?editId=${order._id}`)}
                                            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-sm ${order.status === 'Pending' ? 'bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white' : 'bg-slate-50 text-slate-300 cursor-not-allowed'}`}
                                            disabled={order.status !== 'Pending'}
                                            title="Edit Order Info"
                                        >
                                            <FaEdit size={18} />
                                        </button>
                                        <button 
                                            onClick={() => handleCancel(order._id, order.status)}
                                            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-sm ${order.status === 'Pending' ? 'bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white' : 'bg-slate-50 text-slate-300 cursor-not-allowed'}`}
                                            disabled={order.status !== 'Pending'}
                                            title="Cancel Order"
                                        >
                                            <FaTrash size={18} />
                                        </button>
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