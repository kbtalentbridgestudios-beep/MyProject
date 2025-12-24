import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("newsAdminToken");
  return token ? children : <Navigate to="/news-admin/login" />;
}
