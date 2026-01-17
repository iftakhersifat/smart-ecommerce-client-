import React, { useEffect, useState } from 'react';
import HeroSlider from './HeroSlider';
import Products from '../Products/Products';
import axios from 'axios';
import TopBrands from './TopBrands';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://smart-ecommerce-server.vercel.app/products")
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-ring loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-10">
      <HeroSlider />

      {/* product section */}
      {products.length > 0 ? (<Products products={products} />) : 
      (<div className="text-center py-24 bg-base-100 rounded-3xl border-2 border-dashed border-base-300">
        <h3 className="text-2xl font-semibold text-base-content/50">No products available right now.</h3>
        <p className="mt-2 text-base-content/40">We are restocking soon. Please check back later!</p>
      </div>)}

      <TopBrands></TopBrands>
    </div>
  );
};

export default Home;