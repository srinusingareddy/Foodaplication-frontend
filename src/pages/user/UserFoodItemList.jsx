import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";
import Layout from "../../components/Layout";
import FoodCard from "../../components/FoodCard";

export default function UserFoodItemList() {
  const { restaurantId } = useParams();
  const navigate = useNavigate();

  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingId, setAddingId] = useState(null);
  const [error, setError] = useState("");

  const loadFoodItems = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get(`/user/restaurants/${restaurantId}/fooditems`);
      setFoodItems(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      setError("Failed to load food items");
      setFoodItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFoodItems();
  }, [restaurantId]);

  const addToCart = async (foodItemId) => {
    try {
      setAddingId(foodItemId);
      await api.post(`/user/cart/${foodItemId}`);
      alert("Added to cart ✅");
    } catch (err) {
      console.error(err);
      alert("Failed to add to cart");
    } finally {
      setAddingId(null);
    }
  };

  return (
    <Layout title="User • Menu">
      <div className="row" style={{ justifyContent: "space-between", marginBottom: 14 }}>
        <div>
          <div className="h1">Menu</div>
          <div className="sub">Choose your favorite items 🍽</div>
        </div>

        <div className="row">
          <button className="btn" onClick={() => navigate("/user")}>⬅ Back</button>
          <button className="btn" onClick={() => navigate("/user/cart")}>🛒 Cart</button>
          <button className="btn" onClick={loadFoodItems}>🔄 Refresh</button>
        </div>
      </div>

      {loading && <div className="card cardPad">Loading...</div>}
      {error && <div className="card cardPad">{error}</div>}

      {!loading && !error && foodItems.length === 0 && (
        <div className="card cardPad">No food items found</div>
      )}

      {!loading && !error && foodItems.length > 0 && (
        <div className="grid">
          {foodItems.map((f) => (
            <FoodCard
              key={f.id}
              food={f}
              adding={addingId === f.id}
              onAdd={() => addToCart(f.id)}
            />
          ))}
        </div>
      )}
    </Layout>
  );
}
