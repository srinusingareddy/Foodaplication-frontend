const images = [
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
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
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
  "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba",
  "https://images.unsplash.com/photo-1552566626-52f8b828add9",

  "https://images.unsplash.com/photo-1551024601-bec78aea704b",
  "https://images.unsplash.com/photo-1490818387583-1baba5e638af",
  "https://images.unsplash.com/photo-1482049016688-2d3e1b311543",
  "https://images.unsplash.com/photo-1525351484163-7529414344d8",
];

export default function RestaurantCard({ restaurant, onClick }) {
  const image = images[restaurant.id % images.length];

  return (
    <div className="rCard" onClick={onClick}>
      <img src={image} alt={restaurant.name} className="rImg" />
      <div className="rBody">
        <h3>{restaurant.name}</h3>
        <p>{restaurant.address}</p>
        <button className="btn full">View Menu →</button>
      </div>
    </div>
  );
}
