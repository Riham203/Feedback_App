import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../content/AuthContext";

export default function AdminRoute({ children }) {
  const { token, user } = useContext(AuthContext);

  // If not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // While fetching user
  if (token && !user) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  // If logged in but not admin
  if (user?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  // Admin user → allow access
  return children;
}