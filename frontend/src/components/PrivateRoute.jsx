import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../content/AuthContext";

export default function PrivateRoute({ children }) {
  const { token, user } = useContext(AuthContext);

  // If no token → redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If token exists but user is still loading → show loading
  if (token && !user) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  // Authenticated → allow access
  return children;
}