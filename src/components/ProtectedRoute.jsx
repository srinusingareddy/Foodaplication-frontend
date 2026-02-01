// import { Navigate } from "react-router-dom";

// function ProtectedRoute({ children, role }) {
//   const token = localStorage.getItem("token");
//   const userRole = localStorage.getItem("role");

//   if (!token) return <Navigate to="/login" />;
//   if (role && role !== userRole) return <Navigate to="/login" />;

//   return children;
// }

// export default ProtectedRoute;


import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const location = useLocation();

  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); 
  // expected values: ADMIN or USER

  // ❌ Not logged in
  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // ❌ Logged in but wrong role
  if (role && userRole !== role) {
    // optional: redirect ADMIN to admin dashboard, USER to user dashboard
    if (userRole === "ADMIN") {
      return <Navigate to="/admin" replace />;
    }
    if (userRole === "USER") {
      return <Navigate to="/user" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  // ✅ Authorized
  return children;
}

export default ProtectedRoute;
