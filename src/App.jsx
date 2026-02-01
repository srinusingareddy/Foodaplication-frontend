import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProtectedRoute from "./components/ProtectedRoute";

// ================= ADMIN PAGES =================
import AdminDashboard from "./pages/admin/AdminDashboard";
import RestaurantList from "./pages/admin/RestaurantList";
import AddRestaurant from "./pages/admin/AddRestaurant";
import EditRestaurant from "./pages/admin/EditRestaurant";
import FoodItemList from "./pages/admin/FoodItemList";
import AddFoodItem from "./pages/admin/AddFoodItem";
import EditFoodItem from "./pages/admin/EditFoodItem";
import AdminOrders from "./pages/admin/AdminOrders";

// ================= USER PAGES =================
import UserDashboard from "./pages/user/UserDashboard";
import UserFoodItemList from "./pages/user/UserFoodItemList";
import Cart from "./pages/user/Cart";
import MyOrders from "./pages/user/MyOrders";

export default function App() {
  return (
    <Routes>
      {/* DEFAULT */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ================= ADMIN ROUTES ================= */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="ADMIN">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/restaurants"
        element={
          <ProtectedRoute role="ADMIN">
            <RestaurantList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/add-restaurant"
        element={
          <ProtectedRoute role="ADMIN">
            <AddRestaurant />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/edit-restaurant/:id"
        element={
          <ProtectedRoute role="ADMIN">
            <EditRestaurant />
          </ProtectedRoute>
        }
      />

      {/* Food Items by Restaurant */}
      <Route
        path="/admin/restaurants/:restaurantId/food-items"
        element={
          <ProtectedRoute role="ADMIN">
            <FoodItemList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/restaurants/:restaurantId/add-food"
        element={
          <ProtectedRoute role="ADMIN">
            <AddFoodItem />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/edit-food/:id"
        element={
          <ProtectedRoute role="ADMIN">
            <EditFoodItem />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/orders"
        element={
          <ProtectedRoute role="ADMIN">
            <AdminOrders />
          </ProtectedRoute>
        }
      />

      {/* ================= USER ROUTES ================= */}
      <Route
        path="/user"
        element={
          <ProtectedRoute role="USER">
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user/restaurants/:restaurantId"
        element={
          <ProtectedRoute role="USER">
            <UserFoodItemList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user/cart"
        element={
          <ProtectedRoute role="USER">
            <Cart />
          </ProtectedRoute>
        }
      />

      <Route
  path="/admin/restaurants/add"
  element={
    <ProtectedRoute role="ADMIN">
      <AddRestaurant />
    </ProtectedRoute>
  }
/>


      <Route
        path="/user/orders"
        element={
          <ProtectedRoute role="USER">
            <MyOrders />
          </ProtectedRoute>
        }
      />

      {/* NOT FOUND */}
      <Route path="*" element={<h2>Page Not Found</h2>} />
    </Routes>
  );
}
