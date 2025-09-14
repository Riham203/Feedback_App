import React, { useState, useContext } from "react";
import { login as loginAPI } from "../api/auth";
import { AuthContext } from "../content/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await loginAPI(form);

      // Save token + user in context
      login(res.data.token, res.data.user);

      alert("Login successful ✅");

      // Redirect based on role
      if (res.data.user.role === "admin") {
        window.location.href = "/admin";   // redirect to Admin Dashboard
      } else {
        window.location.href = "/dashboard"; // redirect to Student Dashboard
      }

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed ❌");
    }
  };

  return (
    <div  className="form1" style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form className="container" onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}