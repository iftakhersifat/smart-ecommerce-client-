import React, { useEffect, useState, useContext } from "react";
import { FaShoppingCart, FaStar, FaStarHalfAlt, FaChevronLeft, FaPaperPlane, FaTrash, FaEdit, FaExchangeAlt } from "react-icons/fa";
import { FaHeart, FaShieldHalved, FaTruckFast } from "react-icons/fa6";
import { useParams, useNavigate } from "react-router";
import Swal from 'sweetalert2';
import { AuthContext } from '../Firebase/AuthProvider';
import AIRecommendations from "./AIRecommendations"; // Ensure the path is correct

const renderStars = (rate = 0) => {
  const fullStars = Math.floor(rate);
  const hasHalfStar = rate % 1 !== 0;
  return (
    <div className="flex items-center gap-0.5 text-amber-400">
      {[...Array(5)].map((_, i) => (
        <span key={i} className="text-sm">
          {i < fullStars ? <FaStar /> : (i === fullStars && hasHalfStar ? <FaStarHalfAlt /> : <FaStar className="text-gray-300 dark:text-gray-600" />)}
        </span>
      ))}
    </div>
  );
};

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewComment, setReviewComment] = useState("");
  const [rating, setRating] = useState(5);

  const fetchProductData = async () => {
    try {
      const productRes = await fetch(`http://localhost:5000/products/${id}`);
      const productData = await productRes.json();
      setProduct(productData);

      const reviewRes = await fetch(`http://localhost:5000/reviews/${id}`);
      const reviewData = await reviewRes.json();
      setReviews(reviewData);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
    window.scrollTo(0, 0); // Scroll to top when product changes
  }, [id]);

  const handleAddToWishlist = async () => {
    if (!user) return Swal.fire("Login Required", "Please login!", "warning");
    const wishlistItem = { productId: product._id, title: product.title, price: product.price, image: product.image, userEmail: user?.email };
    try {
      const res = await fetch(`http://localhost:5000/wishlist`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(wishlistItem)
      });
      const data = await res.json();
      Swal.fire({ title: data.insertedId ? "Added!" : (data.message || "Info"), icon: data.insertedId ? "success" : "info", toast: true, position: 'top-end', showConfirmButton: false, timer: 2500 });
    } catch (error) { console.error(error); }
  };

  const handleAddToCompare = async () => {
    if (!user) return Swal.fire("Login Required", "Please login!", "warning");
    const compareItem = { productId: product._id, title: product.title, price: product.price, image: product.image, category: product.category, userEmail: user?.email };
    try {
      const res = await fetch(`http://localhost:5000/compare`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(compareItem)
      });
      const data = await res.json();
      Swal.fire({ title: data.insertedId ? "Added to Compare!" : "Already added", icon: "success", toast: true, position: 'top-end', showConfirmButton: false, timer: 2500 });
    } catch (error) { console.error(error); }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) return Swal.fire("Login Required", "Please login to write a review!", "warning");
    
    const reviewInfo = {
      productId: id,
      user: user?.displayName || "Anonymous",
      email: user?.email,
      rating: rating,
      comment: reviewComment,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    try {
      const res = await fetch(`http://localhost:5000/reviews`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(reviewInfo)
      });
      const data = await res.json();
      if (data.insertedId) {
        setReviewComment("");
        fetchProductData();
        Swal.fire({ title: "Review Shared!", icon: "success", toast: true, position: 'top-end', showConfirmButton: false, timer: 3000 });
      }
    } catch (error) { console.error(error); }
  };

  const handleDeleteReview = (rev) => {
    Swal.fire({
      title: "Remove Review?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`http://localhost:5000/reviews/${rev._id}`, { method: 'DELETE' });
          const data = await res.json();
          if (data.deletedCount > 0) {
            Swal.fire({ title: "Deleted", icon: "success", toast: true, position: 'top-end', showConfirmButton: false, timer: 2000 });
            fetchProductData();
          }
        } catch (error) { console.error(error); }
      }
    });
  };

  const handleUpdateReview = async (rev) => {
    const isDark = document.documentElement.classList.contains('dark');
    const { value: formValues } = await Swal.fire({
      title: 'Edit Review',
      background: isDark ? '#1e293b' : '#fff',
      color: isDark ? '#f1f5f9' : '#000',
      html:
        `<div class="text-left"><label class="text-xs font-semibold">Comment</label>` +
        `<textarea id="swal-input-comment" class="w-full border dark:bg-slate-800 rounded-lg p-3 mt-1 text-sm h-24 outline-none">${rev.comment}</textarea>` +
        `<label class="text-xs font-semibold mt-4 block">Rating</label>` +
        `<select id="swal-input-rating" class="w-full border dark:bg-slate-800 rounded-lg p-2 mt-1 text-sm outline-none">
          <option value="5" ${rev.rating === 5 ? 'selected' : ''}>5 Stars</option>
          <option value="4" ${rev.rating === 4 ? 'selected' : ''}>4 Stars</option>
          <option value="3" ${rev.rating === 3 ? 'selected' : ''}>3 Stars</option>
          <option value="2" ${rev.rating === 2 ? 'selected' : ''}>2 Stars</option>
          <option value="1" ${rev.rating === 1 ? 'selected' : ''}>1 Star</option>
        </select></div>`,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => ({
          newComment: document.getElementById('swal-input-comment').value,
          newRating: parseInt(document.getElementById('swal-input-rating').value)
      })
    });

    if (formValues) {
      try {
        const res = await fetch(`http://localhost:5000/reviews/${rev._id}`, {
          method: 'PATCH',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(formValues)
        });
        const data = await res.json();
        if (data.modifiedCount > 0) {
          Swal.fire({ title: "Updated", icon: "success", toast: true, position: 'top-end', showConfirmButton: false, timer: 2000 });
          fetchProductData();
        }
      } catch (error) { console.error(error); }
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950"><div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="bg-slate-50 -mb-24 -mt-24 pt-24 pb-24 dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 py-8">
        
        {/* Navigation */}
        <button onClick={() => navigate(-1)} className="group flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-medium text-sm mb-8">
          <FaChevronLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Catalog
        </button>

        {/* Main Product Section */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            <div className="lg:col-span-6 p-8 lg:p-12 flex items-center justify-center relative border-r dark:border-slate-800">
              <span className="absolute top-8 left-8 bg-indigo-600/10 text-indigo-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">Premium Selection</span>
              <div className="relative group">
                <img src={product.image} alt={product.title} className="w-full max-w-sm h-auto object-contain hover:scale-110 transition-transform duration-700 ease-in-out" />
                <div className="absolute inset-0 bg-indigo-500/5 blur-3xl rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>

            <div className="lg:col-span-6 p-8 lg:p-16 flex flex-col justify-center bg-slate-50/30 dark:bg-slate-900/50">
              <div className="mb-2 text-xs font-black text-indigo-500 uppercase tracking-[0.2em]">{product.category}</div>
              <h1 className="text-3xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">{product.title}</h1>
              
              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-4xl font-black text-indigo-600">${product.price}</span>
                <span className="text-slate-300 dark:text-slate-600 line-through text-xl font-bold">${(product.price * 1.2).toFixed(2)}</span>
              </div>

              <p className="text-slate-600 dark:text-slate-400 text-lg mb-10 pl-6 border-l-4 border-indigo-600/20 leading-relaxed italic">"{product.description}"</p>

              <div className="flex flex-wrap items-center gap-4 mb-10">
                <button onClick={() => navigate(`/checkout/${id}`)} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl h-14 flex items-center justify-center gap-3 shadow-xl shadow-indigo-200 dark:shadow-none active:scale-95 transition-all uppercase text-sm tracking-widest">
                  <FaShoppingCart /> Purchase Now
                </button>
                <button onClick={handleAddToWishlist} className="w-14 h-14 bg-rose-50 dark:bg-rose-500/10 text-rose-500 rounded-2xl flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all shadow-sm"><FaHeart /></button>
                <button onClick={handleAddToCompare} className="w-14 h-14 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all shadow-sm"><FaExchangeAlt /></button>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-8 border-t dark:border-slate-800">
                <div className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-500/10 text-green-600 flex items-center justify-center group-hover:scale-110 transition-transform"><FaTruckFast /></div>
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Free Express Shipping</div>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform"><FaShieldHalved /></div>
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">2-Year Official Warranty</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- AI Recommendations Section --- */}
        <div className="mt-20">
            <AIRecommendations currentProduct={product} />
        </div>

        {/* Review Section */}
        <div className="mt-24 grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between mb-10">
                <h2 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                  Customer Reviews 
                </h2>
                <span className="bg-indigo-600 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg shadow-indigo-200 dark:shadow-none">{reviews.length} total</span>
            </div>

            {reviews.length > 0 ? (
              <div className="space-y-6">
                {reviews.map((rev) => (
                  <div key={rev._id} className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border dark:border-slate-800 shadow-sm relative group hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-lg uppercase shadow-lg shadow-indigo-100 dark:shadow-none">{rev.user.substring(0, 1)}</div>
                        <div>
                          <h4 className="font-bold text-slate-800 dark:text-slate-100 text-base">{rev.user}</h4>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{rev.date}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-3">
                        {renderStars(rev.rating)}
                        {user?.email === rev.email && (
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleUpdateReview(rev)} className="p-2 text-indigo-500 hover:bg-indigo-50 dark:hover:bg-slate-800 rounded-xl transition-colors"><FaEdit size={14} /></button>
                            <button onClick={() => handleDeleteReview(rev)} className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-slate-800 rounded-xl transition-colors"><FaTrash size={14} /></button>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="relative">
                        <span className="absolute -top-2 -left-2 text-4xl text-indigo-100 dark:text-slate-800 font-serif">“</span>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed relative z-10 pl-4">{rev.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800 py-24 text-center">
                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                    <FaPaperPlane size={24} />
                </div>
                <p className="text-slate-500 font-medium tracking-wide">No reviews yet. Share your experience!</p>
              </div>
            )}
          </div>

          {/* Leave a Review Form */}
          <div className="lg:col-span-5">
            <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[2.5rem] border dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none sticky top-12">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Write Feedback</h3>
              <p className="text-slate-400 text-xs font-medium mb-8 uppercase tracking-widest">Share your thoughts with us</p>
              
              {user ? (
                <form onSubmit={handleReviewSubmit} className="space-y-8">
                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase mb-4 block tracking-[0.2em]">Select Rating</label>
                    <div className="rating rating-md gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <input key={star} type="radio" name="rating-star" className="mask mask-star-2 bg-amber-400" checked={rating === star} onChange={() => setRating(star)} />
                      ))}
                    </div>
                  </div>
                  <div className="relative">
                    <textarea 
                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-[1.5rem] p-6 text-sm h-40 text-slate-800 dark:text-slate-200 outline-none focus:ring-2 ring-indigo-500/20 transition-all resize-none font-medium" 
                        placeholder="Your feedback matters..." required value={reviewComment} onChange={(e) => setReviewComment(e.target.value)}
                    ></textarea>
                  </div>
                  <button type="submit" className="w-full bg-indigo-600 hover:bg-slate-900 dark:hover:bg-indigo-500 text-white font-black rounded-2xl h-16 flex items-center justify-center gap-3 transition-all uppercase text-xs tracking-[0.15em] shadow-xl shadow-indigo-100 dark:shadow-none">
                    <FaPaperPlane className="text-sm" /> Post My Review
                  </button>
                </form>
              ) : (
                <div className="text-center bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] p-10 border border-slate-100 dark:border-slate-800">
                  <p className="text-slate-500 text-sm font-medium mb-8 leading-relaxed">Join our community to leave a review and share your opinion!</p>
                  <button onClick={() => navigate('/login')} className="w-full bg-white dark:bg-slate-900 border-2 border-slate-900 dark:border-slate-700 font-black py-4 rounded-2xl hover:bg-slate-900 hover:text-white transition-all uppercase text-xs tracking-widest shadow-sm">Login to Continue</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;