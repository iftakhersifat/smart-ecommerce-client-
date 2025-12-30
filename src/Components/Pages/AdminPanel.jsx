import { useEffect, useState, useMemo } from "react";
import { collection, getDocs, updateDoc, doc, deleteDoc, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../Firebase/Firebase";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Users, ShieldCheck, Briefcase, Trash2, Search, Filter, MoreVertical } from "lucide-react";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "users"));
      setUsers(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      toast.error("Error loading users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const changeRole = async (id, newRole) => {
    try {
      await updateDoc(doc(db, "users", id), { role: newRole });
      await addDoc(collection(db, "notifications", id, "userNotifications"), {
        message: `Admin has updated your role to "${newRole.toUpperCase()}".`,
        type: "role_update",
        status: newRole,
        createdAt: serverTimestamp(),
      });
      setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role: newRole } : u)));
      toast.success(`Role updated to ${newRole}`);
    } catch (error) {
      toast.error("Update failed");
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteDoc(doc(db, "users", id));
        setUsers((prev) => prev.filter((u) => u.id !== id));
        toast.success("User removed from system");
      } catch {
        toast.error("Deletion failed");
      }
    }
  };

  const stats = useMemo(() => {
    return {
      total: users.length,
      admins: users.filter((u) => u.role === "admin").length,
      employees: users.filter((u) => u.role === "employee").length,
    };
  }, [users]);

  const filtered = users.filter(
    (u) =>
      (u.name?.toLowerCase().includes(search.toLowerCase()) ||
        u.email?.toLowerCase().includes(search.toLowerCase())) &&
      (roleFilter ? u.role === roleFilter : true)
  );

  const admins = filtered.filter((u) => u.role === "admin");
  const employees = filtered.filter((u) => u.role === "employee");
  const normalUsers = filtered.filter((u) => u.role === "user");

  const totalPages = Math.ceil(normalUsers.length / usersPerPage);
  const currentUsers = normalUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20 -mb-20 pt-28 px-6 md:px-6 lg:px-0">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-10 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl"
            >
              System Directory
            </motion.h1>
            <p className="mt-2 text-slate-500 font-medium italic">Manage user permissions and access levels across the platform.</p>
          </div>
          
          {/* Action Stats Overview */}
          <div className="flex gap-3 justify-center">
             <div className="px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-2xl">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest block">Activity</span>
                <span className="text-sm font-black text-indigo-700">Live System</span>
             </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <StatCard label="Platform Total" value={stats.total} icon={Users} color="bg-blue-600" loading={loading} />
          <StatCard label="System Admins" value={stats.admins} icon={ShieldCheck} color="bg-rose-500" loading={loading} />
          <StatCard label="Core Employees" value={stats.employees} icon={Briefcase} color="bg-emerald-500" loading={loading} />
        </div>

        {/* Controls Bar */}
        <div className="bg-white p-4 rounded-[2rem] shadow-sm border border-slate-200 mb-8 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email or UID..."
              className="w-full pl-12 pr-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none font-medium text-slate-700"
            />
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-48">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500/20 outline-none appearance-none font-bold text-slate-600 cursor-pointer"
              >
                <option value="">Role: All</option>
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
                <option value="user">User</option>
              </select>
            </div>
          </div>
        </div>

        {/* Sections Container */}
        <AnimatePresence mode="wait">
          {loading ? (
            <div className="space-y-4">
               {[1,2,3].map(i => <div key={i} className="h-24 bg-white rounded-3xl animate-pulse border border-slate-100" />)}
            </div>
          ) : (
            <div className="space-y-12">
              {admins.length > 0 && (!roleFilter || roleFilter === "admin") && (
                <UserSection title="Admin List" type="admin" data={admins} changeRole={changeRole} deleteUser={deleteUser} />
              )}
              {employees.length > 0 && (!roleFilter || roleFilter === "employee") && (
                <UserSection title="Employee List" type="employee" data={employees} changeRole={changeRole} deleteUser={deleteUser} />
              )}
              {currentUsers.length > 0 && (!roleFilter || roleFilter === "user") && (
                <div>
                  <UserSection title="User List" type="user" data={currentUsers} changeRole={changeRole} deleteUser={deleteUser} />
                  {totalPages > 1 && (
                    <div className="flex justify-center mt-10 gap-2">
                      {[...Array(totalPages)].map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentPage(i + 1)}
                          className={`w-12 h-12 rounded-2xl font-bold transition-all ${
                            currentPage === i + 1 
                            ? "bg-slate-900 text-white shadow-lg shadow-slate-200 scale-110" 
                            : "bg-white text-slate-400 hover:bg-slate-50 border border-slate-200"
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// --- Sub Components ---

const StatCard = ({ label, value, icon: Icon, color, loading }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-7 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center justify-between"
  >
    <div>
      <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.15em] mb-1">{label}</p>
      {loading ? (
        <div className="h-8 w-16 bg-slate-100 animate-pulse rounded-lg" />
      ) : (
        <p className="text-3xl font-black text-slate-900">{value}</p>
      )}
    </div>
    <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center text-white shadow-lg shadow-slate-100`}>
      <Icon size={28} />
    </div>
  </motion.div>
);

const UserSection = ({ title, type, data, changeRole, deleteUser }) => {
  const roleStyles = {
    admin: "text-rose-600 bg-rose-50",
    employee: "text-emerald-600 bg-emerald-50",
    user: "text-slate-600 bg-slate-50",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-xl font-black text-slate-800 tracking-tight">{title}</h2>
        <div className="h-px flex-1 bg-slate-200" />
        <span className="text-xs font-bold text-slate-400 bg-white px-3 py-1 rounded-full border border-slate-100 shadow-sm">
          {data.length} Results
        </span>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-left text-xs font-black text-slate-400 uppercase tracking-widest">Identify</th>
                <th className="px-8 py-5 text-left text-xs font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-right text-xs font-black text-slate-400 uppercase tracking-widest">Administrative Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.map((user) => (
                <tr key={user.id} className="group hover:bg-slate-50/30 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center font-black text-slate-500 border border-white shadow-sm">
                        {user.name?.charAt(0) || "U"}
                      </div>
                      <div>
                        <p className="font-black text-slate-800 leading-none mb-1">{user.name}</p>
                        <p className="text-xs font-bold text-slate-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`inline-flex px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-current opacity-80 ${roleStyles[user.role]}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center justify-end gap-3">
                      <div className="relative group/select">
                        <select
                          value={user.role}
                          onChange={(e) => changeRole(user.id, e.target.value)}
                          className="pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-indigo-500/10 appearance-none cursor-pointer hover:bg-white transition-all"
                        >
                          <option value="admin">Promote Admin</option>
                          <option value="employee">Employee</option>
                          <option value="user">User</option>
                        </select>
                        <MoreVertical size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      </div>
                      
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="p-2.5 bg-white text-rose-500 border border-rose-100 rounded-xl hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                        title="Delete Account"
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
    </motion.div>
  );
};

export default AdminPanel;