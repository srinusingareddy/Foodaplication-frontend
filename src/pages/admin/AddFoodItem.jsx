import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";

function AddFoodItem() {
  const { restaurantId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     await api.post(
  `/admin/restaurants/${restaurantId}/fooditems`,
  {
    name,
    price,
  }
);


      // After success → go back to food list
      navigate(`/admin/restaurants/${restaurantId}/food-items`);
    } catch (err) {
      alert("Failed to add food item");
    }
  };

  return (
    <>
      <h2>Add Food Item</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Food Name</label>
          <br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Price</label>
          <br />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <button type="submit">Add Food</button>
      </form>
    </>
  );
}

export default AddFoodItem;
