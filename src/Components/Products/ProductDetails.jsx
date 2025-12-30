import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaStar, FaStarHalfAlt, FaPlus, FaMinus, FaChevronLeft } from "react-icons/fa";
import { FaHeart, FaShieldHalved, FaTruckFast } from "react-icons/fa6";
import { useParams, useNavigate } from "react-router";
import Swal from 'sweetalert2';

/* ⭐ Star Renderer Function */
const renderStars = (rate = 0) => {
  const fullStars = Math.floor(rate);
  const hasHalfStar = rate % 1 !== 0;

  return (
    <div className="flex items-center gap-1 text-orange-400">
      {[...Array(5)].map((_, i) => (
        <span key={i}>
          {i < fullStars ? <FaStar /> : (i === fullStars && hasHalfStar ? <FaStarHalfAlt /> : <FaStar className="text-gray-300" />)}
        </span>
      ))}
    </div>
  );
};

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handlePurchase = () => {
    navigate(`/checkout/${id}`, { state: { quantity } });
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-base-100">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );

  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <h2 className="text-4xl font-bold text-error mb-4">404 - Product Not Found</h2>
      <button className="btn btn-outline" onClick={() => navigate("/products")}>Back to Shop</button>
    </div>
  );

  return (
    <div className="bg-base-100 min-h-screen pb-20">

      <div className="max-w-7xl mx-auto px-4 py-6">
        <button onClick={() => navigate(-1)} className="btn btn-ghost btn-sm gap-2">
          <FaChevronLeft /> Back to Products
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl p-8 border border-base-200 shadow-sm flex items-center justify-center sticky top-24">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-auto max-h-[500px] object-contain hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="flex gap-4 justify-center py-2">
             <div className="flex items-center gap-2 text-sm text-base-content/60"><FaTruckFast className="text-primary"/> Fast Delivery</div>
             <div className="flex items-center gap-2 text-sm text-base-content/60"><FaShieldHalved className="text-primary"/> Secure Payment</div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="mb-6">
            <div className="badge badge-primary badge-sm mb-4">Official Store</div>
            <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
              {product.title}
            </h1>
            
            <div className="flex items-center gap-4 mb-6 bg-base-200/50 w-fit p-2 px-4 rounded-full">
              {renderStars(product.rating?.rate)}
              <span className="font-bold text-sm">
                {product.rating?.rate} <span className="text-base-content/50 font-normal">({product.rating?.count} Verified Reviews)</span>
              </span>
            </div>

            <div className="flex items-center gap-6 mb-8">
              <div className="text-5xl font-black text-primary">${product.price}</div>
              <div className="flex flex-col">
                <span className="text-xl text-base-content/30 line-through">${(product.price * 1.2).toFixed(2)}</span>
                <span className="text-success font-bold text-sm">Save 20% Today</span>
              </div>
            </div>

            <p className="text-base-content/70 text-lg leading-relaxed mb-8 text-justify">
              {product.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 mb-10">
            <div className="flex items-center border-2 border-base-300 rounded-2xl overflow-hidden h-14 w-full sm:w-auto">
              <button 
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="btn btn-ghost h-full px-6 border-none hover:bg-base-200"><FaMinus /></button>
              <span className="px-8 font-black text-xl w-20 text-center">{quantity}</span>
              <button 
                onClick={() => setQuantity(q => q + 1)}
                className="btn btn-ghost h-full px-6 border-none hover:bg-base-200"><FaPlus /></button>
            </div>

            <button 
              onClick={handlePurchase}
              className="btn btn-primary btn-lg flex-1 h-14 rounded-2xl gap-3 shadow-xl shadow-primary/20 w-full">
              <FaShoppingCart /> Purchase Now
            </button>
            
            <button className="btn btn-outline btn-lg h-14 rounded-2xl border-2 px-6">
              <FaHeart className="text-rose-500" />
            </button>
          </div>

          <div className="divider">Reviews & Ratings</div>
          
          <div className="mt-8">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Community Feedback</h3>
                <button className="btn btn-sm btn-link text-primary">Write a Review</button>
             </div>

             {product.reviews?.length > 0 ? (
               <div className="grid gap-4">
                 {product.reviews.map((rev, idx) => (
                   <div key={idx} className="bg-base-200/30 p-6 rounded-2xl border border-base-200">
                     <div className="flex justify-between items-start mb-2">
                       <span className="font-bold">{rev.user}</span>
                       {renderStars(rev.rating)}
                     </div>
                     <p className="text-base-content/70 italic">"{rev.comment}"</p>
                   </div>
                 ))}
               </div>
             ) : (
               <div className="text-center py-10 bg-base-200/30 rounded-3xl border-2 border-dashed border-base-300">
                 <p className="text-base-content/50">No reviews yet for this product. Be the first to share your experience!</p>
               </div>
             )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;