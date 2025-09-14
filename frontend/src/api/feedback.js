import API from "./api";

export const submitFeedback = (data) => API.post("/feedback", data);
export const myFeedbacks = (page = 1, limit = 10) =>
  API.get(`/feedback/my?page=${page}&limit=${limit}`);
export const updateFeedback = (id, data) => API.put(`/feedback/${id}`, data);
export const deleteFeedback = (id) => API.delete(`/feedback/${id}`);

// Admin
export const allFeedbacks = () => API.get("/feedback");
export const exportCSV = () => API.get("/feedback/export", { responseType: "blob" });