import { useNavigate } from "react-router-dom";
import UserRestaurantList from "./UserRestaurantList";

function UserDashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>User Dashboard</h2>

      <button onClick={() => navigate("/user/cart")}>Cart</button>
      <button onClick={() => navigate("/user/orders")}>My Orders</button>

      <UserRestaurantList />
    </div>
  );
}

export default UserDashboard;
