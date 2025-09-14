import React, { useEffect, useState } from "react";
import { myFeedbacks, deleteFeedback } from "../api/feedback";

export default function MyFeedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    myFeedbacks().then((res) => setFeedbacks(res.data.data));
  }, []);

  const handleDelete = async (id) => {
    await deleteFeedback(id);
    setFeedbacks(feedbacks.filter((f) => f._id !== id));
  };

  return (
    <div style={{ maxWidth: "900px", margin: "60px auto", color: "#fff" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>📝 My Feedbacks</h1>

      {feedbacks.length === 0 ? (
        <p style={{ textAlign: "center", color: "#bbb" }}>
          No feedback submitted yet.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {feedbacks.map((f) => (
            <div
              key={f._id}
              style={{
                background: "#1f1f1f",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0px 2px 6px rgba(0,0,0,0.3)",
              }}
            >
              <h3 style={{ marginBottom: "10px", color: "#61dafb" }}>
                {f.course?.code} – {f.course?.name}
              </h3>
              <p style={{ fontSize: "14px", marginBottom: "6px", color: "#ccc" }}>
                ⭐ <strong>{f.rating}</strong> / 5
              </p>
              <p style={{ fontSize: "14px", marginBottom: "12px" }}>
                {f.message}
              </p>
              <button
                onClick={() => handleDelete(f._id)}
                style={{
                  background: "#dc3545",
                  color: "#fff",
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
  );
}