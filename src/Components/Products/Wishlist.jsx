import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../Firebase/AuthProvider';
import { FaTrash, FaShoppingCart, FaArrowRight } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router';
import Swal from 'sweetalert2';

const Wishlist = () => {
    const { user } = useContext(AuthContext);
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5000/wishlist?email=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    setWishlist(data);
                    setLoading(false);
                });
        }
    }, [user]);

    const handleRemove = (id) => {
        fetch(`http://localhost:5000/wishlist/${id}`, { method: 'DELETE' })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    setWishlist(wishlist.filter(item => item._id !== id));
                    Swal.fire({ title: "Removed from Wishlist", icon: "success", toast: true, position: 'top-end', showConfirmButton: false, timer: 2000 });
                }
            });
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center dark:bg-slate-950"><div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div></div>;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-4xl font-black text-slate-900 dark:text-white">My Wishlist</h2>
                        <p className="text-slate-500 mt-2">You have {wishlist.length} items saved for later.</p>
                    </div>
                    <Link to="/" className="text-indigo-600 font-bold flex items-center gap-2 hover:underline">Continue Shopping <FaArrowRight size={12} /></Link>
                </div>

                {wishlist.length === 0 ? (
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-20 text-center shadow-sm border border-slate-100 dark:border-slate-800">
                        <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                            <FaShoppingCart size={30} />
                        </div>
                        <h3 className="text-xl font-bold dark:text-white mb-2">Your wishlist is empty</h3>
                        <p className="text-slate-500 mb-8">Looks like you haven't added anything yet.</p>
                        <button onClick={() => navigate('/')} className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold uppercase tracking-wider text-sm">Explore Products</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {wishlist.map(item => (
                            <div key={item._id} className="bg-white dark:bg-slate-900 p-5 rounded-[2rem] border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all group relative">
                                <button onClick={() => handleRemove(item._id)} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-rose-50 dark:bg-rose-500/10 text-rose-500 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-500 hover:text-white">
                                    <FaTrash size={12} />
                                </button>
                                
                                <div className="h-48 flex items-center justify-center mb-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl overflow-hidden">
                                    <img src={item.image} alt="" className="h-32 object-contain group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                
                                <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm line-clamp-2 min-h-[40px]">{item.title}</h3>
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="text-xl font-black text-indigo-600 dark:text-indigo-400">${item.price}</span>
                                    <button onClick={() => navigate(`/checkout/${item.productId}`)} className="p-3 bg-slate-900 dark:bg-indigo-600 text-white rounded-xl hover:scale-110 transition-transform active:scale-95">
                                        <FaShoppingCart size={14} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;