import React, { useEffect, useState } from 'react';
import HeroSlider from './HeroSlider';
import Products from './Products';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch products:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center mt-20">Loading products...</div>;
  }

  return (
    <div>
      <HeroSlider />
      <Products products={products} />
    </div>
  );
};

export default Home;
