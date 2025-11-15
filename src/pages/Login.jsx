import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { apiFetch } from "../api";
import { Link } from "react-router-dom";
import "../styles/Auth.css";

function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const data = await apiFetch("users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (data.token) {
      login(data.token);
      window.location.href = "/";
    } else {
      setError(data.message || "Incorrect credentials");
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Login</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="auth-input"
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="auth-input"
        />
        {error && <p className="auth-error">{error}</p>}
        <button type="submit" className="auth-button">send</button>
      </form>

      <p className="auth-switch">
        Don't you have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

export default Login;
