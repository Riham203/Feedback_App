import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../content/AuthContext";
import { updateProfile, changePassword } from "../api/auth";

export default function Profile() {
  const { user, token, setUser, logout } = useContext(AuthContext);
  const [form, setForm] = useState({});
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "" });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        dob: user.dob ? user.dob.split("T")[0] : "",
        address: user.address || "",
      });
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProfile(form, token);
      setUser(res.data);
      alert("Profile updated ✅");
    } catch (err) {
      alert("Update failed ❌");
    }
  };

  const handlePassword = async (e) => {
    e.preventDefault();
    try {
      await changePassword(passwordForm, token);
      alert("Password updated ✅ Please login again.");
      logout();
    } catch (err) {
      alert("Password change failed ❌");
    }
  };

  if (!user) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>👤 My Profile</h1>
      <form className="form1" onSubmit={handleUpdate}>
        <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Name" />
        <input type="email" value={form.email} readOnly />
        <input type="text" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="Phone" />
        <input type="date" value={form.dob} onChange={e => setForm({ ...form, dob: e.target.value })} />
        <input type="text" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} placeholder="Address" />
        <button type="submit">Save Profile</button>
      </form>

      <hr />

      <h3>🔑 Change Password</h3>
      <form className="form1" onSubmit={handlePassword}>
        <input type="password" placeholder="Current Password" onChange={e => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })} />
        <input type="password" placeholder="New Password" onChange={e => setPasswordForm({ ...passwordForm, newPassword: e.target.value })} />
        <button type="submit">Update Password</button>
      </form>
    </div>
  );
}