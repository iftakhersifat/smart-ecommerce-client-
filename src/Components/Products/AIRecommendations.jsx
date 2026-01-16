import { useState, useEffect } from "react";
import axios from "axios";
import { FaRobot, FaMagic, FaShoppingCart, FaArrowRight, FaLayerGroup } from "react-icons/fa";
import { Link } from "react-router";

const AIRecommendations = ({ currentProduct }) => {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAIRecommendations = async () => {
            setLoading(true);
            try {
                const res = await axios.get('http://localhost:5000/products');
                const allProducts = res.data;

                // Simple AI Logic: Filter products by category, excluding the current one
                // You can enhance this by adding keyword matching or price range similarity
                const filtered = allProducts
                    .filter(p => p._id !== currentProduct?._id && p.category === currentProduct?.category)
                    .sort(() => 0.5 - Math.random()) // Randomize for a fresh feel
                    .slice(0, 3); // Get top 3

                setRecommendations(filtered);
            } catch (error) {
                console.error("AI Recommendation Error:", error);
            } finally {
                setLoading(false);
            }
        };

        if (currentProduct) {
            fetchAIRecommendations();
        }
    }, [currentProduct]);

    if (!loading && recommendations.length === 0) return null;

    return (
        <section className="max-w-6xl mx-auto px-6 md:px-6 lg:px-0 py-16">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest border border-indigo-100 dark:border-indigo-500/20">
                        <FaRobot className="animate-pulse" /> AI Powered
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                        Smart <span className="text-indigo-600 italic">Recommendations</span>
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 font-medium max-w-md">
                        Based on your interests in <span className="text-indigo-500 font-bold">#{currentProduct?.category}</span>, our AI thinks you'll love these.
                    </p>
                </div>
                <Link to="/shop" className="group flex items-center gap-2 text-indigo-600 font-bold hover:gap-4 transition-all duration-300">
                    Explore Store <FaArrowRight />
                </Link>
            </div>

            {/* Recommendation Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {loading ? (
                    Array(3).fill(0).map((_, i) => (
                        <div key={i} className="h-[400px] bg-slate-100 dark:bg-slate-800 animate-pulse rounded-[2.5rem]"></div>
                    ))
                ) : (
                    recommendations.map((product) => (
                        <div 
                            key={product._id} 
                            className="group relative bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-6 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2 overflow-hidden"
                        >
                            {/* AI Badge Overlay */}
                            <div className="absolute top-6 right-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="p-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl">
                                    <FaMagic className="text-indigo-500" />
                                </div>
                            </div>

                            {/* Product Image */}
                            <div className="relative h-64 w-full mb-6 bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] p-8 overflow-hidden">
                                <img 
                                    src={product.image} 
                                    alt={product.title} 
                                    className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-110 transition-transform duration-700" 
                                />
                            </div>

                            {/* Product Info */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    <FaLayerGroup className="text-indigo-500" /> {product.category}
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                                    {product.title || product.name}
                                </h3>
                                
                                <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-800">
                                    <div className="text-2xl font-black text-slate-900 dark:text-white">
                                        <span className="text-sm font-bold text-indigo-600 mr-1">$</span>
                                        {product.price}
                                    </div>
                                    <button className="flex items-center gap-2 bg-indigo-600 hover:bg-slate-900 dark:hover:bg-indigo-500 text-white p-4 rounded-2xl transition-all shadow-lg shadow-indigo-100 dark:shadow-none active:scale-95">
                                        <FaShoppingCart />
                                    </button>
                                </div>
                            </div>

                            {/* Decorative Glow */}
                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all"></div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
};

export default AIRecommendations;