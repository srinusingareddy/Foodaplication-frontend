import { useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";

export default function AddRestaurant() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [saving, setSaving] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !address.trim()) return alert("All fields required");

    try {
      setSaving(true);
      await api.post("/admin/restaurants", {
        name: name.trim(),
        address: address.trim(),
      });
      alert("Restaurant Added ✅");
      navigate("/admin/restaurants");
    } catch (err) {
      console.error(err);
      alert("Failed to add restaurant");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Layout title="Admin • Add Restaurant">
      <div className="formWrap">
        <div className="h1">Add Restaurant</div>
        <div className="sub">Create a new restaurant 🏬</div>

        <div className="formCard" style={{ marginTop: 12 }}>
          <form onSubmit={submit}>
            <div className="fRow">
              <div className="fLabel">Restaurant Name</div>
              <input
                className="fInput"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Eg: Paradise"
              />
            </div>

            <div className="fRow">
              <div className="fLabel">Address</div>
              <input
                className="fInput"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Eg: Miyapur"
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
