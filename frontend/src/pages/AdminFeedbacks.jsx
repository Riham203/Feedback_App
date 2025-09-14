import React, { useEffect, useState, useContext } from "react";
import API from "../api/api";
import { AuthContext } from "../content/AuthContext";

export default function AdminFeedbacks() {
  const { token } = useContext(AuthContext);
  const [feedbacks, setFeedbacks] = useState([]);
  const [filters, setFilters] = useState({ courseId: "", rating: "", studentId: "" });

  useEffect(() => {
    fetchFeedbacks();
  }, [filters]);

  const fetchFeedbacks = async () => {
    try {
      const res = await API.get("/admin/feedbacks", {
        headers: { Authorization: `Bearer ${token}` },
        params: filters,
      });
      setFeedbacks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const exportCSV = async () => {
    try {
      const res = await API.get("/admin/feedbacks/export", {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob", // important for downloading files
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "feedbacks.csv");
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error("Export failed", err);
    }
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "50px auto", color: "#fff" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>📊 All Feedbacks</h1>

      {/* Filters */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Course ID"
          value={filters.courseId}
          onChange={(e) => setFilters({ ...filters, courseId: e.target.value })}
          style={{ padding: "8px", flex: 1 }}
        />
        <input
          type="number"
          placeholder="Rating"
          value={filters.rating}
          onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
          style={{ padding: "8px", width: "100px" }}
        />
        <input
          type="text"
          placeholder="Student ID"
          value={filters.studentId}
          onChange={(e) => setFilters({ ...filters, studentId: e.target.value })}
          style={{ padding: "8px", flex: 1 }}
        />
        <button
          onClick={exportCSV}
          style={{
            background: "#007bff",
            border: "none",
            color: "#fff",
            padding: "10px 15px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Export CSV
        </button>
      </div>

      {/* Feedback Table */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#2c2c2c" }}>
            <th style={{ padding: "10px", border: "1px solid #444" }}>Course</th>
            <th style={{ padding: "10px", border: "1px solid #444" }}>Student</th>
            <th style={{ padding: "10px", border: "1px solid #444" }}>Rating</th>
            <th style={{ padding: "10px", border: "1px solid #444" }}>Message</th>
            <th style={{ padding: "10px", border: "1px solid #444" }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((f) => (
            <tr key={f._id}>
              <td style={{ padding: "10px", border: "1px solid #444" }}>
                {f.course?.code} - {f.course?.name}
              </td>
              <td style={{ padding: "10px", border: "1px solid #444" }}>
                {f.student?.name} ({f.student?.email})
              </td>
              <td style={{ padding: "10px", border: "1px solid #444" }}>{f.rating} ⭐</td>
              <td style={{ padding: "10px", border: "1px solid #444" }}>{f.message}</td>
              <td style={{ padding: "10px", border: "1px solid #444" }}>
                {new Date(f.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}