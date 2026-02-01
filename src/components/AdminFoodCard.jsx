// const foodImgs = [
//   "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
//   "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
//   "https://images.unsplash.com/photo-1550547660-d9450f859349",
//   "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
// ];
const foodImgs = [
  "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
  "https://images.unsplash.com/photo-1550547660-d9450f859349",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",

  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
  "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
  "https://images.unsplash.com/photo-1525351484163-7529414344d8",
  "https://images.unsplash.com/photo-1529042410759-befb1204b468",
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1",

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


export default function AdminFoodCard({ food, onEdit, onDelete, deleting }) {
  const img = foodImgs[food.id % foodImgs.length];

  return (
    <div className="afCard">
      <img className="afImg" src={img} alt={food.name} />

      <div className="afBody">
        <div className="afTitle">{food.name}</div>
        <div className="afPrice">₹{food.price}</div>

        <div className="afBtns">
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
