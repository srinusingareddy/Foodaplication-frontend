import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Layout title="Admin • Dashboard">
      <div className="row" style={{ justifyContent: "flex-end" }}>
        <button className="btn danger" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="h1">Admin Dashboard</div>
      <div className="sub">
        Manage restaurants, food items and orders 👨‍🍳
      </div>

      <div className="statGrid">
        <div className="statCard">
          <div className="statTitle">Restaurants</div>
          <div className="statValue">Manage</div>
          <div className="statHint">Add / Edit / Delete</div>
        </div>

        <div className="statCard">
          <div className="statTitle">Food Items</div>
          <div className="statValue">Manage</div>
          <div className="statHint">Per restaurant menu</div>
        </div>

        <div className="statCard">
          <div className="statTitle">Orders</div>
          <div className="statValue">Track</div>
          <div className="statHint">Update status</div>
        </div>
      </div>

      <div className="adminActions">
        <button className="aBtn" onClick={() => navigate("/admin/restaurants/add")}>
          ➕ Add Restaurant
        </button>

        <button className="aBtn" onClick={() => navigate("/admin/restaurants")}>
          🏪 View Restaurants
        </button>

        <button className="aBtn" onClick={() => navigate("/admin/orders")}>
          📦 View Orders
        </button>
      </div>
    </Layout>
  );
}
