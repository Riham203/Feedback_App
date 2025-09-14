import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../content/AuthContext";
import axios from "axios";

export default function Dashboard() {
  const { token } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/courses", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(res.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [token]);

  if (loading) return <p style={{ textAlign: "center" }}>Loading courses...</p>;

  return (
    <div style={{ textAlign: "center", marginTop: "50px", color: "#fff" }}>
      <h1>📊 Student Dashboard</h1>
      <p>Welcome to your dashboard. View your courses here.</p>

      <div style={{ marginTop: "30px" }}>
        <h2>📚 Available Courses</h2>
        {courses.length === 0 ? (
          <p>No courses available</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            {courses.map((course) => (
              <div
                key={course._id}
                style={{
                  background: "#1f1f1f",
                  padding: "20px",
                  borderRadius: "8px",
                  boxShadow: "0px 2px 6px rgba(0,0,0,0.3)",
                  textAlign: "left",
                }}
              >
                <h3 style={{ marginBottom: "8px", color: "#61dafb" }}>
                  {course.code} – {course.name}
                </h3>
                <p style={{ fontSize: "14px", color: "#bbb" }}>
                  {course.description || "No description provided."}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}