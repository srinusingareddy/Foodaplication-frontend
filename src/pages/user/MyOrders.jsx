import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import Layout from "../../components/Layout";

export default function MyOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const normalizeOrders = (data) => {
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.orders)) return data.orders;
    if (data && typeof data === "object" && data.id) return [data];
    return [];
  };

  const loadOrders = async () => {
    setLoading(true);
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

  useEffect(() => {
    loadOrders();
  }, []);

  const statusClass = (s) => {
    const x = String(s || "").toUpperCase();
    if (x === "DELIVERED") return "badge green";
    if (x === "COOKING") return "badge orange";
    if (x === "PLACED") return "badge blue";
    if (x === "CANCELLED") return "badge red";
    return "badge gray";
  };

  return (
    <Layout title="User • Orders">
      <div className="row" style={{ justifyContent: "space-between", marginBottom: 14 }}>
        <div>
          <div className="h1">My Orders</div>
          <div className="sub">Track your orders here 📦</div>
        </div>

        <div className="row">
          <button className="btn" onClick={() => navigate("/user")}>
            ⬅ Back
          </button>
          <button className="btn" onClick={loadOrders}>
            🔄 Refresh
          </button>
        </div>
      </div>

      {loading && <div className="card cardPad">Loading...</div>}

      {!loading && orders.length === 0 && (
        <div className="card cardPad">No orders found</div>
      )}

      {!loading && orders.length > 0 && (
        <div className="ordersWrap">
          {orders.map((o) => {
            const total = o?.totalAmount ?? 0;
            const time = o?.orderTime ? String(o.orderTime) : "N/A";
            const items = Array.isArray(o?.orderItems) ? o.orderItems : [];

            return (
              <div key={o.id} className="orderCard">
                <div className="orderTop">
                  <div>
                    <div className="orderId">Order #{o.id}</div>
                    <div className="orderTime">{time}</div>
                  </div>

                  <div className={statusClass(o.status)}>
                    {o?.status || "N/A"}
                  </div>
                </div>

                <div className="orderMid">
                  <div className="orderTotal">Total: ₹{total}</div>
                </div>

                <div className="orderItems">
                  <div className="itemsTitle">Items</div>

                  {items.length > 0 ? (
                    items.map((it, idx) => (
                      <div key={it.id ?? idx} className="itemRow">
                        <span className="itemName">
                          {it.foodItem?.name || "Item"}
                        </span>
                        <span className="itemQty">× {it.quantity ?? 0}</span>
                      </div>
                    ))
                  ) : (
                    <div className="emptyItems">No items</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Layout>
  );
}
