
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,   // ← add this
  Outlet       // ← add this if you use nested routes
} from 'react-router-dom';import { CartProvider } from './client/context/CartContext'; // Import the provider
import Navbar from './client/components/Navbar'
import ProductListPage from './client/pages/ProductListPage';
import CartPage from './client/pages/CartPage';
import LoginPage from './client/pages/Login';
import SignupPage from './client/pages/Signup';
import OrderHistoryPage from './client/pages/OrderHistory';
import SelectLocationPage from './client/pages/SelectLocationPage';
import DefineAreaPage from './client/pages/DefineAreaPage';

// Admin imports
import AdminNavbar      from './admin/components/AdminNavbar'
import AdminDashboard   from './admin/pages/AdminDashboard'
import ManageInventory  from './admin/pages/ManageInventory'
import ManageArea       from './admin/pages/ManageArea'
import ManageCategory   from './admin/pages/ManageCategory'
// import ManageProduct    from './admin/pages/ManageProduct'
import ManageCustomer   from './admin/pages/ManageCustomer'
import ManageOrder      from './admin/pages/ManageOrder'
import ManageDarkStore from './admin/pages/managestore';
import PlaceOrder from './client/pages/PlaceOrders';


// Layout that wraps all Admin routes
const AdminLayout = () => (
  <>
    <AdminNavbar />
    <main>
      <Outlet />
    </main>
  </>
)


const HomePage = () => <ProductListPage />;

function App() {
  return (
    <CartProvider>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/products/:category" element={<ProductListPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/history" element={<OrderHistoryPage />} />
           <Route path="/location" element={<SelectLocationPage />} />
           <Route path="/location-map" element={<DefineAreaPage />} />
           <Route path="place-order" element={<PlaceOrder />} />

 {/* Admin routes */}
            <Route path="/admin/*" element={<AdminLayout />}>
              {/* Redirect /admin → /admin/dashboard */}
              <Route index                   element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard"        element={<AdminDashboard />} />
              <Route path="manage-inventory" element={<ManageInventory />} />
              <Route path="manage-area"      element={<ManageArea />} />
              <Route path="manage-category"  element={<ManageCategory />} />
              {/* <Route path="manage-product"   element={<ManageProduct />} /> */}
              <Route path="manage-customer"  element={<ManageCustomer />} />
              <Route path="manage-order"     element={<ManageOrder />} />
              <Route path="manage-store"     element={<ManageDarkStore />} />
              
            </Route>

            {/* Fallback for unknown routes */}
            <Route path="*" element={<h1>404: Page Not Found</h1>} />

          

        </Routes>
      </main>
    </CartProvider>
  );
}

export default App;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
// import { CartProvider } from './client/context/CartContext'; // Import the provider

// // Import Components & Layouts
// import Navbar from './client/components/Navbar';

// // Import Pages
// import ProductListPage from './client/pages/ProductListPage';
// import CartPage from './client/pages/CartPage';
// import LoginPage from './client/pages/Login';
// import SignupPage from './client/pages/Signup';
// import OrderHistoryPage from './client/pages/OrderHistory';
// import SelectLocationPage from './client/pages/SelectLocationPage';
// import DefineAreaPage from './client/pages/DefineAreaPage';

// // --- Layout Components ---

// // This layout includes the Navbar and is used for all customer-facing pages.
// const CustomerLayout = () => {
//   return (
//     <>
//       <Navbar />
//       <main>
//         {/* The Outlet component renders the matched child route component */}
//         <Outlet />
//       </main>
//     </>
//   );
// };

// // This layout is for full-screen pages (like maps) that should NOT have a navbar.
// const MapLayout = () => {
//   return (
//     <main>
//       <Outlet />
//     </main>
//   );
// };


// // --- Main App Component ---

// const HomePage = () => <ProductListPage />;

// function App() {
//   return (
//     <CartProvider>
//       {/* The <Router> component has been removed from this file. 
//           It should wrap <App /> in your main.jsx or index.js file. */}
//       <Routes>
//         {/* Group 1: Routes WITH the main navbar */}
//         <Route element={<CustomerLayout />}>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/products/:category" element={<ProductListPage />} />
//           <Route path="/cart" element={<CartPage />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/signup" element={<SignupPage />} />
//           <Route path="/orders" element={<OrderHistoryPage />} />
//         </Route>

//         {/* Group 2: Routes WITHOUT the main navbar (for full-screen maps) */}
//         <Route element={<MapLayout />}>
//           <Route path="/location" element={<SelectLocationPage />} />
//           <Route path="/define-area" element={<DefineAreaPage />} />
//         </Route>
        
//       </Routes>
//     </CartProvider>
//   );
// }

// export default App;
