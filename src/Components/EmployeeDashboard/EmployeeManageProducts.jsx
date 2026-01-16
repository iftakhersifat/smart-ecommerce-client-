import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaTrashAlt, FaEdit, FaPlus, FaSearch, FaBoxOpen, FaLayerGroup, FaSave, FaSync } from "react-icons/fa";
import { Link } from "react-router"; 

const EmployeeManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);

    // আপনার AuthContext বা Firebase থেকে লগইন করা ইউজারের ইমেইল এখানে বসবে
    // উদাহরণ: const { user } = useContext(AuthContext);
    // const loggedInUserEmail = user?.email;
    const loggedInUserEmail = "employee@example.com"; 

    const fetchProducts = () => {
        if (!loggedInUserEmail) return;
        
        setLoading(true);
        setIsRefreshing(true);

        // ইমেইল কুয়েরি প্যারামিটার হিসেবে পাঠানো হচ্ছে
        axios.get(`http://localhost:5000/products?email=${loggedInUserEmail}`)
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

    useEffect(() => { 
        fetchProducts(); 
    }, [loggedInUserEmail]); // ইমেইল চেঞ্জ হলে বা পেজ লোড হলে কল হবে

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
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-3 md:p-6 lg:p-10 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white flex items-center gap-3">
                            <FaBoxOpen className="text-indigo-600" /> My Inventory
                        </h2>
                        <div className="flex items-center gap-3 mt-1">
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                                Added by you: {products.length} Items
                            </p>
                            <button 
                                onClick={fetchProducts} 
                                className={`p-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-indigo-600 ${isRefreshing ? 'animate-spin' : ''}`}
                            >
                                <FaSync size={10} />
                            </button>
                        </div>
                    </div>
                    
                    <Link to="/employee/add-product" className="btn btn-sm md:btn-md bg-indigo-600 hover:bg-indigo-700 text-white border-none rounded-xl gap-2 w-full sm:w-auto">
                        <FaPlus /> Add New Item
                    </Link>
                </div>

                {/* Search Bar */}
                <div className="bg-white dark:bg-slate-900 p-3 md:p-4 rounded-2xl shadow-sm mb-6 border border-slate-100 dark:border-slate-800">
                    <div className="relative w-full">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Search in your inventory..." 
                            className="input w-full pl-12 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm md:text-base"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Content Table/Cards */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl md:rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-100 dark:border-slate-800">
                    <div className="hidden md:block overflow-x-auto">
                        <table className="table w-full">
                            <thead className="bg-slate-50 dark:bg-slate-800">
                                <tr className="text-slate-500 dark:text-slate-400 uppercase text-[11px] tracking-widest font-bold">
                                    <th className="py-6 px-8">Preview</th>
                                    <th>Details</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th className="text-right px-8">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading && !isRefreshing ? (
                                    <tr><td colSpan="5" className="text-center py-20"><span className="loading loading-spinner text-indigo-600"></span></td></tr>
                                ) : products.length === 0 ? (
                                    <tr><td colSpan="5" className="text-center py-20 text-slate-400 font-medium">No products found in your inventory.</td></tr>
                                ) : filteredProducts.map(p => (
                                    <tr key={p._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-all border-b dark:border-slate-800">
                                        <td className="py-4 px-8">
                                            <div className="w-14 h-14 bg-white rounded-xl p-2 shadow-sm flex items-center justify-center border border-slate-100">
                                                <img src={p.image} className="max-h-full object-contain" alt="" />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="font-bold text-slate-800 dark:text-slate-200 line-clamp-1">{p.title || p.name}</div>
                                            <div className="text-[10px] text-slate-400 font-bold uppercase">ID: {p._id.slice(-6)}</div>
                                        </td>
                                        <td>
                                            <span className="badge bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-none px-3 py-3 text-[10px] gap-2">
                                                <FaLayerGroup size={10} /> {p.category}
                                            </span>
                                        </td>
                                        <td><span className="text-lg font-black text-indigo-600">${p.price}</span></td>
                                        <td className="text-right px-8">
                                            <div className="flex justify-end gap-2">
                                                <button onClick={() => { setSelectedProduct(p); document.getElementById('edit_modal').showModal(); }} className="p-2.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all"><FaEdit size={14} /></button>
                                                <button onClick={() => handleDelete(p._id)} className="p-2.5 bg-rose-50 dark:bg-rose-900/20 text-rose-600 rounded-lg hover:bg-rose-600 hover:text-white transition-all"><FaTrashAlt size={14} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="md:hidden grid grid-cols-1 divide-y dark:divide-slate-800">
                        {loading && !isRefreshing ? (
                            <div className="text-center py-10"><span className="loading loading-spinner text-indigo-600"></span></div>
                        ) : filteredProducts.map(p => (
                            <div key={p._id} className="p-4 flex gap-4 items-center">
                                <div className="w-20 h-20 bg-white rounded-xl p-2 flex-shrink-0 border dark:border-slate-700 shadow-sm">
                                    <img src={p.image} className="w-full h-full object-contain" alt="" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-slate-800 dark:text-slate-200 truncate">{p.title || p.name}</h4>
                                    <p className="text-xs text-slate-500 mb-1">{p.category}</p>
                                    <p className="text-indigo-600 font-black text-lg">${p.price}</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <button onClick={() => { setSelectedProduct(p); document.getElementById('edit_modal').showModal(); }} className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-lg"><FaEdit size={14} /></button>
                                    <button onClick={() => handleDelete(p._id)} className="p-2 bg-rose-50 dark:bg-rose-900/20 text-rose-600 rounded-lg"><FaTrashAlt size={14} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            <dialog id="edit_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box bg-white dark:bg-slate-900 p-0 max-w-2xl w-full">
                    <div className="bg-indigo-600 p-6 text-white flex justify-between items-center">
                        <h3 className="font-black text-xl flex items-center gap-2">
                            <FaEdit /> UPDATE PRODUCT
                        </h3>
                        <form method="dialog"><button className="btn btn-sm btn-circle btn-ghost text-white">✕</button></form>
                    </div>

                    {selectedProduct && (
                        <form key={selectedProduct?._id} onSubmit={handleUpdate} className="p-8 space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="form-control">
                                    <label className="label text-[10px] font-black text-slate-400 uppercase">Product Title</label>
                                    <input name="title" defaultValue={selectedProduct.title || selectedProduct.name} className="input input-bordered bg-slate-50 dark:bg-slate-800 rounded-xl" required />
                                </div>
                                <div className="form-control">
                                    <label className="label text-[10px] font-black text-slate-400 uppercase">Category</label>
                                    <input name="category" defaultValue={selectedProduct.category} className="input input-bordered bg-slate-50 dark:bg-slate-800 rounded-xl" required />
                                </div>
                                <div className="form-control">
                                    <label className="label text-[10px] font-black text-slate-400 uppercase">Price ($)</label>
                                    <input type="number" step="0.01" name="price" defaultValue={selectedProduct.price} className="input input-bordered bg-slate-50 dark:bg-slate-800 rounded-xl" required />
                                </div>
                                <div className="form-control">
                                    <label className="label text-[10px] font-black text-slate-400 uppercase">Image URL</label>
                                    <input name="image" defaultValue={selectedProduct.image} className="input input-bordered bg-slate-50 dark:bg-slate-800 rounded-xl" required />
                                </div>
                            </div>
                            <div className="form-control">
                                <label className="label text-[10px] font-black text-slate-400 uppercase">Description</label>
                                <textarea name="description" defaultValue={selectedProduct.description} className="textarea textarea-bordered bg-slate-50 dark:bg-slate-800 h-32 rounded-xl" required></textarea>
                            </div>

                            <div className="modal-action">
                                <button type="submit" className="btn bg-indigo-600 hover:bg-indigo-700 text-white w-full h-14 rounded-xl font-bold gap-2 text-lg">
                                    <FaSave /> Save Changes
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </dialog>
        </div>
    );
};

export default EmployeeManageProducts;