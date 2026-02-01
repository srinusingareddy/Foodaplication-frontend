import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import Layout from "../../components/Layout";
import CartItemCard from "../../components/CartItemCard";

export default function Cart() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);
  const [placing, setPlacing] = useState(false);

  const loadCart = async () => {
    setLoading(true);
    try {
      const res = await api.get("/user/cart");
      setCartItems(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      alert("Failed to load cart");
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const increase = async (cartId) => {
    try {
      setBusyId(cartId);
      await api.put(`/user/cart/${cartId}/increase`);
      await loadCart();
    } catch (err) {
      console.error(err);
      alert("Failed to increase quantity");
    } finally {
      setBusyId(null);
    }
  };

  const decrease = async (cartId, qty) => {
    if ((qty ?? 0) <= 1) {
      alert("Quantity cannot be less than 1. Use Remove.");
      return;
    }
    try {
      setBusyId(cartId);
      await api.put(`/user/cart/${cartId}/decrease`);
      await loadCart();
    } catch (err) {
      console.error(err);
      alert("Failed to decrease quantity");
    } finally {
      setBusyId(null);
    }
  };

  const remove = async (cartId) => {
    const ok = window.confirm("Remove this item from cart?");
    if (!ok) return;

    try {
      setBusyId(cartId);
      await api.delete(`/user/cart/${cartId}`);
      await loadCart();
    } catch (err) {
      console.error(err);
      alert("Failed to remove item");
    } finally {
      setBusyId(null);
    }
  };

  const total = cartItems.reduce((sum, c) => {
    const price = Number(c.foodItem?.price ?? 0);
    const qty = Number(c.quantity ?? 0);
    return sum + price * qty;
  }, 0);

  const placeOrder = async () => {
    if (cartItems.length === 0) return;

    const ok = window.confirm("Place order now?");
    if (!ok) return;

    try {
      setPlacing(true);
      await api.post("/user/orders");
      alert("Order placed successfully ✅");
      await loadCart();
      navigate("/user/orders");
    } catch (err) {
      console.error(err);
      alert("Order failed");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <Layout title="User • Cart">
      <div className="row" style={{ justifyContent: "space-between", marginBottom: 14 }}>
        <div>
          <div className="h1">Your Cart</div>
          <div className="sub">Review items and place order 🛒</div>
        </div>

        <div className="row">
          <button className="btn" onClick={() => navigate("/user")}>⬅ Back</button>
          <button className="btn" onClick={loadCart}>🔄 Refresh</button>
        </div>
      </div>

      {loading && <div className="card cardPad">Loading...</div>}

      {!loading && cartItems.length === 0 && (
        <div className="card cardPad">Cart is empty</div>
      )}

      {!loading && cartItems.length > 0 && (
        <div className="cartGrid">
          {/* left list */}
          <div className="cartList">
            {cartItems.map((c) => (
              <CartItemCard
                key={c.id}
                item={c}
                busy={busyId === c.id}
                onIncrease={() => increase(c.id)}
                onDecrease={() => decrease(c.id, c.quantity)}
                onRemove={() => remove(c.id)}
              />
            ))}
          </div>

          {/* right summary */}
          <div className="summaryBox">
            <div className="sumTitle">Order Summary</div>

            <div className="sumRow">
              <span>Items</span>
              <b>{cartItems.length}</b>
            </div>

            <div className="sumRow">
              <span>Total</span>
              <b>₹{total}</b>
            </div>

            <button
              className="placeBtn"
              disabled={placing}
              onClick={placeOrder}
            >
              {placing ? "Placing..." : "Place Order ✅"}
            </button>

            <button className="btn full" onClick={() => navigate("/user/orders")}>
              View My Orders
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}
