import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

function MyOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const normalizeOrders = (data) => {
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.orders)) return data.orders;
    if (data && typeof data === "object" && data.id) return [data];
    return [];
  };

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const res = await api.get("/user/orders");
        setOrders(normalizeOrders(res.data));
      } catch (err) {
        console.error(err);
        alert(err?.response?.data?.message || "Failed to load orders");
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  return (
    <div>
      <h2>My Orders</h2>
      <button onClick={() => navigate("/user")}>Back</button>

      {loading && <p>Loading...</p>}
      {!loading && orders.length === 0 && <p>No orders found</p>}

      {orders.map((o) => (
        <div
          key={o.id}
          style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}
        >
          <p>
            <b>Order ID:</b> {o.id}
          </p>
          <p>
            <b>Status:</b> {o.status}
          </p>
          <p>
            <b>Total:</b> ₹{o.totalAmount}
          </p>
          <p>
            <b>Time:</b> {o.orderTime}
          </p>

          <b>Items:</b>
          {Array.isArray(o.orderItems) && o.orderItems.length > 0 ? (
            o.orderItems.map((i) => (
              <p key={i.id}>
                {i.foodItem?.name || "Item"} × {i.quantity}
              </p>
            ))
          ) : (
            <p>No items</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default MyOrders;
