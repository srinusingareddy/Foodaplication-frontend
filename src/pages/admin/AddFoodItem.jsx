import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";
import Layout from "../../components/Layout";

export default function AddFoodItem() {
  const { restaurantId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [saving, setSaving] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !price) return alert("All fields required");
    const p = Number(price);
    if (Number.isNaN(p) || p <= 0) return alert("Price must be valid");

    try {
      setSaving(true);
      await api.post(`/admin/restaurants/${restaurantId}/fooditems`, {
        name: name.trim(),
        price: p,
      });

      alert("Food Item Added ✅");
      navigate(`/admin/restaurants/${restaurantId}/food-items`);
    } catch (err) {
      console.error(err);
      alert("Failed to add food item");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Layout title="Admin • Add Food">
      <div className="formWrap">
        <div className="h1">Add Food Item</div>
        <div className="sub">Create menu item 🍔</div>

        <div className="formCard" style={{ marginTop: 12 }}>
          <form onSubmit={submit}>
            <div className="fRow">
              <div className="fLabel">Food Name</div>
              <input
                className="fInput"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Eg: Chicken Biryani"
              />
            </div>

            <div className="fRow">
              <div className="fLabel">Price</div>
              <input
                className="fInput"
                type="number"
                min="1"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Eg: 150"
              />
            </div>

            <div className="fActions">
              <button className="btn" type="button" onClick={() => navigate(-1)}>
                Cancel
              </button>
              <button className="btn" disabled={saving}>
                {saving ? "Saving..." : "Save ✅"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
