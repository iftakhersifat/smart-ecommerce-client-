import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router";

const Products = ({ products }) => {
  return (
    <div className="py-20">
      <div className="max-w-6xl mx-auto px-6 md:px-6 lg:px-0">

        {/* title & description section */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-bold tracking-widest uppercase text-xs">Our Collection</span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-2 italic">
            Featured <span className="text-primary">Products</span>
          </h2>
          <div className="mt-4 h-1.5 w-20 bg-linear-to-r from-primary to-secondary mx-auto rounded-full"></div>
        </div>

        {/* show products */}
        <div className="grid gap-8 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
          {products?.map((product) => (
            <div key={product._id || product.id}
              className="group flex flex-col bg-base-100 rounded-3xl overflow-hidden border border-base-300 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">

              {/* image section */}
              <div className="relative h-64 w-full bg-white overflow-hidden">
                <img src={product.image} alt={product.title}
                  className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-110" />
                
                {/* dark overlay */}
                 <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-80"></div>

                {/* price */}
                <span className="absolute top-4 right-4 bg-primary text-primary-content px-4 py-1 rounded-full font-semibold text-sm shadow-lg">${product.price}
                </span>
              </div>

              {/* Content Section */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex-grow">
                   <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">{product.title}
                      </h3>
                   </div>

                  <p className="text-sm text-base-content/60 line-clamp-2 mb-4">
                    {product.description}
                  </p>
                </div>

                {/* button section */}
                <div className="mt-auto">
                  <Link to={`/products/${product._id}`} className="btn btn-primary btn-block rounded-2xl border-none shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 group-hover:gap-4">
                    View Details <FaArrowRightLong />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* if no products */}
        {products.length === 0 && (
          <div className="text-center py-24 bg-base-100 rounded-3xl border-2 border-dashed border-base-300">
            <h3 className="text-2xl font-semibold text-base-content/50">
              No products available right now.
            </h3>
            <p className="mt-2 text-base-content/40">
              We are restocking soon. Please check back later!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;