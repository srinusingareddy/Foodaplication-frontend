import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

function UserRestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await api.get("/user/restaurants");
        setRestaurants(res.data || []);
      } catch (err) {
        console.error(err);
        alert("Failed to load restaurants");
        setRestaurants([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <div>
      <h3>Restaurants</h3>

      {loading && <p>Loading...</p>}

      {!loading && restaurants.length === 0 && <p>No restaurants found</p>}

      {restaurants.map((r) => (
        <div
          key={r.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h4>{r.name}</h4>
          <p>{r.address}</p>

          <button onClick={() => navigate(`/user/restaurants/${r.id}`)}>
            View Food Items
          </button>
        </div>
      ))}
    </div>
  );
}

export default UserRestaurantList;
