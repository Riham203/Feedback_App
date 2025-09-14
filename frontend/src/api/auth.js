// frontend/src/api/auth.js
import axios from "axios";

// Base URL for your backend (from .env)
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

// Create axios instance
const API = axios.create({
  baseURL: API_URL,
});

// Attach token to every request if present
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Auth API calls
export const signup = async (data) => {
  return API.post("/auth/signup", data);
};

export const login = async (data) => {
  return API.post("/auth/login", data);
};

export const getProfile = async () => {
  return API.get("/auth/me");
};

export const updateProfile = async (data) => {
  return API.put("/auth/me", data);
};

export const changePassword = async (data) => {
  return API.put("/auth/me/password", data);
};