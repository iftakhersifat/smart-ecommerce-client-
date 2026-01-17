import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../Firebase/AuthProvider';
import { FaTrash, FaShoppingCart, FaExchangeAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const Compare = () => {
    const { user } = useContext(AuthContext);
    const [compareList, setCompareList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.email) {
            fetch(`https://smart-ecommerce-server.vercel.app/compare?email=${user.email}`)
                .then(res => res.json())
                .then(data => setCompareList(data));
        }
    }, [user]);

    const handleRemove = (id) => {
        fetch(`https://smart-ecommerce-server.vercel.app/compare/${id}`, { method: 'DELETE' })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    setCompareList(compareList.filter(item => item._id !== id));
                }
            });
    };

    return (
        <div className="min-h-screen py-12 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <div className="w-16 h-16 bg-indigo-600/10 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <FaExchangeAlt size={24} />
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 dark:text-white">Compare Products</h2>
                    <p className="text-slate-500 mt-2">Analyze features and choose the best one for you.</p>
                </div>

                {compareList.length === 0 ? (
                    <div className="text-center py-20 text-slate-400">Add products from details page to compare them.</div>
                ) : (
                    <div className="overflow-x-auto rounded-[2.5rem] shadow-2xl shadow-slate-200/50 dark:shadow-none">
                        <table className="w-full bg-white dark:bg-slate-900 border-collapse">
                            <thead>
                                <tr>
                                    <th className="p-8 text-left bg-slate-50 dark:bg-slate-800/50 dark:text-slate-400 uppercase text-xs tracking-widest border-b dark:border-slate-800">Specifications</th>
                                    {compareList.map(item => (
                                        <th key={item._id} className="p-8 border-l dark:border-slate-800 border-b relative group min-w-[280px]">
                                            <button onClick={() => handleRemove(item._id)} className="absolute top-4 right-4 text-rose-500 hover:scale-125 transition-transform"><FaTrash size={14} /></button>
                                            <div className="h-40 flex items-center justify-center mb-6">
                                                <img src={item.image} alt="" className="h-32 object-contain" />
                                            </div>
                                            <p className="text-sm dark:text-white font-bold line-clamp-2 text-center">{item.title}</p>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="dark:text-slate-300">
                                <tr className="border-b dark:border-slate-800">
                                    <td className="p-8 font-bold bg-slate-50 dark:bg-slate-800/50 text-slate-500 uppercase text-[10px] tracking-[0.2em]">Price Tag</td>
                                    {compareList.map(item => (
                                        <td key={item._id} className="p-8 text-center border-l dark:border-slate-800 font-black text-indigo-600 text-2xl">${item.price}</td>
                                    ))}
                                </tr>
                                <tr className="border-b dark:border-slate-800">
                                    <td className="p-8 font-bold bg-slate-50 dark:bg-slate-800/50 text-slate-500 uppercase text-[10px] tracking-[0.2em]">Category</td>
                                    {compareList.map(item => (
                                        <td key={item._id} className="p-8 text-center border-l dark:border-slate-800 capitalize font-medium">{item.category}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="p-8 font-bold bg-slate-50 dark:bg-slate-800/50 text-slate-500 uppercase text-[10px] tracking-[0.2em]">Quick Action</td>
                                    {compareList.map(item => (
                                        <td key={item._id} className="p-8 text-center border-l dark:border-slate-800">
                                            <button onClick={() => navigate(`/checkout/${item.productId}`)} className="bg-slate-900 dark:bg-indigo-600 text-white px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:shadow-lg transition-all active:scale-95">Add to Cart</button>
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Compare;