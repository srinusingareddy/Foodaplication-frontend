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

      const res = await api.post("/auth/login", {
        email: cleanEmail,
        password,
      });

      // ✅ store token + role
      localStorage.setItem("token", res.data.token);

      // ✅ normalize role (handles ROLE_ADMIN / ROLE_USER)
      const role = (res.data.role || "").replace("ROLE_", "");
      localStorage.setItem("role", role);

      if (role === "ADMIN") navigate("/admin");
      else navigate("/user");
    } catch (err) {
      console.error(err);
      setMsg("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Welcome back</h2>
        <p className="auth-subtitle">Login to continue</p>

        {msg ? <div className="auth-error">{msg}</div> : null}

        <form onSubmit={handleLogin} className="auth-form">
          <label className="auth-label">Email</label>
          <input
            className="auth-input"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />

          <label className="auth-label">Password</label>
          <input
            className="auth-input"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />

          <button className="auth-btn" type="submit" disabled={loading}>
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
