import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactSection = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:5000/messages', data);
            if (response.data.insertedId) {
                toast.success('Message sent successfully!', {
                    style: { borderRadius: '12px', background: '#1e293b', color: '#fff' }
                });
                reset();
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to send message. Please try again.');
        }
    };

    return (
        <section className="max-w-6xl mx-auto px-6 md:px-6 lg:px-0 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                
                <div className="space-y-8">
                    <div>
                        <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4">
                            Get in <span className="text-indigo-600 italic">Touch</span>
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 font-medium max-w-sm">
                            Have questions or feedback? Reach out to us and our team will get back to you within 24 hours.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center gap-5 p-6 bg-slate-50 dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800">
                            <div className="p-4 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-200 dark:shadow-none">
                                <Mail size={24} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Us</p>
                                <p className="text-lg font-bold text-slate-800 dark:text-slate-200">support@smartshop.com</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-5 p-6 bg-slate-50 dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800">
                            <div className="p-4 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-200 dark:shadow-none">
                                <Phone size={24} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Call Us</p>
                                <p className="text-lg font-bold text-slate-800 dark:text-slate-200">+880 1234 567 890</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-5 p-6 bg-slate-50 dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800">
                            <div className="p-4 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-200 dark:shadow-none">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Location</p>
                                <p className="text-lg font-bold text-slate-800 dark:text-slate-200">Chattogram, Bangladesh</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <label className="text-sm font-bold ml-1 text-slate-700 dark:text-slate-300">Name</label>
                                <input 
                                    {...register("name", { required: "Name is required" })}
                                    className={`input w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all ${errors.name ? 'ring-2 ring-red-500' : ''}`} 
                                    placeholder="Your Name"
                                />
                                {errors.name && <span className="text-xs text-red-500 ml-1 font-medium">{errors.name.message}</span>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold ml-1 text-slate-700 dark:text-slate-300">Email</label>
                                <input 
                                    {...register("email", { 
                                        required: "Email is required",
                                        pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                                    })}
                                    className={`input w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all ${errors.email ? 'ring-2 ring-red-500' : ''}`} 
                                    placeholder="youremail@example.com"
                                />
                                {errors.email && <span className="text-xs text-red-500 ml-1 font-medium">{errors.email.message}</span>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold ml-1 text-slate-700 dark:text-slate-300">Subject</label>
                            <input 
                                {...register("subject", { required: "Subject is required" })}
                                className="input w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all" 
                                placeholder="How can we help?"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold ml-1 text-slate-700 dark:text-slate-300">Message</label>
                            <textarea 
                                {...register("message", { required: "Message cannot be empty", minLength: { value: 10, message: "Too short!" } })}
                                className="textarea w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl h-32 focus:ring-2 focus:ring-indigo-500 transition-all" 
                                placeholder="Write your message here..."
                            ></textarea>
                            {errors.message && <span className="text-xs text-red-500 ml-1 font-medium">{errors.message.message}</span>}
                        </div>

                        <button 
                            type="submit" 
                            className="btn w-full bg-indigo-600 hover:bg-slate-900 text-white border-none h-14 rounded-2xl shadow-lg shadow-indigo-200 dark:shadow-none transition-all active:scale-95 gap-2"
                        >
                            Send Message <Send size={18} />
                        </button>
                    </form>
                </div>

            </div>
        </section>
    );
};

export default ContactSection;