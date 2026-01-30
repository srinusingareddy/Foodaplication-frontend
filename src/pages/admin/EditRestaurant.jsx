import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";

function EditRestaurant() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  // GET restaurant by id
  useEffect(() => {
    api.get(`/admin/restaurants/${id}`).then((res) => {
      setName(res.data.name);
      setAddress(res.data.address); // ✅ FIX
    });
  }, [id]);

  // UPDATE restaurant
  const handleUpdate = async (e) => {
    e.preventDefault();

    await api.put(`/admin/restaurants/${id}`, {
      name,
      address, // ✅ FIX
    });

    alert("Restaurant updated successfully");
    navigate("/admin/restaurants");
  };

  return (
    <form onSubmit={handleUpdate}>
      <h2>Edit Restaurant</h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Restaurant Name"
      />

      <input
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Address"
      />

      <button type="submit">Update</button>
    </form>
  );
}

export default EditRestaurant;
