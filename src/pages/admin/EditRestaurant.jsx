import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";
import Layout from "../../components/Layout";

export default function EditRestaurant() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        // ⚠️ only if backend has GET /admin/restaurants/{id}
        const res = await api.get(`/admin/restaurants/${id}`);
        setName(res.data?.name || "");
        setAddress(res.data?.address || "");
      } catch (err) {
        console.error(err);
        alert("Failed to load restaurant");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !address.trim()) return alert("All fields required");

    try {
      setSaving(true);
      await api.put(`/admin/restaurants/${id}`, {
        name: name.trim(),
        address: address.trim(),
      });
      alert("Restaurant Updated ✅");
      navigate("/admin/restaurants");
    } catch (err) {
      console.error(err);
      alert("Failed to update restaurant");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Layout title="Admin • Edit Restaurant">
      <div className="formWrap">
        <div className="h1">Edit Restaurant</div>
        <div className="sub">Update restaurant details ✏</div>

        {loading ? (
          <div className="card cardPad" style={{ marginTop: 12 }}>Loading...</div>
        ) : (
          <div className="formCard" style={{ marginTop: 12 }}>
            <form onSubmit={submit}>
              <div className="fRow">
                <div className="fLabel">Restaurant Name</div>
                <input
                  className="fInput"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="fRow">
                <div className="fLabel">Address</div>
                <input
                  className="fInput"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
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
