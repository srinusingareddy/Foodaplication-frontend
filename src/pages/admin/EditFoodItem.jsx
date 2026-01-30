import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";

function EditFoodItem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // 🔹 LOAD EXISTING FOOD ITEM
  useEffect(() => {
    api.get(`/admin/fooditems/${id}`)
      .then((res) => {
        setName(res.data.name);
        setPrice(res.data.price);
      })
      .catch(() => {
        alert("Failed to load food item");
      });
  }, [id]);

  // 🔹 UPDATE FOOD ITEM
  const handleUpdate = async (e) => {
    e.preventDefault();

    await api.put(`/admin/fooditems/${id}`, {
      name,
      price,
    });

    alert("Food item updated successfully");
    navigate(-1); // go back
  };

  return (
    <form onSubmit={handleUpdate}>
      <h2>Edit Food Item</h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Food Name"
        required
      />

      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        required
      />

      <button type="submit">Update</button>
    </form>
  );
}

export default EditFoodItem;
