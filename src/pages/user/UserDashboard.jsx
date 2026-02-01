import { useNavigate } from "react-router-dom";
import UserRestaurantList from "./UserRestaurantList";

function UserDashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="appBg">
      {/* ===== TOP BAR ===== */}
      <div className="topBar">
        <div className="topTitle">User Dashboard</div>

        <button
          className="topBtn"
          onClick={() => navigate("/user/cart")}
        >
          🛒 Cart
        </button>

        <button
          className="topBtn primary"
          onClick={() => navigate("/user/orders")}
        >
          📦 My Orders
        </button>

        <button
          className="topBtn danger"
          onClick={logout}
        >
          🚪 Logout
        </button>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="container">
        <UserRestaurantList />
      </div>
    </div>
  );
}

export default UserDashboard;
