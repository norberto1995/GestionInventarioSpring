import { Navigate } from "react-router-dom";
import { isTokenExpired } from "../utils/auth";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token || isTokenExpired(token)) {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    return <Navigate to="/login" />;
  }

  return children;
}


