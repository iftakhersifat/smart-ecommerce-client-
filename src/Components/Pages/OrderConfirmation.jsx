import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { FaCheckCircle, FaBox, FaTruck, FaArrowRight } from 'react-icons/fa';
import Confetti from 'react-confetti'; // Optional: install koro 'npm i react-confetti'
import { useWindowSize } from 'react-use';

const OrderConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { width, height } = useWindowSize();
    
    // Checkout theke asha data
    const order = location.state?.orderDetails;
    const orderId = location.state?.orderId;

    if (!order) {
        return <div className="min-h-screen flex items-center justify-center">No order data found.</div>;
    }

    return (
        <div className="min-h-screen bg-base-200 py-12 px-4 relative overflow-hidden">
            {/* Success Celebration */}
            <Confetti width={width} height={height} recycle={false} numberOfPieces={200} />

            <div className="max-w-3xl mx-auto">
                <div className="card bg-base-100 shadow-2xl border-t-8 border-primary overflow-hidden">
                    
                    <div className="card-body items-center text-center p-10">
                        <div className="bg-success/10 p-5 rounded-full mb-4">
                            <FaCheckCircle className="text-6xl text-success" />
                        </div>
                        <h1 className="text-4xl font-black mb-2 text-base-content">Order Confirmed!</h1>
                        <p className="text-base-content/60 max-w-md">
                            Thank you for shopping with **Nexus**. Your order has been placed and is being processed by our team.
                        </p>

                        {/* Order ID & Status Section */}
                        <div className="flex flex-col md:flex-row gap-4 w-full mt-8">
                            <div className="flex-1 bg-base-200 p-4 rounded-2xl border border-base-300">
                                <span className="text-xs uppercase font-bold text-base-content/50">Order ID</span>
                                <p className="font-mono text-primary font-bold">#{orderId}</p>
                            </div>
                            <div className="flex-1 bg-base-200 p-4 rounded-2xl border border-base-300">
                                <span className="text-xs uppercase font-bold text-base-content/50">Current Status</span>
                                <div className="flex items-center justify-center gap-2 text-orange-500 font-bold">
                                    <span className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                                    </span>
                                    {order.status}
                                </div>
                            </div>
                        </div>

                        {/* Order Summary Table */}
                        <div className="w-full mt-10">
                            <h3 className="text-left font-bold text-xl mb-4 flex items-center gap-2">
                                <FaBox className="text-primary"/> Order Summary
                            </h3>
                            <div className="overflow-x-auto rounded-2xl border border-base-200">
                                <table className="table w-full">
                                    <thead className="bg-base-200">
                                        <tr>
                                            <th>Product</th>
                                            <th>Quantity</th>
                                            <th className="text-right">Total Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="font-semibold">{order.productTitle}</td>
                                            <td>{order.quantity} pcs</td>
                                            <td className="text-right font-black text-primary">${order.totalPrice}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Delivery Info */}
                        <div className="w-full mt-6 bg-base-200/50 p-6 rounded-2xl text-left border border-dashed border-base-300">
                            <h4 className="font-bold flex items-center gap-2 mb-2 uppercase text-xs">
                                <FaTruck className="text-primary"/> Delivery Address
                            </h4>
                            <p className="text-base-content/70">{order.address}</p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 w-full mt-10">
                            <button 
                                onClick={() => navigate('/dashboard')}
                                className="btn btn-primary flex-1 rounded-xl h-14"
                            >
                                Track My Order <FaArrowRight />
                            </button>
                            <button 
                                onClick={() => navigate('/products-list')}
                                className="btn btn-outline flex-1 rounded-xl h-14"
                            >
                                Continue Shopping
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation;