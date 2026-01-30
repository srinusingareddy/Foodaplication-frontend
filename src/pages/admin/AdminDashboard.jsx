import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate(); // ✅ THIS WAS MISSING

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <br />

      <button onClick={() => navigate("/admin/add-restaurant")}>
        Add Restaurant
      </button>

      <br /><br />

      <button onClick={() => navigate("/admin/restaurants")}>
        View Restaurants
      </button>

      <br /><br />

      <button onClick={() => navigate("/admin/orders")}>
        View Orders
      </button>
    </div>
  );
}

export default AdminDashboard;
