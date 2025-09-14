import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../content/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  const linkStyle = {
    textDecoration: "none",
    color: "#fff",
    fontWeight: "500",
  };

  const activeStyle = {
    color: "#61dafb",
    fontWeight: "bold",
    borderBottom: "2px solid #61dafb",
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        background: "#1f1f1f",
        padding: "14px 40px", 
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 1000,
        boxSizing: "border-box",
      }}
    >
      {/* Links Section */}
      <div style={{ display: "flex", gap: "30px" }}>
        <NavLink to="/" style={({ isActive }) => (isActive ? activeStyle : linkStyle)}>
          Home
        </NavLink>

        {!user && (
          <>
            <NavLink to="/signup" style={({ isActive }) => (isActive ? activeStyle : linkStyle)}>
              Signup
            </NavLink>
            <NavLink to="/login" style={({ isActive }) => (isActive ? activeStyle : linkStyle)}>
              Login
            </NavLink>
          </>
        )}

        {user?.role === "student" && (
          <>
            <NavLink to="/dashboard" style={({ isActive }) => (isActive ? activeStyle : linkStyle)}>
              Dashboard
            </NavLink>
            <NavLink to="/profile" style={({ isActive }) => (isActive ? activeStyle : linkStyle)}>
              Profile
            </NavLink>
            <NavLink to="/feedback/new" style={({ isActive }) => (isActive ? activeStyle : linkStyle)}>
              New Feedback
            </NavLink>
            <NavLink to="/feedback/my" style={({ isActive }) => (isActive ? activeStyle : linkStyle)}>
              My Feedbacks
            </NavLink>
          </>
        )}

        {user?.role === "admin" && (
          <>
            <NavLink to="/admin" style={({ isActive }) => (isActive ? activeStyle : linkStyle)}>
              Admin Dashboard
            </NavLink>
            <NavLink to="/admin/courses" style={({ isActive }) => (isActive ? activeStyle : linkStyle)}>
              Manage Courses
            </NavLink>
            <NavLink to="/profile" style={({ isActive }) => (isActive ? activeStyle : linkStyle)}>
              Profile
            </NavLink>
            <NavLink to="/admin/feedbacks" style={({ isActive }) => (isActive ? activeStyle : linkStyle)}>
              Manage Feedbacks
            </NavLink>
          </>
        )}
      </div>

      {/* User + Logout Section */}
      {user && (
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <span style={{ color: "#61dafb" }}>Hello, {user.name || "User"}</span>
          <button
            onClick={logout}
            style={{
              background: "red",
              color: "white",
              border: "none",
              padding: "6px 12px",
              cursor: "pointer",
              borderRadius: "4px",
            }}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}