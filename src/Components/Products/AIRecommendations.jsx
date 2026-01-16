import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaRobot, FaMagic, FaShoppingCart, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const AIRecommendations = ({ currentProduct }) => {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchAIRecommendations = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`http://localhost:5000/products`);
                const allProducts = res.data;
                
                const filtered = allProducts
                    .filter(p => p._id !== id && p.category === currentProduct?.category)
                    .sort(() => 0.5 - Math.random());

                setRecommendations(filtered);
            } catch (error) {
                console.error("AI Recommendation Error:", error);
            } finally {
                setLoading(false);
            }
        };

        if (currentProduct) fetchAIRecommendations();
    }, [id, currentProduct]);

    if (!loading && recommendations.length === 0) return null;

    return (
        <section className="max-w-7xl mx-auto px-6 py-20">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] border border-indigo-100 dark:border-indigo-500/20">
                        <FaRobot className="animate-pulse text-sm" /> AI Curated Content
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 dark:text-white">
                        Smart <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">Suggestions</span>
                    </h2>
                </div>

                <div className="flex gap-3">
                    <button className="prev-btn p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-indigo-600 hover:text-white transition-all shadow-xl shadow-slate-200/50 dark:shadow-none">
                        <FaArrowLeft />
                    </button>
                    <button className="next-btn p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-indigo-600 hover:text-white transition-all shadow-xl shadow-slate-200/50 dark:shadow-none">
                        <FaArrowRight />
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-[450px] bg-slate-100 dark:bg-slate-800 animate-pulse rounded-[3rem]"></div>
                    ))}
                </div>
            ) : (
                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    navigation={{ prevEl: '.prev-btn', nextEl: '.next-btn' }}
                    autoplay={{ delay: 5000 }}
                    breakpoints={{
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 }
                    }}
                    className="pb-10">
                    {recommendations.map((product) => (
                        <SwiperSlide key={product._id}>
                            <div className="group relative bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800/50 p-6 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10 overflow-hidden">
                                
                                <div onClick={() => navigate(`/product/${product._id}`)} className="cursor-pointer relative h-72 w-full mb-6 bg-slate-50 dark:bg-slate-800/40 rounded-[2.5rem] flex items-center justify-center p-10 overflow-hidden">
                                    <img 
                                        src={product.image} 
                                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" 
                                        alt={product.title}/>
                                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-3 rounded-2xl">
                                        <FaMagic className="text-indigo-500" />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-1">#{product.category}</p>
                                        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 line-clamp-1">{product.title}</h3>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-800">
                                        <div className="text-2xl font-black text-slate-900 dark:text-white">
                                            <span className="text-sm font-bold text-indigo-600 mr-1">$</span>
                                            {product.price}
                                        </div>
                                        <button 
                                            onClick={() => navigate(`/checkout/${product._id}`)} 
                                            className="h-14 w-14 flex items-center justify-center bg-slate-900 dark:bg-indigo-600 text-white rounded-2xl hover:bg-indigo-600 transition-all active:scale-90">
                                            <FaShoppingCart />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </section>
    );
};

export default AIRecommendations;