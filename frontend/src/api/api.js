import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.MODE === "development"
    ? "http://localhost:4000/api"              // when running locally
    : "https://feedback-app-ssly.onrender.com/api", // Render backend for Netlify
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
