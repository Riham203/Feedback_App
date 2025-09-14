import React, { useState } from "react";
import { signup } from "../api/auth";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signup(form);
      alert("Signup successful!");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("Signup failed!");
    }
  };

  return (
    <div className="form1" style={{ textAlign: "center", marginTop: "40px" }}>
      <h3>SignUp</h3>
      <form className="container" onSubmit={handleSubmit}>
      <div>
        <input type="text" placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      </div>
      <div>
        <input type="email" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      </div>
      <div>
        <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      </div>
      <div>
        <button type="submit">Signup</button>
      </div>
    </form>
    </div>
  );
}