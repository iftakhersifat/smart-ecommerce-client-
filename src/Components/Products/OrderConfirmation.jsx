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

                        {/* Right Side */}
                        <div className="lg:col-span-5 bg-slate-50/50 dark:bg-slate-800/30 p-8 md:p-14">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-8 border-b dark:border-slate-700 pb-4">
                                Order Receipt</h3>

                            <div className="space-y-6">
                                {/* Item */}
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-bold text-slate-800 dark:text-slate-200">{order.productTitle}</p>
                                        <p className="text-sm text-slate-500 tracking-wide uppercase font-medium mt-1">Qty: {order.quantity}</p>
                                    </div>
                                    <p className="font-bold text-slate-900 dark:text-white">${order.totalPrice}</p>
                                </div>

                                <div className="h-px bg-slate-200 dark:bg-slate-700 w-full"></div>

                                {/* Details */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-sm">
                                        <FaEnvelope className="text-blue-500" />
                                        <span className="text-slate-600 dark:text-slate-400">{order.customerEmail}</span>
                                    </div>
                                    <div className="flex items-start gap-3 text-sm">
                                        <FaMapMarkerAlt className="text-blue-500 mt-1 shrink-0" />
                                        <span className="text-slate-600 dark:text-slate-400 leading-relaxed">{order.address}</span>
                                    </div>
                                </div>

                                {/* Billing */}
                                <div className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-700 mt-10">
                                    <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400 mb-2">
                                        <span>Subtotal</span>
                                        <span>${order.totalPrice}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400 mb-4">
                                        <span>Shipping</span>
                                        <span className="text-green-500 font-bold uppercase text-xs">Free</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-4 border-t dark:border-slate-700">
                                        <span className="font-bold text-slate-900 dark:text-white uppercase text-xs tracking-widest">Total Amount</span>
                                        <span className="text-3xl font-black text-slate-900 dark:text-white">${order.totalPrice}</span>
                                    </div>
                                </div>
                                
                                <div className="text-center mt-6">
                                    <div className="inline-block px-4 py-1 rounded-full bg-slate-900 text-white text-[10px] font-bold tracking-widest uppercase">Payment: Cash On Delivery
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default OrderConfirmation;