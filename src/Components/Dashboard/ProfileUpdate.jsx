import React, { useContext, useState, useEffect } from 'react';
import { FaCamera, FaUser, FaEnvelope, FaCheckCircle, FaSpinner, FaShieldAlt } from 'react-icons/fa';
import { RiVerifiedBadgeFill } from "react-icons/ri";
import Swal from 'sweetalert2';
import axios from 'axios';
import { AuthContext } from '../Firebase/AuthProvider';

const ProfileUpdate = () => {
    const { user, UpdateUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    
    // Preview Image State - শুরুতে ইউজারের বর্তমান ছবি থাকবে
    const [previewImage, setPreviewImage] = useState(user?.photoURL);

    // ইউজার ডাটা আপডেট হলে প্রিভিউ ইমেজ সিঙ্ক হবে
    useEffect(() => {
        setPreviewImage(user?.photoURL);
    }, [user]);

    const IMGBB_API_KEY = "d4f6b241561ed775667ce1666941a5ff"; 

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // ১. তাৎক্ষণিক প্রিভিউ রিপ্লেস (Local URL)
        const localURL = URL.createObjectURL(file);
        setPreviewImage(localURL);
        
        setUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            // ২. সার্ভারে আপলোড
            const res = await axios.post(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, formData);
            if (res.data.success) {
                // ৩. আপলোড সফল হলে ImgBB URL সেট হবে
                setPreviewImage(res.data.data.display_url);
                Swal.fire({
                    toast: true, position: 'top-end', icon: 'success',
                    title: 'Avatar synced', showConfirmButton: false, timer: 1500
                });
            }
        } catch (error) {
            // এরর হলে পুরনো ছবিতে ফিরে যাবে
            setPreviewImage(user?.photoURL);
            Swal.fire({ icon: 'error', title: 'Upload Failed', text: 'Cloud storage unavailable.' });
        } finally {
            setUploading(false);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // ৪. ফাইনাল আপডেট (প্রিভিউতে থাকা ইমেজে URL ই সেভ হবে)
            await UpdateUser({ displayName: e.target.name.value, photoURL: previewImage });
            Swal.fire({
                icon: 'success', title: 'Identity Secured',
                text: 'Profile metrics updated successfully.',
                confirmButtonColor: '#4F46E5',
            });
        } catch (error) {
            Swal.fire({ icon: 'error', title: 'Update Denied', text: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 border-b border-slate-200 dark:border-white/10 pb-6">
                <div>
                    <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Account <span className="text-indigo-600">Settings</span></h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">Manage your professional identity and security.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                
                {/* Left Side: Avatar */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white dark:bg-[#11141b] rounded-[2.5rem] p-8 shadow-xl border border-slate-100 dark:border-white/5 transition-all">
                        <div className="relative group w-44 h-44 mx-auto mb-8">
                            <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-2xl group-hover:blur-3xl transition-all"></div>
                            
                            <img 
                                src={previewImage || "https://i.ibb.co/0QZCv5C/user-placeholder.png"} 
                                alt="profile" 
                                className={`relative w-full h-full rounded-full object-cover ring-8 ring-white dark:ring-slate-900 shadow-2xl transition-all ${uploading ? 'opacity-50 blur-[2px]' : 'opacity-100'}`} 
                            />

                            <label className="absolute bottom-2 right-2 w-12 h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl flex items-center justify-center cursor-pointer shadow-xl transition-all hover:rotate-12 border-4 border-white dark:border-slate-900">
                                <input type="file" onChange={handleImageUpload} className="hidden" accept="image/*" />
                                <FaCamera size={18} />
                            </label>

                            {uploading && (
                                <div className="absolute inset-0 bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-full flex flex-col items-center justify-center gap-2">
                                    <FaSpinner className="animate-spin text-indigo-600" size={32} />
                                    <span className="text-[10px] font-black uppercase text-indigo-600 tracking-tighter">Syncing...</span>
                                </div>
                            )}
                        </div>

                        <div className="text-center">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400 rounded-full text-[10px] font-black uppercase tracking-widest mb-3">
                                <RiVerifiedBadgeFill size={14} /> Verified {user?.role || "Staff"}
                            </div>
                            <h3 className="text-2xl font-black text-slate-800 dark:text-white truncate px-2">{user?.displayName || "Member"}</h3>
                            <p className="text-sm font-medium text-slate-400 mt-1">{user?.email}</p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="lg:col-span-8">
                    <div className="bg-white dark:bg-[#11141b] rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-100 dark:border-white/5">
                        <form onSubmit={handleUpdate} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1">Full Identity</label>
                                    <div className="relative group">
                                        <FaUser className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
                                        <input 
                                            type="text" name="name" defaultValue={user?.displayName}
                                            className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 rounded-[1.25rem] focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all dark:text-white font-bold"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1">Assigned Role</label>
                                    <div className="relative group opacity-70">
                                        <FaShieldAlt className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" />
                                        <input type="text" value={user?.role || "Member"} readOnly className="w-full pl-14 pr-6 py-4 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/5 rounded-[1.25rem] cursor-not-allowed dark:text-slate-400 font-bold" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1">Primary Email</label>
                                <div className="relative group opacity-70">
                                    <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" />
                                    <input type="email" value={user?.email} readOnly className="w-full pl-14 pr-6 py-4 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/5 rounded-[1.25rem] cursor-not-allowed dark:text-slate-400 font-bold" />
                                </div>
                            </div>

                            <div className="pt-6 flex flex-col sm:flex-row items-center gap-4">
                                <button 
                                    type="submit"
                                    disabled={loading || uploading}
                                    className={`w-full sm:w-auto px-10 py-4 bg-slate-900 dark:bg-indigo-600 hover:bg-slate-800 dark:hover:bg-indigo-700 text-white font-black rounded-2xl shadow-2xl transition-all flex items-center justify-center gap-3 ${loading || uploading ? 'opacity-50' : 'active:scale-95'}`}
                                >
                                    {loading ? <FaSpinner className="animate-spin" /> : <FaCheckCircle />}
                                    {loading ? "Syncing..." : "Apply Changes"}
                                </button>
                                <button type="button" onClick={() => window.location.reload()} className="text-xs font-black text-slate-400 hover:text-slate-600 uppercase tracking-widest transition-colors underline underline-offset-8">
                                    Reset Form
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileUpdate;