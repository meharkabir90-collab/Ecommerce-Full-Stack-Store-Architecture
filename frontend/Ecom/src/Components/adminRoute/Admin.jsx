import { Navigate } from "react-router-dom";

function ProtectedAdminRoute({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  } 

  if (role !== "admin") {
    return <Navigate to="/" replace />; // logged in, but not an admin — send home
  }

  return children;
}

export default ProtectedAdminRoute;