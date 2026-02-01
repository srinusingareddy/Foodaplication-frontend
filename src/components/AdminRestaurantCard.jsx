// const adminResImages = [
//   "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
//   "https://images.unsplash.com/photo-1528605248644-14dd04022da1",
//   "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba",
//   "https://images.unsplash.com/photo-1552566626-52f8b828add9",
// ];

const adminResImages = [
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
  "https://images.unsplash.com/photo-1528605248644-14dd04022da1",
  "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba",
  "https://images.unsplash.com/photo-1552566626-52f8b828add9",

  "https://images.unsplash.com/photo-1541544741938-0af808871cc0",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
  "https://images.unsplash.com/photo-1551218808-94e220e084d2",
  "https://images.unsplash.com/photo-1525351484163-7529414344d8",
  "https://images.unsplash.com/photo-1544025162-d76694265947",

  "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de",
  "https://images.unsplash.com/photo-1514516430037-1b9c9a4c2e2f",
  "https://images.unsplash.com/photo-1529042410759-befb1204b468",
  "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445",

  "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
  "https://images.unsplash.com/photo-1521305916504-4a1121188589",
  "https://images.unsplash.com/photo-1506084868230-bb9d95c24759",
  "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9",
  "https://images.unsplash.com/photo-1551782450-17144efb7c50",
];


export default function AdminRestaurantCard({
  restaurant,
  onFoodItems,
  onEdit,
  onDelete,
  deleting,
}) {
  const img = adminResImages[restaurant.id % adminResImages.length];

  return (
    <div className="arCard">
      <img className="arImg" src={img} alt={restaurant.name} />

      <div className="arBody">
        <div className="arTitle">{restaurant.name}</div>
        <div className="arSub">{restaurant.address}</div>

        <div className="arBtns">
          <button className="btn small" onClick={onFoodItems}>
            🍔 Food Items
          </button>

          <button className="btn small" onClick={onEdit}>
            ✏ Edit
          </button>

          <button
            className="btn small danger"
            disabled={deleting}
            onClick={onDelete}
          >
            {deleting ? "Deleting..." : "🗑 Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
