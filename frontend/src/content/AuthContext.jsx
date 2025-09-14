import React, { createContext, useState, useEffect } from "react";
import { getProfile } from "../api/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Fetch profile whenever token changes
  useEffect(() => {
    if (token) {
      getProfile(token)
        .then((res) => setUser(res.data))
        .catch(() => logout());
    }
  }, [token]);

  const login = (token, userData) => {
    localStorage.setItem("token", token);
    setToken(token);
    if (userData) setUser(userData); // immediately set user after login
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    window.location.href = "/login"
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};