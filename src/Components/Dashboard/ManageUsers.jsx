import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { FaUserShield, FaUserTie, FaUser, FaEnvelope, FaSearch, FaFilter, FaSync } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../Firebase/AuthProvider";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase/Firebase";

const ManageUsers = () => {
    const { user: currentUser } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterRole, setFilterRole] = useState("all");

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        let result = users;
        if (searchTerm) {
            result = result.filter(u => 
                u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                u.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (filterRole !== "all") {
            result = result.filter(u => (u.role || 'user') === filterRole);
        }
        setFilteredUsers(result);
    }, [searchTerm, filterRole, users]);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await axios.get("http://localhost:5000/users");
            setUsers(res.data);
            setFilteredUsers(res.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleRoleUpdate = async (mongoId, firebaseUid, newRole, targetEmail) => {
        if (currentUser?.email === targetEmail) {
            return Swal.fire({
                title: "Action Denied",
                text: "You cannot modify your own administrative privileges.",
                icon: "error",
                background: document.documentElement.getAttribute('data-theme') === 'dark' ? '#1f2937' : '#fff',
                color: document.documentElement.getAttribute('data-theme') === 'dark' ? '#f3f4f6' : '#1f2937',
                confirmButtonColor: '#4F46E5'
            });
        }

        const confirm = await Swal.fire({
            title: `Update to ${newRole.toUpperCase()}?`,
            text: `Confirming access change for ${targetEmail}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Confirm Change",
            confirmButtonColor: "#4F46E5",
            cancelButtonColor: "#94A3B8",
            background: document.documentElement.getAttribute('data-theme') === 'dark' ? '#1f2937' : '#fff',
            color: document.documentElement.getAttribute('data-theme') === 'dark' ? '#f3f4f6' : '#1f2937',
        });

        if (confirm.isConfirmed) {
            try {
                const res = await axios.patch(`http://localhost:5000/users/role/${mongoId}`, { role: newRole });
                if (res.data.modifiedCount > 0) {
                    if (firebaseUid) {
                        await updateDoc(doc(db, "users", firebaseUid), { role: newRole });
                    }
                    setUsers(users.map(u => u._id === mongoId ? { ...u, role: newRole } : u));
                    Swal.fire("Updated!", "Role has been changed.", "success");
                }
            } catch (err) {
                Swal.fire("Failed", "System sync error.", "error");
            }
        }
    };

    return (
        <div className="min-h-screen -mb-24 bg-slate-50 dark:bg-slate-950 p-6 md:p-10 transition-colors duration-300">
            <div className="max-w-6xl mx-auto">
                
                {/* Header & Stats Card */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Access Control</h1>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">Manage organization members and system permissions.</p>
                    </div>
                    
                    <div className="flex gap-4 w-full lg:w-auto">
                        <div className="bg-white dark:bg-slate-900 px-6 py-3 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex items-center gap-4">
                            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl"><FaUserShield /></div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase">Total Members</p>
                                <p className="text-xl font-black text-slate-800 dark:text-white">{users.length}</p>
                            </div>
                        </div>
                        <button onClick={fetchUsers} className="btn btn-circle bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300">
                            <FaSync className={loading ? "animate-spin" : ""} />
                        </button>
                    </div>
                </div>

                {/* Search & Filter Bar */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="md:col-span-2 relative">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Search by name or email..." 
                            className="input w-full pl-12 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-50 dark:focus:ring-indigo-900/20 shadow-sm"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="relative">
                        <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <select 
                            className="select w-full pl-12 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-50 dark:focus:ring-indigo-900/20 shadow-sm"
                            onChange={(e) => setFilterRole(e.target.value)}
                        >
                            <option value="all">All Roles</option>
                            <option value="admin">Admins</option>
                            <option value="employee">Employees</option>
                            <option value="user">Regular Users</option>
                        </select>
                    </div>
                </div>

                {/* User Table Card */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden">
                    {loading ? (
                        <div className="py-20 flex justify-center"><span className="loading loading-spinner loading-lg text-indigo-600"></span></div>
                    ) : filteredUsers.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="table w-full border-separate border-spacing-0">
                                <thead className="bg-slate-50/80 dark:bg-slate-800/50">
                                    <tr className="text-slate-500 dark:text-slate-400 font-bold border-b dark:border-slate-800">
                                        <th className="py-5 px-8">Member Profile</th>
                                        <th className="py-5">Role Identity</th>
                                        <th className="py-5 text-center">Permission Controls</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map((user) => (
                                        <tr key={user._id} className="hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10 transition-colors duration-200 border-b dark:border-slate-800 last:border-0">
                                            <td className="py-5 px-8">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-100 dark:shadow-none">
                                                        {user.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-slate-800 dark:text-slate-200">{user.name}</div>
                                                        <div className="text-sm text-slate-400 dark:text-slate-500 font-medium">{user.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            
                                            <td>
                                                <div className={`badge h-8 gap-2 px-4 border-none font-bold text-[11px] uppercase tracking-tighter
                                                    ${user.role === 'admin' ? 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400' : 
                                                      user.role === 'employee' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 
                                                      'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
                                                    <span className={`w-2 h-2 rounded-full animate-pulse ${user.role === 'admin' ? 'bg-rose-500' : user.role === 'employee' ? 'bg-blue-500' : 'bg-slate-400'}`}></span>
                                                    {user.role || 'user'}
                                                </div>
                                            </td>

                                            <td>
                                                <div className="flex justify-center items-center gap-2">
                                                    <button 
                                                        onClick={() => handleRoleUpdate(user._id, user.uid, 'admin', user.email)}
                                                        className={`p-3 rounded-xl transition-all ${user.role === 'admin' ? 'bg-slate-100 dark:bg-slate-800 text-slate-300 dark:text-slate-700 cursor-not-allowed' : 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 hover:bg-rose-600 hover:text-white dark:hover:bg-rose-600'}`}
                                                        title="Promote to Admin"
                                                    >
                                                        <FaUserShield size={18} />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleRoleUpdate(user._id, user.uid, 'employee', user.email)}
                                                        className={`p-3 rounded-xl transition-all ${user.role === 'employee' ? 'bg-slate-100 dark:bg-slate-800 text-slate-300 dark:text-slate-700 cursor-not-allowed' : 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600'}`}
                                                        title="Make Employee"
                                                    >
                                                        <FaUserTie size={18} />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleRoleUpdate(user._id, user.uid, 'user', user.email)}
                                                        className={`p-3 rounded-xl transition-all ${(!user.role || user.role === 'user') ? 'bg-slate-100 dark:bg-slate-800 text-slate-300 dark:text-slate-700 cursor-not-allowed' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-800 dark:hover:bg-slate-700 hover:text-white'}`}
                                                        title="Demote to User"
                                                    >
                                                        <FaUser size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="py-20 text-center">
                            <div className="bg-slate-50 dark:bg-slate-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300 dark:text-slate-600">
                                <FaSearch size={30} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">No matching members</h3>
                            <p className="text-slate-400 dark:text-slate-500">Try adjusting your search filters.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;