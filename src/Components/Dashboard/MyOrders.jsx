import React, { useEffect, useState, useContext } from 'react';

import { FaTrash, FaEdit, FaRegClock, FaCheckCircle, FaTruck, FaTimesCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import { AuthContext } from '../Firebase/AuthProvider';

const MyOrders = () => {
    const { user } = useContext(AuthContext);
    const [myOrders, setMyOrders] = useState([]);
    const navigate = useNavigate();

    // 1. View Own Orders (Fetch by email)
    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5000/my-orders?email=${user?.email}`)
                .then(res => res.json())
                .then(data => setMyOrders(data));
        }
    }, [user]);

    // 2. Cancel/Delete Own Order
    const handleCancel = (id, status) => {
        if (status !== 'Pending') {
            return Swal.fire("Oops!", `You cannot cancel an order that is already ${status}.`, "error");
        }

        Swal.fire({
            title: "Cancel Order?",
            text: "Are you sure you want to delete this purchase?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#EF4444",
            confirmButtonText: "Yes, Cancel it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/orders/${id}`, { method: 'DELETE' })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            setMyOrders(myOrders.filter(order => order._id !== id));
                            Swal.fire("Cancelled", "Order has been deleted successfully.", "success");
                        }
                    });
            }
        });
    };

    // Helper: Status onushare icon & color change
    const getStatusStyle = (status) => {
        switch (status) {
            case 'Pending': return { color: 'text-warning', icon: <FaRegClock /> };
            case 'Shipped': return { color: 'text-info', icon: <FaTruck /> };
            case 'Delivered': return { color: 'text-success', icon: <FaCheckCircle /> };
            case 'Cancelled': return { color: 'text-error', icon: <FaTimesCircle /> };
            default: return { color: 'text-base-content', icon: <FaRegClock /> };
        }
    };

    return (
        <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
                My Purchases <span className="badge badge-primary font-mono">{myOrders.length}</span>
            </h2>

            <div className="grid gap-6">
                {myOrders.length === 0 ? (
                    <div className="text-center py-20 bg-base-100 rounded-3xl border-2 border-dashed border-base-300">
                        <p className="text-xl opacity-50 italic">You haven't ordered anything yet.</p>
                    </div>
                ) : (
                    myOrders.map(order => (
                        <div key={order._id} className="card bg-base-100 shadow-sm border border-base-200 hover:shadow-md transition-all">
                            <div className="card-body flex-row justify-between items-center p-6">
                                {/* Order Info */}
                                <div className="space-y-1">
                                    <h3 className="text-xl font-bold">{order.productTitle}</h3>
                                    <div className="flex items-center gap-4 text-sm opacity-70">
                                        <span>Order ID: <span className="font-mono text-primary">#{order._id.slice(-6)}</span></span>
                                        <span>Date: {new Date(order.orderDate).toLocaleDateString()}</span>
                                    </div>
                                    
                                    {/* View Order Status */}
                                    <div className={`flex items-center gap-2 font-bold mt-2 ${getStatusStyle(order.status).color}`}>
                                        {getStatusStyle(order.status).icon} {order.status}
                                    </div>
                                </div>

                                {/* Actions & Price */}
                                <div className="flex flex-col items-end gap-3">
                                    <span className="text-2xl font-black text-primary">${order.totalPrice}</span>
                                    
                                    <div className="flex gap-2">
                                        {/* Edit Own Order (Allowed only if Pending) */}
                                        <button 
                                            onClick={() => navigate(`/checkout/${order.productId}?editId=${order._id}`)}
                                            className="btn btn-circle btn-ghost btn-sm text-info tooltip" 
                                            data-tip="Edit Info"
                                            disabled={order.status !== 'Pending'}
                                        >
                                            <FaEdit size={18} />
                                        </button>

                                        {/* Delete Order */}
                                        <button 
                                            onClick={() => handleCancel(order._id, order.status)}
                                            className="btn btn-circle btn-ghost btn-sm text-error tooltip" 
                                            data-tip="Cancel Order"
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