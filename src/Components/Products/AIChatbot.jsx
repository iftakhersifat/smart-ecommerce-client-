import React, { useState, useEffect, useRef } from "react";
import { FaRobot, FaPaperPlane, FaTimes, FaMinus, FaRegSmile } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const AIChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: "bot", content: "Hello! I'm your AI Assistant. How can I help you today?" }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);

    // Auto-scroll to bottom when message arrives
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { role: "user", content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        // Simulated AI Logic (Replace with your Gemini/OpenAI API call)
        setTimeout(() => {
            const botResponse = getBotResponse(input);
            setMessages((prev) => [...prev, { role: "bot", content: botResponse }]);
            setIsTyping(false);
        }, 1500);
    };

    // Basic Logic for Demo (You can connect this to a real backend)
    const getBotResponse = (query) => {
        const q = query.toLowerCase();
        if (q.includes("price")) return "Our product prices vary, but we currently have a 20% discount on many items!";
        if (q.includes("shipping")) return "We offer free express shipping on orders over $50.";
        if (q.includes("return")) return "You can return any product within 30 days of purchase.";
        if (q.includes("hello") || q.includes("hi")) return "Hi there! Looking for something specific today?";
        return "That's a great question! I'm still learning, but you can contact our human support at support@store.com.";
    };

    return (
        <div className="fixed bottom-6 right-6 z-[9999] font-sans">
            {/* Chat Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`${isOpen ? 'hidden' : 'flex'} items-center justify-center w-16 h-16 bg-indigo-600 text-white rounded-full shadow-2xl shadow-indigo-500/40 border-4 border-white dark:border-slate-900 transition-all`}
            >
                <FaRobot size={28} className="animate-pulse" />
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.8 }}
                        className="w-[350px] md:w-[400px] h-[550px] bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-3xl border border-slate-100 dark:border-slate-800 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-6 bg-indigo-600 text-white flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                                    <FaRobot size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm">Nexus AI Support</h3>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 bg-green-400 rounded-full animate-ping"></span>
                                        <span className="text-[10px] font-medium opacity-80">Online Always</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors"><FaMinus size={14} /></button>
                                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors"><FaTimes size={14} /></button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50 dark:bg-slate-950/20">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-4 rounded-[1.5rem] text-sm font-medium shadow-sm ${
                                        msg.role === 'user' 
                                        ? 'bg-indigo-600 text-white rounded-tr-none' 
                                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-tl-none border border-slate-100 dark:border-slate-800'
                                    }`}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white dark:bg-slate-800 p-4 rounded-[1.5rem] rounded-tl-none shadow-sm flex gap-1">
                                        <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></span>
                                        <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                        <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                                    </div>
                                </div>
                            )}
                            <div ref={scrollRef} />
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSendMessage} className="p-4 bg-white dark:bg-slate-900 border-t dark:border-slate-800 flex items-center gap-2">
                            <button type="button" className="p-3 text-slate-400 hover:text-indigo-600 transition-colors">
                                <FaRegSmile size={20} />
                            </button>
                            <input 
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-1 bg-slate-100 dark:bg-slate-800 border-none rounded-2xl px-4 py-3 text-sm focus:ring-2 ring-indigo-500/20 outline-none dark:text-white"
                            />
                            <button 
                                type="submit" 
                                className="p-4 bg-indigo-600 hover:bg-slate-900 text-white rounded-2xl shadow-lg transition-all active:scale-90 disabled:opacity-50"
                                disabled={!input.trim()}
                            >
                                <FaPaperPlane size={14} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AIChatbot;