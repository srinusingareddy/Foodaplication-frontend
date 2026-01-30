import { useState } from "react";
import api from "../../api/api";

function AddRestaurant() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post("/admin/restaurants", {
      name,
      address,   // ✅ MUST MATCH BACKEND FIELD
    });

    alert("Restaurant Added");
    setName("");
    setAddress("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Restaurant</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />

      <button>Add</button>
    </form>
  );
}

export default AddRestaurant;
