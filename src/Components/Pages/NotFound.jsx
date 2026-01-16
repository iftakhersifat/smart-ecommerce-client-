import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { ShoppingCart, Home, ArrowLeft, Search } from 'lucide-react';
import Navbar from './Navbar';

const NotFound = () => {
    return (
        <div className="overflow-hidden">
            <Navbar />
            <div className="min-h-screen lg:-mt-24 w-full flex flex-col items-center justify-center bg-[#f8fafc] dark:bg-zinc-950 px-6 relative">
                
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl animate-pulse delay-700"></div>

                <div className="relative mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-[120px] md:text-[200px] font-black leading-none tracking-tighter text-slate-200 dark:text-zinc-900 select-none">404
                    </motion.div>
                    
                    <motion.div
                        animate={{ 
                            y: [0, -20, 0],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{ 
                            duration: 4, 
                            repeat: Infinity, 
                            ease: "easeInOut" 
                        }}
                        className="absolute inset-0 flex items-center justify-center">
                        <div className="p-6 bg-white dark:bg-zinc-800 rounded-3xl shadow-2xl shadow-indigo-200 dark:shadow-none border border-slate-100 dark:border-zinc-700">
                            <ShoppingCart size={60} className="text-indigo-600" strokeWidth={1.5} />
                        </div>
                    </motion.div>
                </div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-center z-10">
                    <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
                        Lost in the <span className="text-indigo-600">SmartStore?</span>
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-10 font-medium leading-relaxed">
                        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 transition-all uppercase text-xs tracking-widest">
                                <Home size={18} />Back to Home
                            </motion.button>
                        </Link>
                        
                        <Link to="/all-products">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-2 px-8 py-4 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white border border-slate-200 dark:border-zinc-700 rounded-2xl font-bold hover:bg-slate-50 transition-all uppercase text-xs tracking-widest">
                                <Search size={18} />Browse Shop
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    className="mt-16 flex items-center gap-2 text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">
                    <div className="h-[1px] w-8 bg-slate-300"></div>SmartStore 404 Error
                    <div className="h-[1px] w-8 bg-slate-300"></div>
                </motion.div>
            </div>
        </div>
    );
};

export default NotFound;