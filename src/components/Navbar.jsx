import { useNavigate } from "react-router-dom";

export default function Navbar({ title = "Food App", right }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div
      className="card"
      style={{
        borderRadius: 0,
        borderLeft: "none",
        borderRight: "none",
        borderTop: "none",
      }}
    >
      <div
        className="container"
        style={{
          padding: "14px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              background: "linear-gradient(90deg, var(--primary), var(--primary2))",
              display: "grid",
              placeItems: "center",
              fontWeight: 900,
            }}
          >
            🍽
          </div>
          <div>
            <div style={{ fontWeight: 900, fontSize: 16 }}>{title}</div>
            <div style={{ color: "var(--muted)", fontSize: 12 }}>
              Order • Track • Enjoy
            </div>
          </div>
        </div>

        <div className="row">
          {right}
          <button className="btn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
