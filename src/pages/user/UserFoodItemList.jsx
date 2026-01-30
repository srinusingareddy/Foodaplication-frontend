import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";

function UserFoodItemList() {
  const { restaurantId } = useParams();
  const navigate = useNavigate();

  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingId, setAddingId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadFoodItems = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await api.get(`/user/restaurants/${restaurantId}/fooditems`);
        setFoodItems(res.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load food items");
        setFoodItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadFoodItems();
  }, [restaurantId]);

  // ✅ Add to cart (DB)
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
    <div>
      <h2>Menu</h2>

      <button onClick={() => navigate("/user")}>Back</button>
      <button onClick={() => navigate("/user/cart")}>Go to Cart</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && foodItems.length === 0 && (
        <p>No food items found</p>
      )}

      {foodItems.map((f) => (
        <div
          key={f.id}
          style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}
        >
          <h4>{f.name}</h4>
          <p>₹{f.price}</p>

          <button
            onClick={() => addToCart(f.id)}
            disabled={addingId === f.id}
          >
            {addingId === f.id ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default UserFoodItemList;
