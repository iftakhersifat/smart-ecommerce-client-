import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ManageOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/all-orders').then(res => setOrders(res.data));
    }, []);

    const updateStatus = (id, newStatus) => {
        axios.patch(`http://localhost:5000/orders/${id}`, { status: newStatus })
            .then(res => {
                if(res.data.modifiedCount > 0) {
                    Swal.fire("Success", `Status updated to ${newStatus}`, "success");
                    setOrders(orders.map(order => order._id === id ? {...order, status: newStatus} : order));
                }
            });
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-6">Manage All Orders</h2>
            <table className="table w-full">
                <thead>
                    <tr className="bg-gray-100">
                        <th>Customer</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order._id}>
                            <td>{order.customerEmail}</td>
                            <td>{order.productName}</td>
                            <td>${order.totalPrice}</td>
                            <td><span className={`badge ${order.status === 'Delivered' ? 'badge-success' : 'badge-warning'}`}>{order.status}</span></td>
                            <td>
                                <select 
                                    className="select select-bordered select-xs" 
                                    onChange={(e) => updateStatus(order._id, e.target.value)}
                                    defaultValue={order.status}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default ManageOrders;