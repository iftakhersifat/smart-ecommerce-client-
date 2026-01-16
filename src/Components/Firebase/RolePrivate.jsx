import React, { use } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate } from "react-router";

const RolePrivate = ({ children, allowedRoles }) => {
  const { user, loading } = use(AuthContext);

  if (loading) return <p>Loading...</p>;

  if (!user) return <Navigate to="/login" />;

  if (!allowedRoles.includes(user.role)) {
    return (
      <p className="text-center text-red-500 font-semibold mt-10">
        You are not authorized to access this page
      </p>
    );
  }

  return children;
};

export default RolePrivate;
