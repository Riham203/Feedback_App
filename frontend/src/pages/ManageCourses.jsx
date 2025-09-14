import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../content/AuthContext";

export default function ManageCourses() {
  const { token } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ name: "", code: "", description: "" });

  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/courses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleAddCourse = async () => {
    if (!form.name || !form.code) {
      alert("Name and code required");
      return;
    }
    try {
      await axios.post("http://localhost:4000/api/courses", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm({ name: "", code: "", description: "" });
      fetchCourses();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCourse = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCourses();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: "900px", margin: "60px auto", color: "#fff" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>📚 Manage Courses</h1>

      {/* Form */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "30px",
          justifyContent: "center",
        }}
      >
        <input
          type="text"
          placeholder="Course Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #555",
            width: "180px",
            background: "#2c2c2c",
            color: "#fff",
          }}
        />
        <input
          type="text"
          placeholder="Course Code"
          value={form.code}
          onChange={(e) => setForm({ ...form, code: e.target.value })}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #555",
            width: "150px",
            background: "#2c2c2c",
            color: "#fff",
          }}
        />
        <input
          type="text"
          placeholder="Course Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #555",
            flex: 1,
            background: "#2c2c2c",
            color: "#fff",
          }}
        />
        <button
          onClick={handleAddCourse}
          style={{
            background: "#007bff",
            color: "#fff",
            padding: "10px 18px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Add Course
        </button>
      </div>

      {/* Courses List */}
      <div>
        {courses.length === 0 ? (
          <p style={{ textAlign: "center" }}>No courses available</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px",
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
                }}
              >
                <h3 style={{ marginBottom: "8px" }}>
                  ({course.code}) {course.name}
                </h3>
                <p style={{ fontSize: "14px", color: "#bbb" }}>
                  {course.description}
                </p>
                <button
                  onClick={() => handleDeleteCourse(course._id)}
                  style={{
                    marginTop: "10px",
                    background: "#dc3545",
                    color: "white",
                    border: "none",
                    padding: "8px 14px",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}