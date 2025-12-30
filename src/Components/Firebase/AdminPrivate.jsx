import { Navigate } from "react-router";
import { AuthContext } from "./AuthProvider";
import { use, useContext } from "react";

const AdminPrivate = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p className="text-center mt-24 text-blue-500"><span className="loading loading-dots loading-xl"></span></p>;
  if (!user) return <Navigate to="/login" />;

  if (user.role !== "admin") {
    return (
      <p className="text-center text-red-500 mt-10 text-lg">
        ❌ Only admin can access this page
      </p>
    );
  }

  return children;
};

export default AdminPrivate;
