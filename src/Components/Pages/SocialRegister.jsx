import React, { useContext, useState } from 'react';
import { AuthContext } from '../Firebase/AuthProvider';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Github } from 'lucide-react'; // Consistency-র জন্য Lucide ব্যবহার করা হয়েছে

const SocialRegister = ({ from }) => {
    const { registerWithGoogle, registerWithGithub } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loadingMethod, setLoadingMethod] = useState(null); // 'google' or 'github'

    // Reusable function to save user to DB
    const saveUserToDb = (user) => {
        const userData = {
            name: user.displayName || "Unknown User",
            email: user.email,
            photo: user.photoURL,
            role: 'user'
        };

        axios.post('http://localhost:5000/users', userData)
            .then(res => {
                toast.success(`Welcome to SmartStore, ${user.displayName.split(' ')[0]}!`, {
                    style: { borderRadius: '12px', background: '#1e293b', color: '#fff' }
                });
                navigate(from, { replace: true });
            })
            .catch(err => {
                console.error("DB Sync Error:", err);
                navigate(from);
            })
            .finally(() => setLoadingMethod(null));
    };

    const handleGoogle = () => {
        setLoadingMethod('google');
        registerWithGoogle()
            .then(result => saveUserToDb(result.user))
            .catch(error => {
                console.error(error);
                setLoadingMethod(null);
                toast.error("Google authentication failed");
            });
    };

    const handleGithub = () => {
        setLoadingMethod('github');
        registerWithGithub()
            .then(result => saveUserToDb(result.user))
            .catch(error => {
                console.error(error);
                setLoadingMethod(null);
                toast.error(error.message || "GitHub authentication failed");
            });
    };

    return (
        <div className="w-full space-y-4">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Google Button */}
                <button
                    onClick={handleGoogle}
                    type="button"
                    disabled={loadingMethod !== null}
                    className="group relative flex items-center justify-center gap-3 px-4 py-3.5 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl hover:bg-slate-50 dark:hover:bg-zinc-800 transition-all active:scale-[0.98] focus:ring-4 focus:ring-blue-500/10 disabled:opacity-70"
                >
                    {loadingMethod === 'google' ? (
                        <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        <svg className="w-5 h-5 transition-transform group-hover:scale-110" viewBox="0 0 48 48">
                            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                        </svg>
                    )}
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Google</span>
                </button>

                {/* GitHub Button */}
                <button
                    onClick={handleGithub}
                    type="button"
                    disabled={loadingMethod !== null}
                    className="group relative flex items-center justify-center gap-3 px-4 py-3.5 bg-zinc-900 hover:bg-black text-white rounded-2xl transition-all active:scale-[0.98] focus:ring-4 focus:ring-zinc-500/20 disabled:opacity-70"
                >
                    {loadingMethod === 'github' ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        <Github className="w-5 h-5 transition-transform group-hover:scale-110" />
                    )}
                    <span className="text-sm font-bold tracking-wide">GitHub</span>
                </button>
            </div>
        </div>
    );
};

export default SocialRegister;