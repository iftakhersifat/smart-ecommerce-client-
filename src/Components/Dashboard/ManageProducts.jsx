import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ManageProducts = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = () => axios.get('http://localhost:5000/products').then(res => setProducts(res.data));
    useEffect(() => { fetchProducts(); }, []);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This product will be removed!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!"
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
        <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-bold">Inventory Management</h2>
                <button className="btn btn-primary btn-sm">Add New Product</button>
            </div>
            <table className="table w-full">
                <thead className="bg-gray-50">
                    <tr>
                        <th>Image</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th className="text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(p => (
                        <tr key={p._id}>
                            <td><img src={p.image} className="w-12 h-12 rounded" /></td>
                            <td className="font-bold">{p.name}</td>
                            <td>${p.price}</td>
                            <td className="text-right flex justify-end gap-2">
                                <button className="btn btn-ghost btn-xs text-info">Edit</button>
                                <button onClick={() => handleDelete(p._id)} className="btn btn-ghost btn-xs text-error">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default ManageProducts;