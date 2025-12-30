import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { FaCheckCircle, FaBox, FaTruck, FaArrowRight, FaHome, FaShoppingBag, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const OrderConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { width, height } = useWindowSize();
    
    const order = location.state?.orderDetails;

    if (!order) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-950">
                <div className="animate-pulse text-xl text-gray-400">Redirecting to home...</div>
                {setTimeout(() => navigate('/'), 2000)}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] -mb-24 dark:bg-slate-950 py-10 md:py-20 px-6 relative overflow-hidden transition-all duration-500">

            <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900/10 dark:to-transparent -z-10"></div>
            
            <Confetti width={width} height={height} recycle={false} numberOfPieces={400} gravity={0.15} colors={['#3B82F6', '#60A5FA', '#10B981', '#F59E0B']} />

            <div className="max-w-5xl mx-auto">
                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-blue-200/20 dark:shadow-none border border-white dark:border-slate-800 overflow-hidden">
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12">
                        
                        {/* Left Side */}
                        <div className="lg:col-span-7 p-8 md:p-14 border-b lg:border-b-0 lg:border-r dark:border-slate-800">
                            <div className="flex flex-col items-start text-left">
                                <div className="p-4 bg-blue-50 dark:bg-blue-500/10 rounded-2xl text-green-600 dark:text-green-400 mb-6">
                                    <FaCheckCircle size={32} className="animate-pulse" />
                                </div>
                                <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-4">
                                    <span className="text-green-600">Order Successfully Placed!</span>
                                </h1>
                                <p className="text-slate-500 dark:text-slate-400 text-lg mb-10">Your package is being prepared with care. We’ll notify you when it’s on its way.
                                </p>

                                {/* modern stepper */}
                                <div className="w-full space-y-8 mb-10">
                                    <div className="flex items-center gap-4">
                                        <div className="relative flex flex-col items-center">
                                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white z-10 shadow-lg shadow-blue-400">1</div>
                                            <div className="w-0.5 h-10 bg-blue-600"></div>
                                        </div>
                                        <div className="pb-8">
                                            <h4 className="font-bold dark:text-white">Order Confirmed</h4>
                                            <p className="text-xs text-slate-400 italic">Today, {new Date().toLocaleTimeString()}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="relative flex flex-col items-center">
                                            <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center text-slate-500 z-10">2</div>
                                            <div className="w-0.5 h-10 bg-slate-200 dark:bg-slate-700"></div>
                                        </div>
                                        <div className="pb-8">
                                            <h4 className="font-bold text-slate-400">Processing</h4>
                                            <p className="text-xs text-slate-400">Estimated within 24 hours</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center text-slate-500">3</div>
                                        <div>
                                            <h4 className="font-bold text-slate-400">Out for Delivery</h4>
                                        </div>
                                    </div>
                                </div>

                                {/* button section */}
                                <div className="flex flex-wrap gap-3">
                                    <button onClick={() => navigate('/order-list')} className="btn btn-primary btn-lg rounded-2xl px-8 shadow-xl shadow-blue-200 dark:shadow-none">Track Order <FaArrowRight className="ml-2" /></button>

                                    <button onClick={() => navigate('/products-list')} className="btn btn-ghost btn-lg rounded-2xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">Back to Store</button>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: High-End Invoice Summary */}
<div className="lg:col-span-5 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 p-8 md:p-12 border-l border-slate-100 dark:border-slate-800">
    
            <div className="flex justify-between py-4">
                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em] mt-1">Order Confirmed</p>
                <div>
                <p className="text-[10px] text-right font-black text-slate-400 uppercase tracking-widest">Date</p>
                <p className="text-sm font-bold text-slate-900 dark:text-slate-200">{new Date().toLocaleDateString()}</p>
                </div>
            </div>

    <div className="space-y-8">
        {/* Item Card */}
        <div className="group flex items-center gap-5 p-4 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
            <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 flex-shrink-0">
                <img 
                    src={order.productImage} 
                    className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal p-2 group-hover:scale-110 transition-transform duration-500" 
                    alt="product" 
                />
            </div>
            <div className="flex-1 min-w-0">
                <p className="font-extrabold text-slate-800 dark:text-slate-200 truncate leading-tight">
                    {order.productTitle}
                </p>
                <p className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-widest">
                    Quantity: <span className="text-slate-900 dark:text-white">{order.quantity}</span>
                </p>
            </div>
            <p className="font-black text-slate-900 dark:text-white text-lg">
                ${order.totalPrice}
            </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 gap-4 py-6 border-y border-dashed border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-4 group">
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-500">
                    <FaEnvelope size={14} />
                </div>
                <div className="overflow-hidden">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer Email</p>
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300 truncate">{order.customerEmail}</p>
                </div>
            </div>

            <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center text-amber-500 mt-1">
                    <FaMapMarkerAlt size={14} />
                </div>
                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Shipping Address</p>
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300 leading-relaxed">{order.address}</p>
                </div>
            </div>
        </div>

        {/* Billing Section */}
        <div className="space-y-4">
            <div className="flex justify-between text-sm font-bold text-slate-500 dark:text-slate-400">
                <span>Subtotal</span>
                <span className="text-slate-900 dark:text-white">${order.totalPrice}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-slate-500 dark:text-slate-400">
                <span>Shipping Fee</span>
                <span className="text-green-500 uppercase text-xs tracking-widest">Free</span>
            </div>

            {/* Total Highlight */}
            <div className="relative mt-8 p-6 rounded-[2rem] bg-slate-900 dark:bg-blue-600 overflow-hidden shadow-2xl shadow-blue-500/20">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <FaShoppingBag size={80} className="-rotate-12" />
                </div>
                <div className="relative z-10 flex justify-between items-center">
                    <div>
                        <p className="text-[10px] font-black text-blue-200/60 uppercase tracking-widest">Amount to Pay</p>
                        <p className="text-white font-bold text-xs">Via Cash on Delivery</p>
                    </div>
                    <div className="text-right">
                        <span className="text-4xl font-black text-white leading-none">${order.totalPrice}</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Security Footer */}
        <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-8">
            Verified Transaction &bull; Thank you
        </p>
    </div>
</div>

                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default OrderConfirmation;