import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../content/AuthContext";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function AdminDashboard() {
  const { token } = useContext(AuthContext);
  const [stats, setStats] = useState({ totalFeedback: 0, totalStudents: 0 });
  const [students, setStudents] = useState([]);
  const [trends, setTrends] = useState([]);
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    if (token) {
      // 📊 Stats
      axios
        .get(`${API_URL}/admin/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setStats(res.data));

      // 👨‍🎓 Students
      axios
        .get(`${API_URL}/admin/students`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setStudents(res.data));

      // 📈 Feedback Trends
      axios
        .get(`${API_URL}/admin/trends`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setTrends(res.data));

      // 🔥 Popular Courses
      axios
        .get(`${API_URL}/admin/popular-courses`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setPopular(res.data));
    }
  }, [token]);

  const blockStudent = async (id) => {
    await axios.put(
      `${API_URL}/admin/students/${id}/block`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setStudents(
      students.map((s) => (s._id === id ? { ...s, blocked: true } : s))
    );
  };

  const unblockStudent = async (id) => {
    await axios.put(
      `${API_URL}/admin/students/${id}/unblock`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setStudents(
      students.map((s) => (s._id === id ? { ...s, blocked: false } : s))
    );
  };

  const deleteStudent = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await axios.delete(`${API_URL}/admin/students/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(students.filter((s) => s._id !== id));
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>👩‍💻 Admin Dashboard</h1>

      <h3>📊 Stats</h3>
      <p>Total Feedback: {stats.totalFeedback}</p>
      <p>Total Students: {stats.totalStudents}</p>

      <h3>👨‍🎓 Students</h3>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.blocked ? "❌ Blocked" : "✅ Active"}</td>
              <td>
                {s.blocked ? (
                  <button onClick={() => unblockStudent(s._id)}>Unblock</button>
                ) : (
                  <button onClick={() => blockStudent(s._id)}>Block</button>
                )}
                <button
                  onClick={() => deleteStudent(s._id)}
                  style={{ marginLeft: "10px", color: "red" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>📈 Feedback Trends</h3>
      <ul>
        {trends.map((t) => (
          <li key={t.course}>
            {t.course}: {t.avgRating.toFixed(1)} ⭐ ({t.feedbackCount} feedbacks)
          </li>
        ))}
      </ul>

      <h3>🔥 Popular Courses</h3>
      <ul>
        {popular.map((c) => (
          <li key={c.course}>
            {c.course} - {c.feedbackCount} feedbacks
          </li>
        ))}
      </ul>
    </div>
  );
}