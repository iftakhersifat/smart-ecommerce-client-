import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../Firebase/AuthProvider";
import { FaTruck, FaFileInvoiceDollar, FaPlus, FaMinus } from "react-icons/fa";

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

  // --- Data Fetching Logic ---
  useEffect(() => {
    const loadData = async () => {
      try {
        // 1. Load Product
        const prodRes = await axios.get(`http://localhost:5000/products/${id}`);
        setProduct(prodRes.data);

        // 2. Load existing order info if in Edit Mode
        if (editId) {
          const orderRes = await axios.get(`http://localhost:5000/my-orders?email=${user?.email}`);
          const orderToEdit = orderRes.data.find(o => o._id === editId);
          if (orderToEdit) {
            setAddress(orderToEdit.address);
            setQuantity(orderToEdit.quantity);
          }
        }
      } catch (err) {
        console.error("Data loading error", err);
      }
    };
    loadData();
  }, [id, editId, user?.email]);

  // --- Final Order Submission ---
  const handleOrderAction = async (e) => {
    e.preventDefault();
    if (address.length < 10) return Swal.fire("Invalid Address", "Please provide a detailed shipping address.", "warning");

    setIsProcessing(true);
    const orderPayload = {
      productId: id,
      productTitle: product.title,
      customerEmail: user?.email,
      quantity,
      totalPrice: (product.price * quantity).toFixed(2),
      address,
      status: "Pending",
      orderDate: new Date(),
    };

    try {
      let response;
      if (editId) {
        // Update Logic
        response = await axios.patch(`http://localhost:5000/orders/update/${editId}`, orderPayload);
        if (response.data.modifiedCount > 0) {
          Swal.fire("Success", "Order information updated!", "success");
          navigate("/dashboard/my-orders");
        }
      } else {
        // New Order Logic
        response = await axios.post("http://localhost:5000/orders", orderPayload);
        if (response.data.insertedId) {
          Swal.fire("Order Placed", "Your package is on the way!", "success");
          navigate("/order-confirmation", { state: { orderDetails: orderPayload } });
        }
      }
    } catch (err) {
      Swal.fire("Error", "Something went wrong. Try again.", "error");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!product) return <div className="h-screen flex items-center justify-center"><span className="loading loading-bars loading-lg text-primary"></span></div>;

  return (
    <div className="bg-[#f8f9fa] min-h-screen py-12 font-sans">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* --- Left: Shipping Card --- */}
        <div className="lg:col-span-7 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-primary/10 p-3 rounded-xl text-primary"><FaTruck size={24} /></div>
            <h2 className="text-2xl font-bold">{editId ? "Update Delivery Info" : "Shipping Details"}</h2>
          </div>

          <form onSubmit={handleOrderAction} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control w-full">
                <label className="label font-semibold text-gray-600">Full Name</label>
                <input type="text" value={user?.displayName || "Guest"} readOnly className="input input-bordered bg-gray-50 border-gray-200 focus:outline-none" />
              </div>
              <div className="form-control w-full">
                <label className="label font-semibold text-gray-600">Email Address</label>
                <input type="email" value={user?.email || "N/A"} readOnly className="input input-bordered bg-gray-50 border-gray-200 focus:outline-none" />
              </div>
            </div>

            <div className="form-control">
              <label className="label font-semibold text-gray-600">Delivery Address</label>
              <textarea 
                required
                className="textarea textarea-bordered h-32 border-gray-200 focus:border-primary focus:outline-none text-lg" 
                placeholder="Ex: House 12, Road 5, Sector 7, Uttara, Dhaka"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <button disabled={isProcessing} className="btn btn-primary btn-block h-14 rounded-xl text-lg shadow-lg shadow-primary/20">
              {isProcessing ? <span className="loading loading-spinner"></span> : editId ? "Save Changes" : "Confirm Purchase"}
            </button>
          </form>
        </div>

        {/* --- Right: Summary Card --- */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sticky top-24">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-orange-100 p-3 rounded-xl text-orange-600"><FaFileInvoiceDollar size={24} /></div>
              <h2 className="text-2xl font-bold">Order Summary</h2>
            </div>

            <div className="flex gap-4 mb-8 bg-gray-50 p-4 rounded-xl">
              <img src={product.image} className="w-20 h-20 object-contain mix-blend-multiply" alt="product" />
              <div className="flex flex-col justify-center">
                <h4 className="font-bold text-gray-800 leading-tight mb-1">{product.title}</h4>
                <p className="text-primary font-bold text-lg">${product.price}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-gray-600">
                <span>Unit Price</span>
                <span className="font-medium">${product.price}</span>
              </div>

              <div className="flex justify-between items-center text-gray-600">
                <span>Quantity</span>
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:bg-gray-100"><FaMinus size={12}/></button>
                  <span className="px-4 font-bold text-gray-800">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:bg-gray-100"><FaPlus size={12}/></button>
                </div>
              </div>

              <div className="divider"></div>

              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-800">Grand Total</span>
                <span className="text-3xl font-black text-primary">${(product.price * quantity).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CheckoutPage;