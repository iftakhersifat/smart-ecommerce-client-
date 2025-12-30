import React, { useEffect, useState } from 'react';
import HeroSlider from './HeroSlider';
import Products from '../Products/Products';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/products")
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
      (<div className="text-center py-20 text-gray-500">No products found in the database.</div>)}
    </div>
  );
};

export default Home;