
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
