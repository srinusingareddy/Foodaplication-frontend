import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import Layout from "../../components/Layout";
import AdminRestaurantCard from "../../components/AdminRestaurantCard";

export default function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/restaurants");
      setRestaurants(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      alert("Failed to load restaurants");
      setRestaurants([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const deleteRestaurant = async (id) => {
    const ok = window.confirm("Delete this restaurant?");
    if (!ok) return;

    try {
      setDeletingId(id);
      await api.delete(`/admin/restaurants/${id}`);
      setRestaurants((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete restaurant");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <Layout title="Admin • Restaurants">
      <div className="row" style={{ justifyContent: "space-between", marginBottom: 14 }}>
        <div>
          <div className="h1">Restaurants</div>
          <div className="sub">Manage restaurants here 🏬</div>
        </div>

        <div className="row">
          <button className="btn" onClick={() => navigate("/admin")}>
            ⬅ Back
          </button>
          <button className="btn" onClick={load}>
            🔄 Refresh
          </button>
          <button className="btn" onClick={() => navigate("/admin/add-restaurant")}>
            ➕ Add Restaurant
          </button>
        </div>
      </div>

      {loading && <div className="card cardPad">Loading...</div>}

      {!loading && restaurants.length === 0 && (
        <div className="card cardPad">No restaurants found</div>
      )}

      {!loading && restaurants.length > 0 && (
        <div className="aGrid">
          {restaurants.map((r) => (
            <AdminRestaurantCard
              key={r.id}
              restaurant={r}
              deleting={deletingId === r.id}
              onFoodItems={() => navigate(`/admin/restaurants/${r.id}/food-items`)}
              onEdit={() => navigate(`/admin/edit-restaurant/${r.id}`)}
              onDelete={() => deleteRestaurant(r.id)}
            />
          ))}
        </div>
      )}
    </Layout>
  );
}
