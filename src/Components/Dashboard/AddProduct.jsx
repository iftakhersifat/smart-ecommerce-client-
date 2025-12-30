import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaCloudUploadAlt, FaTag, FaDollarSign, FaLayerGroup, FaImage, FaStar, FaListAlt } from "react-icons/fa";

const AddProduct = () => {
    const [preview, setPreview] = useState({
        name: "Product Name",
        price: 0,
        image: "https://via.placeholder.com/300",
        category: "Category",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPreview({ ...preview, [name]: value });
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        const form = e.target;

        const newProduct = {
            title: form.name.value,
            price: parseFloat(form.price.value),
            description: form.description.value,
            category: form.category.value,
            image: form.image.value,
            rating: {
                rate: parseFloat(form.rate.value) || 4.0,
                count: parseInt(form.count.value) || 0
            },
            createdAt: new Date(),
        };

        axios.post("http://localhost:5000/products", newProduct)
            .then((res) => {
                if (res.data.insertedId) {
                    Swal.fire({
                        title: "Added to Inventory!",
                        text: "Product is now live on your store.",
                        icon: "success",
                        confirmButtonColor: "#4F46E5",
                        background: document.documentElement.getAttribute('data-theme') === 'dark' ? '#1f2937' : '#fff',
                        color: document.documentElement.getAttribute('data-theme') === 'dark' ? '#fff' : '#000',
                    });
                    form.reset();
                    setPreview({ name: "Product Name", price: 0, image: "https://via.placeholder.com/300", category: "Category" });
                }
            })
            .catch(() => Swal.fire("Error", "Check your backend connection", "error"));
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 lg:p-12 transition-colors duration-300">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-10">
                    
                    {/* 1. Add Product Form */}
                    <div className="flex-1 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden">
                        <div className="bg-indigo-600 p-8 text-white">
                            <h2 className="text-3xl font-black tracking-tight flex items-center gap-3">
                                <FaCloudUploadAlt /> LIST NEW ITEM
                            </h2>
                            <p className="text-indigo-100 opacity-80 mt-1">Populate your inventory with new stock</p>
                        </div>

                        <form onSubmit={handleAddProduct} className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Product Title */}
                                <div className="form-control">
                                    <label className="label text-xs font-black text-slate-400 uppercase tracking-widest"><FaTag className="mr-2"/> Product Title</label>
                                    <input type="text" name="name" onChange={handleInputChange} placeholder="e.g. Fjallraven Backpack" className="input bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-indigo-500 rounded-2xl" required />
                                </div>

                                {/* Category */}
                                <div className="form-control">
                                    <label className="label text-xs font-black text-slate-400 uppercase tracking-widest"><FaLayerGroup className="mr-2"/> Category</label>
                                    <select name="category" onChange={handleInputChange} className="select bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-indigo-500 rounded-2xl" required>
                                        <option value="electronics">Electronics</option>
                                        <option value="men's clothing">Men's Clothing</option>
                                        <option value="women's clothing">Women's Clothing</option>
                                        <option value="jewelery">Jewelery</option>
                                    </select>
                                </div>

                                {/* Price */}
                                <div className="form-control">
                                    <label className="label text-xs font-black text-slate-400 uppercase tracking-widest"><FaDollarSign className="mr-2"/> Unit Price</label>
                                    <input type="number" step="0.01" name="price" onChange={handleInputChange} placeholder="109.95" className="input bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-indigo-500 rounded-2xl" required />
                                </div>

                                {/* Image URL */}
                                <div className="form-control">
                                    <label className="label text-xs font-black text-slate-400 uppercase tracking-widest"><FaImage className="mr-2"/> Image Resource URL</label>
                                    <input type="text" name="image" onChange={handleInputChange} placeholder="https://..." className="input bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-indigo-500 rounded-2xl" required />
                                </div>

                                {/* Rating Rate */}
                                <div className="form-control">
                                    <label className="label text-xs font-black text-slate-400 uppercase tracking-widest"><FaStar className="mr-2 text-amber-500"/> Default Rating (0-5)</label>
                                    <input type="number" step="0.1" max="5" name="rate" defaultValue="4.0" className="input bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-indigo-500 rounded-2xl" />
                                </div>

                                {/* Rating Count */}
                                <div className="form-control">
                                    <label className="label text-xs font-black text-slate-400 uppercase tracking-widest"><FaListAlt className="mr-2"/> Initial Review Count</label>
                                    <input type="number" name="count" defaultValue="0" className="input bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-indigo-500 rounded-2xl" />
                                </div>
                            </div>

                            {/* Description */}
                            <div className="form-control">
                                <label className="label text-xs font-black text-slate-400 uppercase tracking-widest">Description & Specification</label>
                                <textarea name="description" placeholder="Write detailed product information here..." className="textarea bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-indigo-500 rounded-2xl h-32 py-4" required></textarea>
                            </div>

                            <button type="submit" className="btn w-full bg-indigo-600 hover:bg-indigo-700 text-white border-none rounded-2xl h-14 text-lg font-bold shadow-lg shadow-indigo-200 dark:shadow-none">
                                Publish Product to Store
                            </button>
                        </form>
                    </div>

                    {/* 2. Live Preview Sidebar */}
                    <div className="hidden lg:block w-80">
                        <div className="sticky top-28">
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 px-4">Live Preview Card</p>
                            <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-2xl shadow-indigo-100 dark:shadow-none">
                                <div className="h-64 bg-white p-10 flex items-center justify-center">
                                    <img src={preview.image} alt="preview" className="max-h-full object-contain transition-transform duration-500 hover:scale-110" />
                                </div>
                                <div className="p-6 space-y-3">
                                    <span className="badge bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 border-none font-bold uppercase text-[10px]">{preview.category}</span>
                                    <h3 className="font-bold text-slate-800 dark:text-slate-200 line-clamp-2">{preview.name}</h3>
                                    <div className="flex justify-between items-center pt-2">
                                        <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">${preview.price}</span>
                                        <div className="flex items-center gap-1 text-amber-500 text-sm font-bold">
                                            <FaStar /> 4.0
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AddProduct;