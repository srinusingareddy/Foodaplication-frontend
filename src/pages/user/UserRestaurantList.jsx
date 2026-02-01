import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import Layout from "../../components/Layout";
import RestaurantCard from "../../components/RestaurantCard"; // ✅ FIX

export default function UserRestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get("/user/restaurants");
      setRestaurants(Array.isArray(res.data) ? res.data : []);
    } catch (e) {
      console.error(e);
      alert("Failed to load restaurants");
      setRestaurants([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <Layout title="User • Restaurants">
      <div className="h1">Restaurants</div>
      <div className="sub">Pick a restaurant and explore the menu 🍛</div>

      {/* <div className="row" style={{ marginBottom: 14 }}>
        <button className="btn" onClick={() => navigate("/user/cart")}>
          🛒 Cart
        </button>
        <button className="btn" onClick={() => navigate("/user/orders")}>
          📦 My Orders
        </button>
        <button className="btn" onClick={load}>
          🔄 Refresh
        </button>
      </div> */}

      {loading && <div className="card cardPad">Loading...</div>}

      {!loading && restaurants.length === 0 && (
        <div className="card cardPad">No restaurants found</div>
      )}

      {!loading && restaurants.length > 0 && (
        <div className="grid">
          {restaurants.map((r) => (
            <RestaurantCard
              key={r.id}
              restaurant={r}
              onClick={() => navigate(`/user/restaurants/${r.id}`)}
            />
          ))}
        </div>
      )}
    </Layout>
  );
}
