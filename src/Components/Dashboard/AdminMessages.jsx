import React, { useState, useEffect } from "react";
import axios from "axios";
import { Mail, Trash2, Eye, Calendar, User } from "lucide-react";
import toast from "react-hot-toast";

const AdminMessages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMsg, setSelectedMsg] = useState(null);

    const fetchMessages = async () => {
        try {
            const res = await axios.get("https://smart-ecommerce-server.vercel.app/messages");
            setMessages(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure?")) {
            try {
                await axios.delete(`https://smart-ecommerce-server.vercel.app/messages/${id}`);
                setMessages(messages.filter(msg => msg._id !== id));
                toast.success("Message deleted");
            } catch (error) {
                toast.error("Delete failed");
            }
        }
    };

    return (
        <div className="p-8 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <div className="mb-10">
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                        <Mail className="text-indigo-600" /> Message <span className="text-indigo-600 italic">Inbox</span>
                    </h1>
                    <p className="text-slate-500 font-medium">Customer inquiries and feedback management.</p>
                </div>

                {loading ? (
                    <div className="space-y-4">
                        {[1, 2, 3, 4].map(i => <div key={i} className="h-20 bg-white dark:bg-slate-900 animate-pulse rounded-2xl"></div>)}
                    </div>
                ) : (
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-slate-50 dark:bg-slate-800/50">
                                    <tr>
                                        <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400">Sender</th>
                                        <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400">Subject</th>
                                        <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400">Date</th>
                                        <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {messages.map((msg) => (
                                        <tr key={msg._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                            <td className="p-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 font-bold uppercase">
                                                        {msg.name[0]}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-slate-800 dark:text-slate-200">{msg.name}</p>
                                                        <p className="text-xs text-slate-500">{msg.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-6 font-medium text-slate-600 dark:text-slate-400">{msg.subject}</td>
                                            <td className="p-6 text-sm text-slate-500">
                                                {new Date(msg.submittedAt).toLocaleDateString()}
                                            </td>
                                            <td className="p-6 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button 
                                                        onClick={() => setSelectedMsg(msg)}
                                                        className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-indigo-600 hover:text-white transition-all"
                                                    >
                                                        <Eye size={18} />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDelete(msg._id)}
                                                        className="p-3 bg-slate-100 dark:bg-slate-800 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {selectedMsg && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-[3rem] p-10 relative shadow-2xl animate-in fade-in zoom-in duration-300">
                        <button 
                            onClick={() => setSelectedMsg(null)}
                            className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 dark:hover:text-white font-black"
                        >
                            ✕
                        </button>
                        
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                                <div className="p-4 bg-indigo-600 text-white rounded-2xl">
                                    <User size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-slate-900 dark:text-white">{selectedMsg.name}</h3>
                                    <p className="text-indigo-600 font-bold text-sm">{selectedMsg.email}</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Subject</p>
                                <p className="text-lg font-bold text-slate-800 dark:text-slate-200">{selectedMsg.subject}</p>
                            </div>

                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Message Content</p>
                                <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] text-slate-600 dark:text-slate-400 leading-relaxed max-h-48 overflow-y-auto">
                                    {selectedMsg.message}
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-slate-400 text-xs italic">
                                <Calendar size={14} /> Received on {new Date(selectedMsg.submittedAt).toLocaleString()}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminMessages;