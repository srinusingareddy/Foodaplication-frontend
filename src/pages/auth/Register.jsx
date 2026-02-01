import { useState } from "react";
import api from "../../api/api";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/auth.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    setSuccess("");

    const cleanName = name.trim();
    const cleanEmail = email.trim();

    if (!cleanName || !cleanEmail || !password) {
      setMsg("Name, email, and password are required.");
      return;
    }

    if (password.length < 4) {
      setMsg("Password should be at least 4 characters.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/register", {
        name: cleanName,
        email: cleanEmail,
        password,
      });

      setSuccess("Registered successfully ✅ Now login.");
      setName("");
      setEmail("");
      setPassword("");

      // auto go login after 1 second
      setTimeout(() => navigate("/login"), 900);
    } catch (err) {
      console.error(err);
      setMsg(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Create account</h2>
        <p className="auth-subtitle">Register as a new user</p>

        {msg ? <div className="auth-error">{msg}</div> : null}
        {success ? <div className="auth-success">{success}</div> : null}

        <form onSubmit={submit} className="auth-form">
          <label className="auth-label">Name</label>
          <input
            className="auth-input"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />

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
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />

          <button className="auth-btn" type="submit" disabled={loading}>
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        <div className="auth-footer">
          Already have account?{" "}
          <Link className="auth-link" to="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
