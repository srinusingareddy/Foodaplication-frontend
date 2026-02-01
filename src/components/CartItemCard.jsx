const cartImages = [
  "https://images.unsplash.com/photo-1604909052743-94e838986d24",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
  "https://images.unsplash.com/photo-1550547660-d9450f859349",
  "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",

    "https://images.unsplash.com/photo-1544025162-d76694265947",
  "https://images.unsplash.com/photo-1551218808-94e220e084d2",
  "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445",
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
  "https://images.unsplash.com/photo-1506084868230-bb9d95c24759",

  "https://images.unsplash.com/photo-1521305916504-4a1121188589",
  "https://images.unsplash.com/photo-1551782450-17144efb7c50",
  "https://images.unsplash.com/photo-1505253758473-96b7015fcd40",
  "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9",
  "https://images.unsplash.com/photo-1604908554160-5d2b2a3e8d9b",
];

export default function CartItemCard({
  item,
  onIncrease,
  onDecrease,
  onRemove,
  busy,
}) {
  const food = item.foodItem || {};
  const img = cartImages[(food.id || item.id) % cartImages.length];

  return (
    <div className="cCard">
      <img className="cImg" src={img} alt={food.name || "Food"} />

      <div className="cInfo">
        <div className="cTitle">{food.name || "Item"}</div>
        <div className="cSub">
          ₹{food.price ?? 0} × {item.quantity ?? 0}
        </div>

        <div className="cActions">
          <button
            className="qtyBtn"
            disabled={busy}
            onClick={onDecrease}
            title="Decrease"
          >
            −
          </button>

          <div className="qtyBox">{item.quantity ?? 0}</div>

          <button
            className="qtyBtn"
            disabled={busy}
            onClick={onIncrease}
            title="Increase"
          >
            +
          </button>

          <button className="removeBtn" disabled={busy} onClick={onRemove}>
            Remove
          </button>
        </div>
      </div>

      <div className="cPrice">
        ₹{Number(food.price ?? 0) * Number(item.quantity ?? 0)}
      </div>
    </div>
  );
}
