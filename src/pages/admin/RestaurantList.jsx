import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/admin/restaurants").then((res) => {
      setRestaurants(res.data);
    });
  }, []);

  const deleteRestaurant = async (id) => {
    await api.delete(`/admin/restaurants/${id}`);
    setRestaurants(restaurants.filter((r) => r.id !== id));
  };

  return (
    <>
      <h2>Restaurants</h2>

      {restaurants.map((r) => (
        <div key={r.id}>
          {r.name}

          {/* FOOD ITEMS BUTTON */}
          <button
            onClick={() =>
              navigate(`/admin/restaurants/${r.id}/food-items`)
            }
          >
            Food Items
          </button>

          {/* EDIT */}
          <button
            onClick={() =>
              navigate(`/admin/edit-restaurant/${r.id}`)
            }
          >
            Edit
          </button>

          {/* DELETE */}
          <button onClick={() => deleteRestaurant(r.id)}>
            Delete
          </button>
        </div>
      ))}
    </>
  );
}

export default RestaurantList;
