  // import { useEffect, useState } from "react";
  // import { useNavigate } from "react-router-dom";
  // import api from "../../api/api";

  // function AdminOrders() {
  //   const navigate = useNavigate();
  //   const [orders, setOrders] = useState([]);
  //   const [loading, setLoading] = useState(true);
  //   const [updatingId, setUpdatingId] = useState(null);

  //   const normalizeOrders = (data) => {
  //     if (Array.isArray(data)) return data;
  //     if (data && Array.isArray(data.orders)) return data.orders;
  //     return [];
  //   };

  //   const loadOrders = async () => {
  //     setLoading(true);
  //     try {
  //       const res = await api.get("/admin/orders");
  //       setOrders(normalizeOrders(res.data));
  //     } catch (err) {
  //       console.error(err);
  //       alert("Failed to load admin orders");
  //       setOrders([]);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   useEffect(() => {
  //     loadOrders();
  //   }, []);

  //   const updateStatus = async (orderId, status) => {
  //     try {
  //       setUpdatingId(orderId);
  //       await api.put(`/admin/orders/${orderId}/status`, { status });
  //       await loadOrders();
  //     } catch (err) {
  //       console.error(err);
  //       alert("Failed to update status");
  //     } finally {
  //       setUpdatingId(null);
  //     }
  //   };

  //   return (
  //     <div style={{ padding: 20 }}>
  //       <h2>Admin Orders</h2>

  //       <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
  //         <button onClick={() => navigate("/admin")}>Back</button>
  //         <button onClick={loadOrders}>Refresh</button>
  //       </div>

  //       {loading && <p>Loading...</p>}
  //       {!loading && orders.length === 0 && <p>No orders found</p>}

  //       {orders.map((o) => {
  //         const userEmail = o?.userEmail || o?.user?.email || "N/A";
  //         const userId = o?.userId ?? o?.user?.id ?? "N/A";
  //         const total = o?.totalAmount ?? o?.total ?? 0;
  //         const time = o?.orderTime ?? o?.orderDate ?? "N/A";

  //         return (
  //           <div
  //             key={o.id}
  //             style={{
  //               border: "1px solid #ccc",
  //               margin: "10px 0",
  //               padding: 10,
  //               borderRadius: 8,
  //             }}
  //           >
  //             <p>
  //               <b>Order ID:</b> {o.id}
  //             </p>

  //             <p>
  //               <b>User:</b> {userEmail} (ID: {userId})
  //             </p>

  //             <p>
  //               <b>Status:</b> {o?.status || "N/A"}
  //             </p>

  //             <p>
  //               <b>Total:</b> ₹{total}
  //             </p>

  //             <p>
  //               <b>Time:</b> {String(time)}
  //             </p>

  //             <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
  //               <button
  //                 disabled={updatingId === o.id}
  //                 onClick={() => updateStatus(o.id, "PLACED")}
  //               >
  //                 PLACED
  //               </button>
  //               <button
  //                 disabled={updatingId === o.id}
  //                 onClick={() => updateStatus(o.id, "COOKING")}
  //               >
  //                 COOKING
  //               </button>
  //               <button
  //                 disabled={updatingId === o.id}
  //                 onClick={() => updateStatus(o.id, "DELIVERED")}
  //               >
  //                 DELIVERED
  //               </button>
  //             </div>

  //             <hr />

  //             <b>Items:</b>
  //             {Array.isArray(o?.items) && o.items.length > 0 ? (
  //               o.items.map((it, idx) => (
  //                 <p key={it.id ?? idx} style={{ margin: "6px 0" }}>
  //                   {(it.foodName || it.name || "Item")} × {it.quantity ?? 0} (₹
  //                   {it.price ?? 0})
  //                 </p>
  //               ))
  //             ) : (
  //               <p>No items</p>
  //             )}
  //           </div>
  //         );
  //       })}
  //     </div>
  //   );
  // }

  // export default AdminOrders;



  import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import Layout from "../../components/Layout";

function AdminOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const normalizeOrders = (data) => {
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.orders)) return data.orders;
    return [];
  };

  const loadOrders = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/orders");
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

  // ✅ FIX: backend expects ?status=VALUE (RequestParam), not JSON body
  const updateStatus = async (orderId, status) => {
    try {
      setUpdatingId(orderId);
      // await api.put(`/admin/orders/${orderId}/status?status=${status}`);
      await api.put(`/admin/orders/${orderId}/status`, { status });
      await loadOrders();
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const badgeClass = (status) => {
    const s = (status || "").toLowerCase();
    if (s === "placed") return "placed";
    if (s === "cooking") return "cooking";
    if (s === "delivered") return "delivered";
    return "default";
  };

  return (
    <Layout title="Admin • Orders">
      <div className="adminHeader">
        <div>
          <div className="h1">Admin Orders</div>
          <div className="sub">Manage orders and update status</div>
        </div>

        <div className="row">
          <button className="btn outline" onClick={() => navigate("/admin")}>
            ← Back
          </button>
          <button className="btn outline" onClick={loadOrders}>
            🔄 Refresh
          </button>
        </div>
      </div>

      {loading && <div className="card cardPad">Loading...</div>}
      {!loading && orders.length === 0 && (
        <div className="card cardPad">No orders found</div>
      )}

      <div className="ordersWrap">
        {orders.map((o) => {
          const userEmail = o?.user?.email ?? o?.userEmail ?? "N/A";
          const userId = o?.user?.id ?? o?.userId ?? "N/A";
          const total = o?.totalAmount ?? o?.total ?? 0;
          const time = o?.orderTime ?? o?.orderDate ?? "N/A";

          // ✅ FIX: items come as orderItems from backend
          const items = Array.isArray(o?.orderItems) ? o.orderItems : [];

          return (
            <div key={o.id} className="adminOrderCard">
              <div className="orderTop">
                <div>
                  <div className="orderId">Order #{o.id}</div>
                  <div className="orderUser">
                    {userEmail} (ID: {userId})
                  </div>
                </div>

                <span className={`statusBadge ${badgeClass(o?.status)}`}>
                  {o?.status || "N/A"}
                </span>
              </div>

              <div className="orderMeta">
                <span>
                  <b>Total:</b> ₹{total}
                </span>
                <span className="orderTime">{String(time)}</span>
              </div>

              <div className="statusBtns">
                {["PLACED", "COOKING", "DELIVERED"].map((s) => (
                  <button
                    key={s}
                    className={`statusBtn ${o?.status === s ? "active" : ""}`}
                    disabled={updatingId === o.id}
                    onClick={() => updateStatus(o.id, s)}
                  >
                    {updatingId === o.id ? "Updating..." : s}
                  </button>
                ))}
              </div>

              <div className="itemsBox">
                <b>Items</b>

                {items.length > 0 ? (
                  items.map((it) => (
                    <div key={it.id} className="itemRow">
                      <span className="itemName">
                        {it?.foodItem?.name ?? "Item"} × {it?.quantity ?? 0}
                      </span>
                      <span className="itemPrice">₹{it?.price ?? 0}</span>
                    </div>
                  ))
                ) : (
                  <div className="empty">No items</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}

export default AdminOrders;
