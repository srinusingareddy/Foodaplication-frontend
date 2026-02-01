// import { useNavigate } from "react-router-dom";

// export default function Layout({ title, children }) {
//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   return (
//     <div className="appBg">
//       <div className="nav">
//         <div className="logo">🍽 FoodApp</div>

//         <div className="navRight">
//           <span className="pageTitle">{title}</span>
//           <button className="btn danger" onClick={logout}>
//             Logout
//           </button>
//         </div>
//       </div>

//       <div className="container">{children}</div>
//     </div>
//   );
// }


export default function Layout({ children }) {
  return (
    <div className="appBg">
      {/* NAVBAR REMOVED COMPLETELY */}

      <div className="container">
        {children}
      </div>
    </div>
  );
}
