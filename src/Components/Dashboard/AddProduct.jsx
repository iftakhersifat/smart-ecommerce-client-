import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { 
    FaCloudUploadAlt, FaTag, FaDollarSign, FaLayerGroup, 
    FaImage, FaSpinner, FaInfoCircle, FaCheckCircle 
} from "react-icons/fa";

const image_hosting_key = "d4f6b241561ed775667ce1666941a5ff"; 
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddProduct = () => {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState({
        name: "Product Name",
        price: 0,
        image: "https://via.placeholder.com/300",
        category: "electronics",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPreview({ ...preview, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview({ ...preview, image: URL.createObjectURL(file) });
        }
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        setUploading(true);
        const form = e.target;
        const imageFile = form.image.files[0];

        try {
            const formData = new FormData();
            formData.append('image', imageFile);

            const res = await axios.post(image_hosting_api, formData, {
                headers: { 'content-type': 'multipart/form-data' }
            });

            if (res.data.success) {
                const imageUrl = res.data.data.display_url;

                const newProduct = {
                    title: form.name.value,
                    price: parseFloat(form.price.value),
                    description: form.description.value,
                    category: form.category.value,
                    image: imageUrl, 
                    createdAt: new Date(),
                };

                const productRes = await axios.post("https://smart-ecommerce-server.vercel.app/products", newProduct);
                
                if (productRes.data.insertedId) {
                    Swal.fire({
                        title: "Success!",
                        text: "New product has been added to the catalog.",
                        icon: "success",
                        confirmButtonColor: "#6366f1",
                        background: document.documentElement.classList.contains('dark') ? '#0f172a' : '#fff',
                        color: document.documentElement.classList.contains('dark') ? '#f8fafc' : '#1e293b',
                    });
                    form.reset();
                    setPreview({ name: "Product Name", price: 0, image: "https://via.placeholder.com/300", category: "electronics" });
                }
            }
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Something went wrong during upload", "error");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="min-h-screen p-4 lg:p-10 transition-all duration-500">
            <div className="max-w-7xl mx-auto">
                
                {/* Header Section */}
                <div className="mb-10">
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Inventory Management</h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Create and publish new products to your digital storefront.</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    
                    <div className="flex-1">
                        <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-indigo-500/10 border border-slate-200 dark:border-slate-800 p-8 lg:p-12 relative overflow-hidden">
                            
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>

                            <form onSubmit={handleAddProduct} className="space-y-8">
                                
                                {/* Title */}
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
                                        <FaCloudUploadAlt size={20} />
                                    </div>
                                    <h2 className="text-xl font-bold dark:text-white">Product Information</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Product Title */}
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[2px] ml-1 flex items-center gap-2">
                                            <FaTag className="text-indigo-500" /> Item Title
                                        </label>
                                        <input 
                                            type="text" name="name" onChange={handleInputChange} 
                                            placeholder="e.g. Minimalist Wooden Chair" 
                                            className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl p-4 outline-none transition-all dark:text-white" required />
                                    </div>

                                    {/* Category */}
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[2px] ml-1 flex items-center gap-2">
                                            <FaLayerGroup className="text-indigo-500" /> Category
                                        </label>
                                        <select 
                                            name="category" onChange={handleInputChange} 
                                            className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:border-indigo-500 rounded-2xl p-4 outline-none transition-all dark:text-white appearance-none" required>
                                            <option value="electronics">Electronics</option>
                                            <option value="men's clothing">Men's Clothing</option>
                                            <option value="women's clothing">Women's Clothing</option>
                                            <option value="jewelery">Jewelery</option>
                                        </select>
                                    </div>

                                    {/* Price */}
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[2px] ml-1 flex items-center gap-2">
                                            <FaDollarSign className="text-indigo-500" /> Price (USD)
                                        </label>
                                        <input 
                                            type="number" step="0.01" name="price" onChange={handleInputChange} 
                                            placeholder="0.00" 
                                            className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:border-indigo-500 rounded-2xl p-4 outline-none transition-all dark:text-white" required 
                                        />
                                    </div>

                                    {/* Image */}
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[2px] ml-1 flex items-center gap-2">
                                            <FaImage className="text-indigo-500" /> Media Resource
                                        </label>
                                        <div className="relative">
                                            <input type="file" name="image" accept="image/*" onChange={handleImageChange}
                                                className="hidden" id="file-upload" required />
                                            <label htmlFor="file-upload" className="flex items-center justify-between w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 cursor-pointer hover:border-indigo-500 transition-colors group">
                                                <span className="text-slate-400 group-hover:text-indigo-500 transition-colors">Select from Gallery</span>
                                                <FaCloudUploadAlt className="text-slate-400 group-hover:text-indigo-500" />
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[2px] ml-1 flex items-center gap-2">
                                        <FaInfoCircle className="text-indigo-500" /> Detailed Description
                                    </label>
                                    <textarea 
                                        name="description" 
                                        placeholder="Enter product specifications, materials, and features..." 
                                        className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:border-indigo-500 rounded-3xl p-5 h-40 outline-none transition-all dark:text-white resize-none" required
                                    ></textarea>
                                </div>

                                {/* Button */}
                                <button 
                                    type="submit" disabled={uploading}
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl h-16 text-sm uppercase tracking-[3px] shadow-xl shadow-indigo-600/20 active:scale-[0.98] transition-all disabled:bg-slate-300 dark:disabled:bg-slate-800 flex items-center justify-center gap-3">
                                    {uploading ? <><FaSpinner className="animate-spin" /> Processing Upload</> : "Publish to Storefront"}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Preview Sidebar */}
                    <div className="lg:w-[400px]">
                        <div className="sticky top-10">
                            <div className="flex items-center justify-between mb-6 px-4">
                                <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Live Marketplace Preview</span>
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                                    <div className="w-2 h-2 rounded-full bg-indigo-300"></div>
                                    <div className="w-2 h-2 rounded-full bg-indigo-100"></div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 p-4 shadow-2xl relative overflow-hidden group">
                                {/* Badge */}
                                <div className="absolute top-8 left-8 z-10">
                                    <span className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase border border-indigo-100 dark:border-indigo-900/50 shadow-sm">
                                        {preview.category}
                                    </span>
                                </div>

                                {/* Image Container */}
                                <div className="bg-slate-100 dark:bg-slate-800 rounded-[2.5rem] aspect-square flex items-center justify-center overflow-hidden mb-6">
                                    <img 
                                        src={preview.image} alt="preview" 
                                        className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-700"/>
                                </div>

                                {/* Details */}
                                <div className="px-4 pb-6 space-y-4">
                                    <h3 className="text-2xl font-bold text-slate-800 dark:text-white line-clamp-1">{preview.name}</h3>
                                    
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-slate-400 text-xs font-bold uppercase">Price</span>
                                            <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400">${preview.price}</span>
                                        </div>
                                        <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg">
                                            <FaCheckCircle size={20} />
                                        </div>
                                    </div>
                                    
                                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                                        <p className="text-slate-400 text-[11px] leading-relaxed italic">
                                            "This is a visual representation of how your product will appear to customers."
                                        </p>
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