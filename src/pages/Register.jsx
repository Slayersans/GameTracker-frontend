import { useState } from "react";
import { apiFetch } from "../api";
import { Link } from "react-router-dom";
import "../styles/Auth.css";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const data = await apiFetch("users/register", {
      method: "POST",
      body: JSON.stringify(form),
    });

    if (data.error || data.message?.includes("Error")) {
      setError(data.message || "Error registering user");
    } else {
      window.location.href = "/login";
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Create Account</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="auth-input"
        />
        <input
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="auth-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="auth-input"
        />
        {error && <p className="auth-error">{error}</p>}
        <button type="submit" className="auth-button">Register</button>
      </form>

      <p className="auth-switch">
        Do you already have an account? <Link to="/login">Log in here</Link>
      </p>
    </div>
  );
}

export default Register;
