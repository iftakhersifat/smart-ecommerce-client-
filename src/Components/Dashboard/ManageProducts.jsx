import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaTrashAlt, FaEdit, FaPlus, FaSearch, FaBoxOpen, FaLayerGroup, FaSave, FaSync, FaDollarSign, FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router";

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [uploading, setUploading] = useState(false);

    const image_hosting_key = "d4f6b241561ed775667ce1666941a5ff";
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

    const fetchProducts = () => {
        setLoading(true);
        setIsRefreshing(true);
        axios.get('https://smart-ecommerce-server.vercel.app/products')
            .then(res => {
                setProducts(res.data);
                setLoading(false);
                setIsRefreshing(false);
            })
            .catch(() => {
                setLoading(false);
                setIsRefreshing(false);
            });
    };

    useEffect(() => { fetchProducts(); }, []);

    const filteredProducts = products.filter(p => 
        (p.title || p.name)?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleUpdate = async (e) => {
        e.preventDefault();
        const form = e.target;
        const imageFile = form.imageInput.files[0];
        let imageUrl = selectedProduct.image;

        if (imageFile) {
            setUploading(true);
            const formData = new FormData();
            formData.append('image', imageFile);

            try {
                const res = await axios.post(image_hosting_api, formData);
                if (res.data.success) {
                    imageUrl = res.data.data.display_url;
                }
            } catch (error) {
                Swal.fire("Error", "Image upload failed!", "error");
                setUploading(false);
                return;
            }
        }

        const updatedInfo = {
            title: form.title.value,
            price: parseFloat(form.price.value),
            category: form.category.value,
            image: imageUrl,
            description: form.description.value,
        };

        axios.patch(`https://smart-ecommerce-server.vercel.app/products/${selectedProduct._id}`, updatedInfo)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Success!",
                        text: "Product updated successfully.",
                        icon: "success",
                        background: '#fff',
                        confirmButtonColor: '#4f46e5'
                    });
                    fetchProducts();
                    document.getElementById('edit_modal').close();
                }
                setUploading(false);
            })
            .catch(() => {
                setUploading(false);
                Swal.fire("Error", "Failed to update", "error");
            });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#64748b",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://smart-ecommerce-server.vercel.app/products/${id}`).then(() => {
                    Swal.fire("Deleted!", "Product removed.", "success");
                    fetchProducts();
                });
            }
        });
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] p-4 md:p-8 lg:p-12 transition-colors duration-500">
            <div className="max-w-7xl mx-auto">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
                            <span className="p-3 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-200 dark:shadow-none">
                                <FaBoxOpen size={24} /></span>Product Inventory</h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium flex items-center gap-2">
                            Manage and monitor your store products ({products.length} items total)
                        </p>
                    </div>
                    {/* <Link to="/admin/add-product" className="group btn bg-indigo-600 hover:bg-indigo-700 text-white border-none rounded-2xl px-6 h-14 shadow-xl shadow-indigo-100 dark:shadow-none transition-all hover:scale-105 active:scale-95">
                        <FaPlus className="group-hover:rotate-90 transition-transform" />
                        <span>Add New Product</span>
                    </Link> */}
                </div>

                {/* Filters & Search */}
                <div className="grid grid-cols-1 gap-4 mb-8">
                    <div className="relative group">
                        <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Search products by title, category or ID..." 
                            className="w-full h-16 pl-14 pr-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all shadow-sm dark:text-white"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="table w-full border-collapse">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 border-b dark:border-slate-800">
                                    <th className="py-6 px-8 text-xs font-bold uppercase tracking-widest">Product</th>
                                    <th className="text-xs font-bold uppercase tracking-widest">Category</th>
                                    <th className="text-xs font-bold uppercase tracking-widest">Price</th>
                                    <th className="text-xs font-bold uppercase tracking-widest text-right px-8">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                                {loading && !isRefreshing ? (
                                    <tr><td colSpan="4" className="py-32 text-center"><span className="loading loading-spinner loading-lg text-indigo-600"></span></td></tr>
                                ) : filteredProducts.map(p => (
                                    <tr key={p._id} className="group hover:bg-slate-50/80 dark:hover:bg-indigo-500/5 transition-colors">
                                        <td className="py-5 px-8">
                                            <div className="flex items-center gap-5">
                                                <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-2 shadow-sm shrink-0 group-hover:scale-110 transition-transform">
                                                    <img src={p.image} className="w-full h-full object-contain" alt="" />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-800 dark:text-slate-200 text-base line-clamp-1">{p.title || p.name}</div>
                                                    <div className="text-[10px] font-bold text-slate-400 mt-1 tracking-wider uppercase">SKU: {p._id.slice(-8)}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold">
                                                <FaLayerGroup className="text-indigo-500" /> {p.category}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="text-lg font-black text-slate-900 dark:text-white flex items-center">
                                                <span className="text-indigo-600 mr-0.5">$</span>{p.price.toFixed(2)}
                                            </div>
                                        </td>
                                        <td className="px-8">
                                            <div className="flex justify-end gap-3">
                                                <button onClick={() => { setSelectedProduct(p); document.getElementById('edit_modal').showModal(); }} className="p-3 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
                                                    <FaEdit size={18} />
                                                </button>
                                                <button onClick={() => handleDelete(p._id)} className="p-3 bg-rose-50 dark:bg-rose-500/10 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all shadow-sm">
                                                    <FaTrashAlt size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <dialog id="edit_modal" className="modal modal-bottom sm:modal-middle backdrop-blur-sm">
                <div className="modal-box p-0 bg-white dark:bg-[#0f172a] max-w-2xl rounded-[2.5rem] overflow-hidden border dark:border-slate-800 shadow-2xl">
                    
                    <div className="relative h-32 bg-indigo-600 flex items-center px-8">
                        <div className="z-10">
                            <h3 className="text-2xl font-black text-white flex items-center gap-3">
                                <FaEdit /> Update Product
                            </h3>
                            <p className="text-indigo-100 text-sm mt-1 font-medium">Modify product information and imagery</p>
                        </div>
                        <form method="dialog" className="absolute right-6 top-6 z-10">
                            <button className="btn btn-sm btn-circle bg-white/20 border-none text-white hover:bg-white/30">✕</button>
                        </form>
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 blur-2xl"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-400/20 rounded-full -ml-16 -mb-16 blur-xl"></div>
                    </div>

                    {selectedProduct && (
                        <form key={selectedProduct?._id} onSubmit={handleUpdate} className="p-8 space-y-8">
                            
                            <div className="flex flex-col md:flex-row items-center gap-8 bg-slate-50 dark:bg-slate-800/40 p-6 rounded-3xl border border-slate-100 dark:border-slate-700">
                                <div className="relative group shrink-0">
                                    <div className="w-32 h-32 rounded-2xl bg-white p-3 shadow-xl overflow-hidden">
                                        <img src={selectedProduct.image} className="w-full h-full object-contain" alt="preview" />
                                    </div>
                                    
                                </div>
                                
                                <div className="flex-1 w-full text-center md:text-left">
                                    <h4 className="font-bold text-slate-800 dark:text-white mb-2">Product Thumbnail</h4>
                                    <p className="text-xs text-slate-500 mb-4 font-medium">JPG, PNG or WEBP. Max 2MB recommended.</p>
                                    <input 
                                        type="file" 
                                        name="imageInput" 
                                        accept="image/*"
                                        className="file-input file-input-bordered file-input-indigo file-input-md w-full max-w-xs bg-white dark:bg-slate-900 rounded-xl"/>
                                </div>
                            </div>

                            {/* Form Fields */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="form-control group">
                                    <label className="label py-0 mb-2">
                                        <span className="label-text text-xs font-black text-slate-400 uppercase flex items-center gap-2">
                                            <FaInfoCircle /> Product Title
                                        </span>
                                    </label>
                                    <input name="title" defaultValue={selectedProduct.title || selectedProduct.name} className="input h-14 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-bold dark:text-white" required />
                                </div>
                                <div className="form-control group">
                                    <label className="label py-0 mb-2">
                                        <span className="label-text text-xs font-black text-slate-400 uppercase flex items-center gap-2">
                                            <FaLayerGroup /> Category
                                        </span>
                                    </label>
                                    <input name="category" defaultValue={selectedProduct.category} className="input h-14 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-bold dark:text-white" required />
                                </div>
                                <div className="form-control group sm:col-span-2">
                                    <label className="label py-0 mb-2">
                                        <span className="label-text text-xs font-black text-slate-400 uppercase flex items-center gap-2">
                                            <FaDollarSign /> Pricing (USD)
                                        </span>
                                    </label>
                                    <input type="number" step="0.01" name="price" defaultValue={selectedProduct.price} className="input h-14 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-bold text-indigo-600 text-lg dark:bg-slate-900" required />
                                </div>
                                <div className="form-control group sm:col-span-2">
                                    <label className="label py-0 mb-2">
                                        <span className="label-text text-xs font-black text-slate-400 uppercase flex items-center gap-2">
                                            <FaInfoCircle /> Detailed Description
                                        </span>
                                    </label>
                                    <textarea name="description" defaultValue={selectedProduct.description} className="textarea min-h-[120px] bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium py-4 leading-relaxed dark:text-white" required></textarea>
                                </div>
                            </div>

                            {/* Button */}
                            <div className="modal-action mt-10">
                                <button 
                                    type="submit" 
                                    disabled={uploading}
                                    className="btn w-full h-16 bg-indigo-600 hover:bg-indigo-700 text-white border-none rounded-2xl text-lg font-black shadow-xl shadow-indigo-200 dark:shadow-none transition-all flex items-center justify-center gap-3 group disabled:bg-indigo-400">
                                    {uploading ? (
                                        <span className="loading loading-spinner loading-md"></span>) : (
                                        <>
                                            <FaSave className="group-hover:scale-125 transition-transform" /> 
                                            Apply Changes
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </dialog>
        </div>
    );
};

export default ManageProducts;