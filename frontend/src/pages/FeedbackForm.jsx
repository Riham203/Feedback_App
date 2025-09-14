import React, { useState, useEffect } from 'react';
import API from '../api/api';

export default function FeedbackForm() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ courseId: '', rating: 5, message: '' });
  const [msg, setMsg] = useState('');

  useEffect(() => {
    API.get('/courses').then(r => setCourses(r.data));
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/feedback', form);
      setMsg('✅ Feedback submitted');
    } catch (err) {
      setMsg(err.response?.data?.message || '❌ Failed to submit');
    }
  };

  return (
    <div className="container">
      <form className="form1" onSubmit={submit}>
        <h2>Feedback</h2>

        <select
          value={form.courseId}
          onChange={e => setForm({ ...form, courseId: e.target.value })}
        >
          <option value="">Select course</option>
          {courses.map(c => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          min="1"
          max="5"
          value={form.rating}
          onChange={e => setForm({ ...form, rating: e.target.value })}
          placeholder="Rating (1-5)"
        />

        <textarea
          value={form.message}
          onChange={e => setForm({ ...form, message: e.target.value })}
          placeholder="Your feedback"
        />

        <button type="submit">Submit</button>

        {msg && <div className="form-message">{msg}</div>}
      </form>
    </div>
  );
}