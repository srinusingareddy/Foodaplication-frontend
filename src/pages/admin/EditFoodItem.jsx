import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import Layout from "../../components/Layout";

export default function EditFoodItem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [restaurantId, setRestaurantId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/admin/fooditems/${id}`);
        setName(res.data?.name || "");
        setPrice(res.data?.price ?? "");
        setRestaurantId(res.data?.restaurant?.id || null);
      } catch (err) {
        console.error(err);
        alert("Failed to load food item");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !price) return alert("All fields required");

    const p = Number(price);
    if (Number.isNaN(p) || p <= 0) return alert("Price must be valid");

    try {
      setSaving(true);
      await api.put(`/admin/fooditems/${id}`, { name: name.trim(), price: p });

      alert("Food Item Updated ✅");

      if (restaurantId) navigate(`/admin/restaurants/${restaurantId}/food-items`);
      else navigate("/admin/restaurants");
    } catch (err) {
      console.error(err);
      alert("Failed to update food item");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Layout title="Admin • Edit Food">
      <div className="formWrap">
        <div className="h1">Edit Food Item</div>
        <div className="sub">Update menu item ✏</div>

        {loading ? (
          <div className="card cardPad" style={{ marginTop: 12 }}>Loading...</div>
        ) : (
          <div className="formCard" style={{ marginTop: 12 }}>
            <form onSubmit={submit}>
              <div className="fRow">
                <div className="fLabel">Food Name</div>
                <input
                  className="fInput"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                />
              </div>

              <div className="fActions">
                <button className="btn" type="button" onClick={() => navigate(-1)}>
                  Cancel
                </button>
                <button className="btn" disabled={saving}>
                  {saving ? "Saving..." : "Update ✅"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </Layout>
  );
}
