import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.MODE === "development"
    ? "http://localhost:4000/api"              // when running locally
    : "https://feedback-app-ssly.onrender.com/api", // deployed backend
  withCredentials: true, // allows cookies/JWT if needed
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
