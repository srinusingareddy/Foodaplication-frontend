import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";

function FoodItemList() {
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    api
      .get(`/admin/restaurants/${restaurantId}/fooditems`)
      .then((res) => {
        setFoodItems(res.data);
      });
  }, [restaurantId]);

  const deleteFoodItem = async (id) => {
    await api.delete(`/admin/fooditems/${id}`);
    setFoodItems(foodItems.filter((f) => f.id !== id));
  };

  return (
    <>
      <h2>Food Items</h2>

      <button
        onClick={() =>
          navigate(`/admin/restaurants/${restaurantId}/add-food`)
        }
      >
        Add Food Item
      </button>

      {foodItems.length === 0 && <p>No food items found</p>}

      {foodItems.map((f) => (
        <div key={f.id}>
          {f.name} - ₹{f.price}
          <button onClick={() => navigate(`/admin/edit-food/${f.id}`)}>
            Edit
          </button>
          <button onClick={() => deleteFoodItem(f.id)}>
            Delete
          </button>
        </div>
      ))}
    </>
  );
}

export default FoodItemList;
