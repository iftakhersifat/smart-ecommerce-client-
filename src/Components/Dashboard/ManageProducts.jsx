import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
// FaSync আইকনটি যোগ করা হয়েছে
import { FaTrashAlt, FaEdit, FaPlus, FaSearch, FaBoxOpen, FaLayerGroup, FaSave, FaSync } from "react-icons/fa";
import { Link } from "react-router"; 

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false); // রিফ্রেশ অ্যানিমেশনের জন্য
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);

    const fetchProducts = () => {
        setLoading(true);
        setIsRefreshing(true);
        axios.get('http://localhost:5000/products')
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

    const handleUpdate = (e) => {
        e.preventDefault();
        const form = e.target;
        const updatedInfo = {
            title: form.title.value,
            price: parseFloat(form.price.value),
            category: form.category.value,
            image: form.image.value,
            description: form.description.value,
        };

        axios.patch(`http://localhost:5000/products/${selectedProduct._id}`, updatedInfo)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Updated!",
                        text: "Product details saved successfully.",
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false
                    });
                    fetchProducts();
                    document.getElementById('edit_modal').close();
                }
            });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This product will be permanently removed!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#EF4444",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5000/products/${id}`).then(() => {
                    Swal.fire("Deleted!", "Product has been removed.", "success");
                    fetchProducts();
                });
            }
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 lg:p-10 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                
                {/* Header Section */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-3xl font-black text-slate-800 dark:text-white flex items-center gap-3">
                            <FaBoxOpen className="text-indigo-600" /> Inventory Management
                        </h2>
                        <div className="flex items-center gap-3 mt-1">
                            <p className="text-slate-500 dark:text-slate-400 font-medium">Total Items: {products.length}</p>
                            
                            {/* Refresh Button */}
                            <button 
                                onClick={fetchProducts} 
                                title="Refresh Data"
                                className={`p-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-indigo-600 transition-all ${isRefreshing ? 'animate-spin' : ''}`}
                            >
                                <FaSync size={12} />
                            </button>
                        </div>
                    </div>
                    <Link to="/admin/add-product" className="btn bg-indigo-600 hover:bg-indigo-700 text-white border-none rounded-2xl gap-2 px-6">
                        <FaPlus /> Add New Product
                    </Link>
                </div>

                {/* Search Bar */}
                <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl shadow-sm mb-6 flex gap-4">
                    <div className="relative flex-1">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Search products..." 
                            className="input w-full pl-12 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-100 dark:border-slate-800">
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead className="bg-slate-50 dark:bg-slate-800">
                                <tr className="text-slate-500 dark:text-slate-400 uppercase text-[11px] tracking-widest">
                                    <th className="py-6 px-8">Preview</th>
                                    <th>Product Details</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th className="text-right px-8">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading && !isRefreshing ? (
                                    <tr><td colSpan="5" className="text-center py-20"><span className="loading loading-spinner text-indigo-600"></span></td></tr>
                                ) : filteredProducts.map(p => (
                                    <tr key={p._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-all border-b dark:border-slate-800">
                                        <td className="py-4 px-8">
                                            <div className="w-16 h-16 bg-white rounded-2xl p-2 shadow-sm flex items-center justify-center border border-slate-100 dark:border-slate-700">
                                                <img src={p.image} className="max-h-full object-contain" alt="" />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="font-bold text-slate-800 dark:text-slate-200">{p.title || p.name}</div>
                                            <div className="text-[10px] text-slate-400 uppercase font-bold">#{p._id.slice(-6)}</div>
                                        </td>
                                        <td>
                                            <span className="badge bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-none px-3 py-3 gap-2">
                                                <FaLayerGroup size={10} /> {p.category}
                                            </span>
                                        </td>
                                        <td><span className="text-lg font-black text-indigo-600">${p.price}</span></td>
                                        <td className="text-right px-8">
                                            <div className="flex justify-end gap-2">
                                                <button 
                                                    onClick={() => {
                                                        setSelectedProduct(p);
                                                        document.getElementById('edit_modal').showModal();
                                                    }}
                                                    className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                                                >
                                                    <FaEdit size={16} />
                                                </button>
                                                <button onClick={() => handleDelete(p._id)} className="p-3 bg-rose-50 dark:bg-rose-900/20 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all shadow-sm">
                                                    <FaTrashAlt size={16} />
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

            {/* --- EDIT MODAL --- */}
            <dialog id="edit_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box bg-white dark:bg-slate-900 rounded-[2.5rem] p-0 overflow-hidden max-w-2xl border border-slate-200 dark:border-slate-800 shadow-2xl">
                    <div className="bg-indigo-600 p-6 text-white flex justify-between items-center">
                        <h3 className="font-black text-xl flex items-center gap-2 tracking-tight">
                            <FaEdit /> UPDATE PRODUCT
                        </h3>
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost text-white">✕</button>
                        </form>
                    </div>

                    {selectedProduct && (
                        <form key={selectedProduct?._id} onSubmit={handleUpdate} className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="form-control">
                                    <label className="label text-[10px] font-black text-slate-400 uppercase tracking-widest">Product Title</label>
                                    <input name="title" defaultValue={selectedProduct.title || selectedProduct.name} className="input bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 h-12" required />
                                </div>
                                <div className="form-control">
                                    <label className="label text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</label>
                                    <input name="category" defaultValue={selectedProduct.category} className="input bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 h-12" required />
                                </div>
                                <div className="form-control">
                                    <label className="label text-[10px] font-black text-slate-400 uppercase tracking-widest">Price ($)</label>
                                    <input type="number" step="0.01" name="price" defaultValue={selectedProduct.price} className="input bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 h-12" required />
                                </div>
                                <div className="form-control">
                                    <label className="label text-[10px] font-black text-slate-400 uppercase tracking-widest">Image URL</label>
                                    <input name="image" defaultValue={selectedProduct.image} className="input bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 h-12" required />
                                </div>
                            </div>
                            <div className="form-control">
                                <label className="label text-[10px] font-black text-slate-400 uppercase tracking-widest">Description</label>
                                <textarea name="description" defaultValue={selectedProduct.description} className="textarea bg-slate-50 dark:bg-slate-800 border-none rounded-xl h-28 focus:ring-2 focus:ring-indigo-500 py-4" required></textarea>
                            </div>

                            <div className="modal-action mt-8">
                                <button type="submit" className="btn bg-indigo-600 hover:bg-indigo-700 text-white border-none rounded-2xl w-full h-14 text-lg font-bold gap-2">
                                    <FaSave /> Save Changes
                                </button>
                            </div>
                        </form>
                    )}
                </div>
                <form method="dialog" className="modal-backdrop bg-slate-900/40 backdrop-blur-sm">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default ManageProducts;