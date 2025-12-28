import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { useParams, useNavigate, NavLink } from "react-router";

/* ⭐ Star Renderer */
const renderStars = (rate = 0) => {
  const fullStars = Math.floor(rate);
  const hasHalfStar = rate % 1 !== 0;

  return (
    <div className="flex items-center gap-1 text-orange-400">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={i} />
      ))}
      {hasHalfStar && <FaStarHalfAlt />}
    </div>
  );
};

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  /* ⏳ Loading */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  /* ❌ Not Found */
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold mb-4">Product not found</h2>
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Go back home
        </button>
      </div>
    );
  }

  return (
    <div className="bg-base-100 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-6">

        {/* Breadcrumbs */}
        <div className="breadcrumbs text-sm mb-8 text-base-content/60">
          <ul>
            <li>
              <a onClick={() => navigate("/")} className="cursor-pointer">
                Home
              </a>
            </li>
            <li>
              <NavLink to="/products-list">Products</NavLink>
            </li>
            <li className="font-semibold text-base-content">
              {product.title}
            </li>
          </ul>
        </div>

        {/* Main */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

          {/* Image */}
          <div className="bg-white rounded-3xl p-10 border border-base-200 shadow-sm">
            <img
              src={product.image}
              alt={product.title}
              className="w-full max-h-[480px] object-contain transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Details */}
          <div>
            <span className="badge badge-primary badge-outline uppercase tracking-widest font-bold mb-4">
              Featured Product
            </span>

            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6">
              {renderStars(product.rating?.rate)}
              <span className="text-sm font-medium text-base-content/70">
                {product.rating?.rate} ({product.rating?.count} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-end gap-4 mb-8">
              <span className="text-4xl font-black text-primary">
                ${product.price}
              </span>
              <span className="text-xl text-base-content/40 line-through">
                ${(product.price * 1.25).toFixed(2)}
              </span>
              <span className="badge badge-success">25% OFF</span>
            </div>

            {/* Description */}
            <div className="border-t border-b border-base-200 py-6 mb-8">
              <h3 className="text-xl font-bold mb-3">
                Product Description
              </h3>
              <p className="text-base-content/70 leading-relaxed text-justify">
                {product.description}
              </p>
            </div>

            {/* CTA */}
            <div className="flex flex-col md:flex-row gap-4 mb-12">
              <button className="btn btn-primary btn-lg w-full md:flex-1 rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center gap-3">
                <FaShoppingCart className="text-xl" /> Purchase Now
              </button>

              <button className="btn btn-outline btn-lg w-full md:flex-1 rounded-2xl flex items-center justify-center gap-3">
                <FaHeart className="text-xl text-rose-500" /> Add to Wishlist
              </button>
            </div>

            {/* Customer Reviews */}
            <div>
              <h3 className="text-2xl font-bold mb-6">
                Customer Reviews ({product.reviews?.length || 0})
              </h3>

              {product.reviews?.length > 0 ? (
                <div className="space-y-6">
                  {product.reviews.map(review => (
                    <div
                      key={review._id}
                      className="border rounded-2xl p-5 bg-base-100"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">
                          {review.user}
                        </h4>
                        {renderStars(review.rating)}
                      </div>

                      <p className="text-base-content/70 leading-relaxed">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-base-content/60">
                  No reviews yet.
                </p>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
