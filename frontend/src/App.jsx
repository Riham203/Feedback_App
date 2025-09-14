import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./content/AuthContext.jsx";

// Pages
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Profile from "./pages/Profile.jsx";
import FeedbackForm from "./pages/FeedbackForm.jsx";
import MyFeedbacks from "./pages/MyFeedbacks.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import ManageCourses from "./pages/ManageCourses.jsx";
import AdminFeedbacks from "./pages/AdminFeedbacks.jsx";

// Guards
import PrivateRoute from "./components/PrivateRoute.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import Navbar from "./components/Navbar.jsx";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          {/* Public */}
          <Route
            path="/"
            element={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "80vh",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    background: "#1f1f1f",
                    padding: "40px 60px",
                    borderRadius: "12px",
                    boxShadow: "0px 4px 12px rgba(0,0,0,0.4)",
                    color: "#fff",
                    maxWidth: "600px",
                  }}
                >
                  <h1 style={{ fontSize: "32px", marginBottom: "15px" }}>
                    🏠 Welcome to Feedback App
                  </h1>
                  <p style={{ fontSize: "18px", color: "#bbb" }}>
                    <i>Built by Riham Hussain</i>
                  </p>
                </div>
              </div>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Private (Students) */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/feedback/new"
            element={
              <PrivateRoute>
                <FeedbackForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/feedback/my"
            element={
              <PrivateRoute>
                <MyFeedbacks />
              </PrivateRoute>
            }
          />

          {/* Admin Only */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/courses"
            element={
              <AdminRoute>
                <ManageCourses />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/feedbacks"
            element={
              <AdminRoute>
                <AdminFeedbacks />
              </AdminRoute>
            }
          />

          {/* Catch-all */}
          <Route path="*" element={<h2>404 Not Found ❌</h2>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}