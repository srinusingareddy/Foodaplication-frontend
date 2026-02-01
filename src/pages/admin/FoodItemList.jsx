import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";
import Layout from "../../components/Layout";
import AdminFoodCard from "../../components/AdminFoodCard";

export default function FoodItemList() {
  const { restaurantId } = useParams();
  const navigate = useNavigate();

  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      // ✅ MUST MATCH BACKEND ENDPOINT
      const res = await api.get(`/admin/restaurants/${restaurantId}/fooditems`);
      setFoodItems(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      alert("Failed to load food items");
      setFoodItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [restaurantId]);

  const deleteFoodItem = async (id) => {
    const ok = window.confirm("Delete this food item?");
    if (!ok) return;

    try {
      setDeletingId(id);
      await api.delete(`/admin/fooditems/${id}`);
      setFoodItems((prev) => prev.filter((f) => f.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete food item");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <Layout title="Admin • Food Items">
      <div className="row" style={{ justifyContent: "space-between", marginBottom: 14 }}>
        <div>
          <div className="h1">Food Items</div>
          <div className="sub">Manage menu for this restaurant 🍔</div>
        </div>

        <div className="row">
          <button className="btn" onClick={() => navigate("/admin/restaurants")}>
            ⬅ Back
          </button>

          <button className="btn" onClick={load}>
            🔄 Refresh
          </button>

          <button
            className="btn"
            onClick={() => navigate(`/admin/restaurants/${restaurantId}/add-food`)}
          >
            ➕ Add Food
          </button>
        </div>
      </div>

      {loading && <div className="card cardPad">Loading...</div>}

      {!loading && foodItems.length === 0 && (
        <div className="card cardPad">No food items found</div>
      )}

      {!loading && foodItems.length > 0 && (
        <div className="afGrid">
          {foodItems.map((f) => (
            <AdminFoodCard
              key={f.id}
              food={f}
              deleting={deletingId === f.id}
              onEdit={() => navigate(`/admin/edit-food/${f.id}`)}
              onDelete={() => deleteFoodItem(f.id)}
            />
          ))}
        </div>
      )}
    </Layout>
  );
}
