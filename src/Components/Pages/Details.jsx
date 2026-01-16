// import React, { useEffect, useState } from "react";
// import { FaShoppingCart, FaStar, FaStarHalfAlt, FaArrowLeft, FaCheckCircle } from "react-icons/fa";
// import { FaHeart, FaShareNodes } from "react-icons/fa6";
// import { useParams, useNavigate, NavLink } from "react-router";

// const renderStars = (rate = 0) => {
//   const fullStars = Math.floor(rate);
//   const hasHalfStar = rate % 1 !== 0;

//   return (
//     <div className="flex items-center gap-0.5 text-orange-400">
//       {[...Array(5)].map((_, i) => (
//         <span key={i}>
//           {i < fullStars ? <FaStar /> : (i === fullStars && hasHalfStar ? <FaStarHalfAlt /> : <FaStar className="text-gray-200" />)}
//         </span>
//       ))}
//     </div>
//   );
// };

// const ProductDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//     fetch(`http://localhost:5000/products/${id}`)
//       .then(res => res.json())
//       .then(data => {
//         setProduct(data);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-base-100">
//         <div className="flex flex-col items-center gap-4">
//             <span className="loading loading-spinner loading-lg text-primary"></span>
//             <p className="font-bold text-primary animate-pulse">Loading Premium Details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-base-100">
//         <div className="text-9xl mb-4">🕵️‍♂️</div>
//         <h2 className="text-3xl font-bold mb-4">Product Not Found</h2>
//         <button className="btn btn-primary rounded-full px-8" onClick={() => navigate("/")}>
//           <FaArrowLeft /> Back to Shop
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-base-200/30 min-h-screen pb-20">
//       <div className="bg-base-100 border-b border-base-200 sticky top-0 z-10 py-4">
//           <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
//             <div className="breadcrumbs text-sm text-base-content/60">
//                 <ul>
//                     <li><a onClick={() => navigate("/")} className="hover:text-primary transition-colors">Home</a></li>
//                     <li><NavLink to="/products-list">Products</NavLink></li>
//                     <li className="font-bold text-base-content line-clamp-1">{product.title}</li>
//                 </ul>
//             </div>
//             <button className="btn btn-ghost btn-sm btn-circle"><FaShareNodes /></button>
//           </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-6 mt-10">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

//           {/* 🖼️ Left: Image Gallery Look */}
//           <div className="lg:col-span-7">
//             <div className="sticky top-28">
//                 <div className="bg-white rounded-[2.5rem] p-8 md:p-16 border border-base-300 shadow-2xl shadow-base-300/50 relative group">
//                     <img
//                         src={product.image}
//                         alt={product.title}
//                         className="w-full max-h-[550px] object-contain transition-transform duration-700 group-hover:scale-105"
//                     />
//                     <div className="absolute top-6 left-6 flex flex-col gap-2">
//                         <span className="badge badge-error text-white font-bold p-3 animate-bounce">25% OFF</span>
//                     </div>
//                 </div>
//             </div>
//           </div>

//           {/* 📝 Right: Detailed Info */}
//           <div className="lg:col-span-5 flex flex-col">
//             <div className="bg-base-100 p-8 rounded-[2rem] border border-base-300 shadow-xl">
//                 <div className="flex items-center gap-2 text-success text-sm font-bold mb-3">
//                     <FaCheckCircle /> IN STOCK & READY TO SHIP
//                 </div>

//                 <h1 className="text-3xl md:text-4xl font-black mb-4 leading-tight">
//                     {product.title}
//                 </h1>

//                 {/* Rating & Stats */}
//                 <div className="flex items-center gap-4 mb-8 pb-6 border-b border-base-200">
//                     <div className="bg-orange-50 px-3 py-1 rounded-lg border border-orange-100 flex items-center gap-2">
//                         <span className="font-bold text-orange-600">{product.rating?.rate}</span>
//                         {renderStars(product.rating?.rate)}
//                     </div>
//                     <span className="text-sm font-semibold text-base-content/50">
//                         {product.rating?.count} Verified Reviews
//                     </span>
//                 </div>

//                 {/* Pricing Card */}
//                 <div className="mb-8">
//                     <p className="text-sm font-bold text-base-content/40 uppercase tracking-tighter mb-1">Price</p>
//                     <div className="flex items-center gap-4">
//                         <span className="text-5xl font-black text-primary">
//                             ${product.price}
//                         </span>
//                         <div className="flex flex-col">
//                             <span className="text-lg text-base-content/30 line-through font-semibold">
//                                 ${(product.price * 1.25).toFixed(2)}
//                             </span>
//                             <span className="text-xs font-bold text-error">Save ${(product.price * 0.25).toFixed(2)}</span>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Short Description */}
//                 <div className="mb-8 p-4 bg-base-200/50 rounded-2xl italic text-base-content/80 text-sm leading-relaxed">
//                     {product.description}
//                 </div>

//                 {/* CTAs */}
//                 <div className="flex flex-col gap-4">
//                     <button className="btn btn-primary btn-lg rounded-2xl h-16 shadow-2xl shadow-primary/30 flex items-center justify-center gap-4 group">
//                         <FaShoppingCart className="group-hover:translate-x-1 transition-transform" /> 
//                         <span className="text-lg uppercase font-black tracking-widest">Buy Now</span>
//                     </button>

//                     <button className="btn btn-outline btn-lg rounded-2xl h-16 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all flex items-center justify-center gap-3">
//                         <FaHeart className="text-xl text-rose-500" /> Wishlist
//                     </button>
//                 </div>
//             </div>

//             {/* 🛡️ Trust Badges */}
//             <div className="mt-6 grid grid-cols-3 gap-2">
//                 {['Free Shipping', 'Secure Pay', '7-Day Return'].map((text, i) => (
//                     <div key={i} className="bg-base-100 py-3 rounded-xl border border-base-200 text-[10px] font-black text-center uppercase tracking-tighter opacity-70">
//                         {text}
//                     </div>
//                 ))}
//             </div>
//           </div>

//         </div>

//         {/* 💬 Reviews Section */}
//         <div className="mt-20 max-w-4xl">
//             <div className="flex items-center justify-between mb-10">
//                 <h3 className="text-3xl font-black">Community <span className="text-primary">Reviews</span></h3>
//                 <button className="btn btn-ghost btn-sm">Write Review</button>
//             </div>

//             {product.reviews?.length > 0 ? (
//                 <div className="grid gap-6">
//                     {product.reviews.map(review => (
//                         <div key={review._id} className="bg-base-100 rounded-3xl p-8 border border-base-300 shadow-sm hover:shadow-md transition-shadow">
//                             <div className="flex justify-between items-start mb-4">
//                                 <div className="flex items-center gap-4">
//                                     <div className="avatar placeholder">
//                                         <div className="bg-primary text-primary-content rounded-full w-12">
//                                             <span className="font-bold">{review.user?.charAt(0)}</span>
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <h4 className="font-bold text-lg">{review.user}</h4>
//                                         <p className="text-xs opacity-40 font-semibold uppercase">Verified Buyer</p>
//                                     </div>
//                                 </div>
//                                 {renderStars(review.rating)}
//                             </div>
//                             <p className="text-base-content/70 leading-relaxed pl-16">
//                                 "{review.comment}"
//                             </p>
//                         </div>
//                     ))}
//                 </div>
//             ) : (
//                 <div className="bg-base-100 p-12 rounded-[2rem] border border-dashed border-base-300 text-center">
//                     <p className="text-base-content/40 font-bold">No reviews yet. Be the first to share your experience!</p>
//                 </div>
//             )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;