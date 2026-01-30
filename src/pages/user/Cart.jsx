import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  const loadCart = async () => {
    const res = await api.get("/user/cart");
    setCartItems(Array.isArray(res.data) ? res.data : []);
  };

  useEffect(() => {
    loadCart().catch((err) => {
      console.error(err);
      alert("Failed to load cart");
    });
  }, []);

  const increase = async (cartId) => {
    try {
      await api.put(`/user/cart/${cartId}/increase`);
      await loadCart();
    } catch (err) {
      console.error(err);
      alert("Failed to increase quantity");
    }
  };

  const decrease = async (cartId) => {
    try {
      await api.put(`/user/cart/${cartId}/decrease`);
      await loadCart();
    } catch (err) {
      console.error(err);
      alert("Failed to decrease quantity");
    }
  };

  const remove = async (cartId) => {
    try {
      await api.delete(`/user/cart/${cartId}`);
      await loadCart();
    } catch (err) {
      console.error(err);
      alert("Failed to remove item");
    }
  };

  const total = cartItems.reduce((sum, c) => {
    const price = c.foodItem?.price || 0;
    const qty = c.quantity || 0;
    return sum + price * qty;
  }, 0);

  const placeOrder = async () => {
    try {
      await api.post("/user/orders");
      alert("Order placed successfully ✅");
      await loadCart();
      navigate("/user/orders");
    } catch (err) {
      console.error(err);
      alert("Order failed");
    }
  };

  return (
    <div>
      <h2>Your Cart</h2>
      <button onClick={() => navigate("/user")}>Back</button>

      {cartItems.length === 0 && <p>Cart is empty</p>}

      {cartItems.map((c) => (
        <div key={c.id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
          <h4>{c.foodItem?.name}</h4>
          <p>₹{c.foodItem?.price} × {c.quantity}</p>

          <button onClick={() => decrease(c.id)}>-</button>
          <button onClick={() => increase(c.id)}>+</button>
          <button onClick={() => remove(c.id)}>Remove</button>
        </div>
      ))}

      {cartItems.length > 0 && (
        <>
          <h3>Total: ₹{total}</h3>
          <button onClick={placeOrder}>Place Order</button>
        </>
      )}
    </div>
  );
}

export default Cart;
