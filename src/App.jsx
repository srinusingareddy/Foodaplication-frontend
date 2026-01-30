import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/auth/Login";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AddRestaurant from "./pages/admin/AddRestaurant";
import RestaurantList from "./pages/admin/RestaurantList";
import EditRestaurant from "./pages/admin/EditRestaurant";
import AdminOrders from "./pages/admin/AdminOrders";


import AddFoodItem from "./pages/admin/AddFoodItem";
import FoodItemList from "./pages/admin/FoodItemList";
import EditFoodItem from "./pages/admin/EditFoodItem";

import UserDashboard from "./pages/user/UserDashboard";
import UserFoodItemList from "./pages/user/UserFoodItemList";
import Cart from "./pages/user/Cart";
import MyOrders from "./pages/user/MyOrders";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* DEFAULT */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* LOGIN */}
      <Route path="/login" element={<Login />} />

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
        path="/admin/add-restaurant"
        element={
          <ProtectedRoute role="ADMIN">
            <AddRestaurant />
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
        path="/admin/edit-restaurant/:id"
        element={
          <ProtectedRoute role="ADMIN">
            <EditRestaurant />
          </ProtectedRoute>
        }
      />

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
  path="/admin/orders"
  element={
    <ProtectedRoute role="ADMIN">
      <AdminOrders />
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

export default App;
