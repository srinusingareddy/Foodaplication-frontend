
import { useState } from "react";
import api from "../../api/api";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg("");

    const cleanEmail = email.trim();

    if (!cleanEmail || !password) {
      setMsg("Email and password are required.");
      return;
    }

    try {
      setLoading(true);

      // Login API request
      const res = await api.post("/auth/login", {
        email: cleanEmail,
        password: password,
      });

      // Validate response
      if (!res.data.token || !res.data.role) {
        setMsg("Invalid server response. Please try again.");
        return;
      }

      // Store authentication details
      const role = (res.data.role || "")
        .replace("ROLE_", "")
        .toUpperCase();

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", role);
      localStorage.setItem("email", res.data.email || cleanEmail);

      // Redirect based on role
      if (role === "ADMIN") {
        navigate("/admin", { replace: true });
      } else if (role === "USER") {
        navigate("/user", { replace: true });
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("email");
        setMsg("Invalid user role.");
      }

    } catch (err) {
      console.error("Login error:", err.response || err);

      if (err.response?.status === 401) {
        setMsg("Invalid email or password.");
      } else if (err.response?.status === 404) {
        setMsg("Login API endpoint not found. Check backend URL.");
      } else if (!err.response) {
        setMsg("Cannot connect to server. Please check your internet or backend.");
      } else {
        setMsg("Server error. Please try again.");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <h2 className="auth-title">Welcome back</h2>
        <p className="auth-subtitle">Login to continue</p>

        {msg && (
          <div className="auth-error">
            {msg}
          </div>
        )}

        <form onSubmit={handleLogin} className="auth-form">

          <label className="auth-label">Email</label>
          <input
            className="auth-input"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />

          <label className="auth-label">Password</label>
          <input
            className="auth-input"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />

          <button
            className="auth-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <div className="auth-footer">
          New user?{" "}
          <Link className="auth-link" to="/register">
            Register
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Login;
