import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

const EmployeePrivate = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p className="text-center mt-24 text-blue-500"><span className="loading loading-dots loading-xl"></span></p>;

  if (user && (user.role === "admin" || user.role === "employee")) {
    return children;
  }

  return <Navigate to="/" />;
};
export default EmployeePrivate;