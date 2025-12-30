import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../Firebase/AuthProvider";
import { FaTruck, FaShieldAlt, FaChevronLeft, FaMapMarkerAlt, FaUser, FaEnvelope, FaShoppingBag } from "react-icons/fa";

const CheckoutPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("editId");

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5000/products/${id}`).then((res) => setProduct(res.data));
    if (editId) {
      axios.get(`http://localhost:5000/orders/single/${editId}`).then((res) => {
        setAddress(res.data.address);
        setQuantity(res.data.quantity);
      });
    }
  }, [id, editId]);

  const handleOrderAction = async (e) => {
    e.preventDefault();
    if (address.length < 10) return Swal.fire("Address too short", "Please provide a valid shipping address", "warning");

    setIsProcessing(true);
    const orderData = {
      productId: id,
      productTitle: product.name || product.title,
      productImage: product.image, // Image link included
      customerEmail: user?.email,
      customerName: user?.displayName,
      quantity,
      totalPrice: (product.price * quantity).toFixed(2),
      address,
      status: "Pending",
      orderDate: new Date(),
    };

    try {
      const apiEndpoint = editId ? `http://localhost:5000/orders/update/${editId}` : `http://localhost:5000/orders`;
      const request = editId ? axios.patch : axios.post;
      const response = await request(apiEndpoint, orderData);

      if (response.data.insertedId || response.data.modifiedCount > 0) {
        Swal.fire({ 
            title: "Success!", 
            text: editId ? "Order details updated." : "Order placed successfully!", 
            icon: "success", 
            timer: 2000,
            showConfirmButton: false
        });
        
        navigate(editId ? "/order-list" : "/order-confirmation", { 
            state: { 
                orderDetails: orderData, 
                orderId: response.data.insertedId || editId 
            } 
        });
      }
    } catch (err) {
      Swal.fire("Error", "Transaction failed. Please try again.", "error");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!product) return <div className="h-screen flex items-center justify-center dark:bg-slate-900"><span className="loading loading-spinner loading-lg text-primary"></span></div>;

  return (
    <div className="bg-[#F8FAFC] -mb-24 dark:bg-slate-950 min-h-screen pb-20 transition-all duration-500">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-primary transition mb-8 font-bold text-sm uppercase tracking-widest">
          <FaChevronLeft /> Back to Shop
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3 mb-10">
              <div className="bg-blue-600 p-3 rounded-lg text-white">
                <FaTruck size={20} />
              </div>
              <div>
                <h2 className="text-2xl font-bold dark:text-white">Shipping Information</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Where should we deliver your order?</p>
              </div>
            </div>

              <form onSubmit={handleOrderAction} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Recipient</label>
                    <div className="relative">
                      <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                      <input type="text" value={user?.displayName} readOnly className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 dark:text-slate-300 outline-none" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                      <input type="text" value={user?.email} readOnly className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 dark:text-slate-300 outline-none" />
                    </div>
                  </div>
                </div>

                 <div className="relative">
                <label className="text-xs font-bold text-gray-400 dark:text-gray-500 mb-2 block uppercase tracking-widest">Full Shipping Address</label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-4 top-4 text-gray-400" />
                  <textarea required rows="4"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none" 
                    placeholder="Street address, apartment, city, and zip code..."
                    value={address} onChange={(e) => setAddress(e.target.value)}/>
                </div>
              </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-2xl flex gap-4 items-center border border-blue-100 dark:border-blue-800">
                <div className="bg-blue-600 text-white p-2 rounded-full">
                  <input type="radio" checked readOnly className="radio radio-xs border-white checked:bg-white" />
                </div>
                <div>
                  <p className="font-bold text-blue-900 dark:text-blue-300 text-lg">Cash on Delivery</p>
                  <p className="text-sm text-blue-700 dark:text-blue-400">No advance payment needed. Pay when you receive.</p>
                </div>
              </div>

                <button disabled={isProcessing} className="btn btn-primary btn-block h-16 rounded-2xl text-lg font-black shadow-2xl shadow-primary/20">
                  {isProcessing ? <span className="loading loading-spinner"></span> : editId ? "Update Information" : "Place Order Now"}
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-5">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-slate-700 sticky top-24">
            <h2 className="text-xl font-bold mb-8 dark:text-white flex items-center justify-between">
              Order Summary
              <span className="text-xs bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded uppercase tracking-tighter">{quantity} Items</span>
            </h2>
            
            <div className="flex gap-5 mb-8">
              <div className="bg-gray-100 dark:bg-slate-700 p-3 rounded-2xl w-24 h-24 flex items-center justify-center">
                <img src={product.image} className="max-w-full max-h-full object-contain mix-blend-multiply dark:mix-blend-normal" alt="" />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="font-bold text-gray-800 dark:text-gray-200 leading-tight text-lg">{product.name || product.title}</h3>
                <p className="text-blue-600 dark:text-blue-400 font-black mt-2 text-xl">${product.price}</p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 dark:text-gray-400 font-medium">Quantity</span>
                <div className="flex items-center gap-5 bg-gray-50 dark:bg-slate-700 px-4 py-2 rounded-xl border dark:border-slate-600">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-gray-400 hover:text-blue-600 font-bold transition">-</button>
                  <span className="font-bold w-6 text-center dark:text-white">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="text-gray-400 hover:text-blue-600 font-bold transition">+</button>
                </div>
              </div>
              
              <div className="flex justify-between text-gray-500 dark:text-gray-400">
                <span>Shipping Charges</span>
                <span className="text-green-600 dark:text-green-400 font-bold">FREE</span>
              </div>

              <div className="h-px bg-gray-100 dark:bg-slate-700 w-full"></div>

              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">Total Amount</p>
                  <p className="text-3xl font-black text-slate-900 dark:text-white leading-none mt-1">${(product.price * quantity).toFixed(2)}</p>
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

export default CheckoutPage;