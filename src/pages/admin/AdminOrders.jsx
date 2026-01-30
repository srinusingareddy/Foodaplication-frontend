import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

function AdminOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // normalize response to array
  const normalizeOrders = (data) => {
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.orders)) return data.orders;
    return [];
  };

  const loadOrders = async () => {
    try {
      const res = await api.get("/admin/orders"); // matches: /api/admin/orders
      setOrders(normalizeOrders(res.data));
    } catch (err) {
      console.error(err);
      alert("Failed to load admin orders");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // ✅ FIXED: send JSON body, not query param
  const updateStatus = async (orderId, status) => {
    try {
      await api.put(`/admin/orders/${orderId}/status`, { status }); // ✅ body
      await loadOrders();
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  return (
    <div>
      <h2>Admin Orders</h2>
      <button onClick={() => navigate("/admin")}>Back</button>

      {loading && <p>Loading...</p>}
      {!loading && orders.length === 0 && <p>No orders found</p>}

      {orders.map((o) => {
        // ✅ DTO fields from your backend
        const userEmail = o?.userEmail || "N/A";
        const userId = o?.userId ?? "N/A";
        const total = o?.totalAmount ?? 0;
        const time = o?.orderTime ?? "N/A";

        return (
          <div
            key={o.id}
            style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}
          >
            <p>
              <b>Order ID:</b> {o.id}
            </p>

            <p>
              <b>User:</b> {userEmail} (ID: {userId})
            </p>

            <p>
              <b>Status:</b> {o?.status || "N/A"}
            </p>

            <p>
              <b>Total:</b> ₹{total}
            </p>

            <p>
              <b>Time:</b> {String(time)}
            </p>

            {/* Status buttons */}
            <button onClick={() => updateStatus(o.id, "PLACED")}>PLACED</button>
            <button onClick={() => updateStatus(o.id, "COOKING")}>COOKING</button>
            <button onClick={() => updateStatus(o.id, "DELIVERED")}>DELIVERED</button>

            <hr />

            <b>Items:</b>
            {Array.isArray(o?.items) && o.items.length > 0 ? (
              o.items.map((it) => (
                <p key={it.id}>
                  {it.foodName || "Item"} × {it.quantity ?? 0} (₹{it.price ?? 0})
                </p>
              ))
            ) : (
              <p>No items</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default AdminOrders;
