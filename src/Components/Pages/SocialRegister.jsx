import React, { useContext } from 'react';
import { AuthContext } from '../Firebase/AuthProvider';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import axios from 'axios';

const SocialRegister = ({ from }) => {
    const { registerWithGoogle, registerWithGithub } = useContext(AuthContext);
    const navigate = useNavigate();

    // Reusable function to save user to DB
    const saveUserToDb = (user) => {
        const userData = {
            name: user.displayName || "Unknown User",
            email: user.email,
            photo: user.photoURL,
            role: 'user' // Default role
        };

        axios.post('http://localhost:5000/users', userData)
            .then(res => {
                console.log("User DB sync status:", res.data);
                toast.success("Successfully Registered & Synced!");
                navigate(from, { replace: true });
            })
            .catch(err => {
                console.error("DB Sync Error:", err);
                // Database e save na holeo navigate hoye jabe jate user stuck na thake
                navigate(from);
            });
    };

    // Google Register/Login
    const handleGoogle = () => {
        registerWithGoogle()
            .then(result => {
                saveUserToDb(result.user);
            })
            .catch(error => {
                console.error(error);
                toast.error("Google login failed");
            });
    };

    // GitHub Register/Login
    const handleGithub = () => {
        registerWithGithub()
            .then(result => {
                saveUserToDb(result.user);
            })
            .catch(error => {
                console.error(error);
                toast.error(error.message || "GitHub login failed");
            });
    };

    return (
        <div className="space-y-3 w-full">
            <div className="divider text-xs opacity-50 uppercase tracking-widest">Or Continue With</div>
            
            {/* Google Button */}
            <button onClick={handleGoogle} type="button" className="btn bg-white hover:bg-gray-100 text-black border-[#e5e5e5] w-full flex items-center justify-center gap-3 shadow-sm">
                <svg aria-label="Google logo" width="18" height="18" viewBox="0 0 512 512">
                    <path fill="#fbbc02" d="M120 256c0-25.36 4.64-49.7 13.06-72.26l-73.63-55.2A255.4 255.4 0 0 0 16 256c0 46.54 12.44 90.22 34.03 128.01l75.01-57.75C124.64 305.7 120 281.36 120 256z" />
                    <path fill="#ea4335" d="M133.06 183.74c20.3-54.66 72.55-93.74 133.94-93.74 38.6 0 73.16 13.3 100.22 35.17l64.8-64.8C384.05 21.46 325.84 0 267 0 159.2 0 67.5 73.2 46.43 171.3l86.63 12.44z" />
                    <path fill="#34a853" d="M267 512c62.64 0 115.13-20.58 153.53-55.85l-74.1-61.2c-21.72 14.7-49.44 23.36-79.43 23.36-61.39 0-113.64-39.08-133.94-93.74l-86.63 12.44C67.5 438.8 159.2 512 267 512z" />
                    <path fill="#4285f4" d="M512 256c0-18.06-1.61-35.48-4.62-52.36H267v101.92h140.03c-6.04 32.55-24.36 60.11-51.5 78.41l74.1 61.2C473.05 404.54 512 336.52 512 256z" />
                </svg>
                Google
            </button>

            {/* GitHub Button */}
            <button onClick={handleGithub} type="button" className="btn bg-black hover:bg-gray-800 text-white border-black w-full flex items-center justify-center gap-3">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" />
                </svg>
                GitHub
            </button>
        </div>
    );
};

export default SocialRegister;