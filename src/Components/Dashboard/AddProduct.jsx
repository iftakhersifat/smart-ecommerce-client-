import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaCloudUploadAlt } from "react-icons/fa";

const AddProduct = () => {
  const handleAddProduct = (e) => {
    e.preventDefault();
    const form = e.target;
    
    const name = form.name.value;
    const price = parseFloat(form.price.value);
    const category = form.category.value;
    const image = form.image.value;
    const description = form.description.value;

    const newProduct = {
      name,
      price,
      category,
      image,
      description,
      createdAt: new Date(),
    };

    // Backend POST Request
    axios.post("http://localhost:5000/products", newProduct)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Product added to the inventory successfully.",
            icon: "success",
            confirmButtonColor: "#4F46E5",
          });
          form.reset(); // Form clear hobe
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Failed to add product", "error");
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 py-10">
      <div className="card w-full max-w-2xl bg-base-100 shadow-2xl rounded-3xl overflow-hidden">
        <div className="bg-indigo-600 p-6 text-white text-center">
          <h2 className="text-3xl font-black italic flex justify-center items-center gap-3">
            <FaCloudUploadAlt /> ADD NEW PRODUCT
          </h2>
          <p className="text-indigo-100 opacity-80">Fill in the details to list a new item</p>
        </div>

        <form onSubmit={handleAddProduct} className="card-body p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Name */}
            <div className="form-control">
              <label className="label font-bold text-xs uppercase opacity-60">Product Name</label>
              <input type="text" name="name" placeholder="e.g. Smart Watch" className="input input-bordered focus:border-indigo-500" required />
            </div>

            {/* Category */}
            <div className="form-control">
              <label className="label font-bold text-xs uppercase opacity-60">Category</label>
              <select name="category" className="select select-bordered focus:border-indigo-500" required>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Accessories">Accessories</option>
                <option value="Home Decor">Home Decor</option>
              </select>
            </div>

            {/* Price */}
            <div className="form-control">
              <label className="label font-bold text-xs uppercase opacity-60">Price ($)</label>
              <input type="number" step="0.01" name="price" placeholder="29.99" className="input input-bordered focus:border-indigo-500" required />
            </div>

            {/* Image URL */}
            <div className="form-control">
              <label className="label font-bold text-xs uppercase opacity-60">Image URL</label>
              <input type="text" name="image" placeholder="https://image-link.com" className="input input-bordered focus:border-indigo-500" required />
            </div>
          </div>

          {/* Description */}
          <div className="form-control mt-4">
            <label className="label font-bold text-xs uppercase opacity-60">Description</label>
            <textarea name="description" placeholder="Write product details here..." className="textarea textarea-bordered h-32 focus:border-indigo-500" required></textarea>
          </div>

          <div className="form-control mt-8">
            <button type="submit" className="btn btn-neutral bg-indigo-600 hover:bg-indigo-800 text-white border-none text-lg">
              Confirm & Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;