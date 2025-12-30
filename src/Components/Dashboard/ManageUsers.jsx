import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUserShield, FaUserTie, FaUser, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await axios.get("http://localhost:5000/users");
            setUsers(res.data);
            setLoading(false);
        } catch (err) { console.error(err); }
    };

    const handleRoleUpdate = async (id, newRole, currentName) => {
        Swal.fire({
            title: `Change role of ${currentName}?`,
            text: `Confirming to make this user an ${newRole.toUpperCase()}`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#4F46E5",
            confirmButtonText: "Yes, Update!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axios.patch(`http://localhost:5000/users/role/${id}`, { role: newRole });
                    if (res.data.modifiedCount > 0) {
                        Swal.fire("Updated!", "User role has been changed.", "success");
                        fetchUsers();
                    }
                } catch (err) {
                    Swal.fire("Error", "Could not update role", "error");
                }
            }
        });
    };

    if (loading) return <span className="loading loading-spinner loading-lg"></span>;

    return (
        <div className="p-6 bg-base-100 rounded-3xl shadow-xl border border-base-200">
            <div className="mb-8">
                <h2 className="text-3xl font-black italic">Manage Permissions</h2>
                <p className="opacity-60">Admin can upgrade/downgrade any member's access level</p>
            </div>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr className="bg-base-200 uppercase text-xs">
                            <th>User</th>
                            <th>Current Status</th>
                            <th className="text-center">Switch Role To</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="hover:bg-base-200/50 transition-all">
                                <td>
                                    <div className="font-bold">{user.name || "Unknown"}</div>
                                    <div className="text-xs opacity-50 font-mono uppercase tracking-tighter">{user.email}</div>
                                </td>
                                <td>
                                    <div className={`badge badge-md gap-2 font-bold py-3 ${
                                        user.role === 'admin' ? 'badge-error' : 
                                        user.role === 'employee' ? 'badge-primary' : 'badge-ghost'
                                    }`}>
                                        {user.role === 'admin' && <FaUserShield />}
                                        {user.role === 'employee' && <FaUserTie />}
                                        {user.role === 'user' && <FaUser />}
                                        {user.role?.toUpperCase()}
                                    </div>
                                </td>
                                <td className="text-center">
                                    <div className="flex justify-center gap-2">
                                        {/* Dynamic Role Switchers */}
                                        <button 
                                            onClick={() => handleRoleUpdate(user._id, 'admin', user.name)}
                                            className={`btn btn-xs ${user.role === 'admin' ? 'btn-disabled opacity-30' : 'btn-outline btn-error'}`}
                                        >Admin</button>
                                        
                                        <button 
                                            onClick={() => handleRoleUpdate(user._id, 'employee', user.name)}
                                            className={`btn btn-xs ${user.role === 'employee' ? 'btn-disabled opacity-30' : 'btn-outline btn-primary'}`}
                                        >Employee</button>
                                        
                                        <button 
                                            onClick={() => handleRoleUpdate(user._id, 'user', user.name)}
                                            className={`btn btn-xs ${user.role === 'user' ? 'btn-disabled opacity-30' : 'btn-outline'}`}
                                        >User</button>
                                    </div>
                                </td>
                                <td>
                                    <button className="btn btn-ghost btn-sm text-error">
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;