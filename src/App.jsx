import {
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation
} from 'react-router-dom';

import { useAuth } from './client/context/AuthContext';

// ... imports for Navbar, pages, etc.
import ProductListPage from './client/pages/ProductListPage';
import CartPage from './client/pages/CartPage';
import LoginPage from './client/pages/Login';
import SelectLocationPage from './client/pages/SelectLocationPage';
import DefineAreaPage from './client/pages/DefineAreaPage';
import PlaceOrder from './client/pages/PlaceOrders';
import OrderHistoryPage from './client/pages/OrderHistory';
import SignupPage from './client/pages/Signup';
import AdminDashboard from './admin/pages/AdminDashboard';
import ManageInventory from './admin/pages/ManageInventory';
import ManageArea from './admin/pages/ManageArea';
import ManageCategory from './admin/pages/ManageCategory';
import ManageCustomer from './admin/pages/ManageCustomer';
import ManageOrder from './admin/pages/ManageOrder';
import ManageDarkStore from './admin/pages/managestore';
import AddStore from './admin/pages/addstore';
import AdminNavbar from './admin/components/AdminNavbar';
import Navbar from './client/components/Navbar';
import ManageProduct from './admin/pages/ManageProduct';

// inline guards
function RequireAuth({ children }) {
  const { user } = useAuth();
  const location = useLocation();
  if (user === null) return null; // loader if you want
  if (user === false) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}

function RequireRole({ allowed = [], children }) {
  const { user } = useAuth();
  const location = useLocation();
  if (user === null) return null;
  if (user === false) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  if (!allowed.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  
  return children;
}

// layouts
const ClientLayout = () => (
  <>
    <Navbar />
    <main>
      <Outlet />
    </main>
  </>
);

const AdminLayout = () => (
  <>
    <AdminNavbar />
    <main>
      <Outlet />
    </main>
  </>
);

const HomePage = () => <ProductListPage />;

export default function App() {
  return (
    <Routes>
      {/* client routes */}
      <Route element={<ClientLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/products/:category" element={<ProductListPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
      path="/location"
      element={
        <RequireAuth>
          <SelectLocationPage />
        </RequireAuth>
      }
    />

        {/* protected */}
        <Route
          path="/place-order"
          element={
            <RequireAuth>
              <PlaceOrder />
            </RequireAuth>
          }
        />
        <Route
          path="/history"
          element={
            <RequireAuth>
              <OrderHistoryPage />
            </RequireAuth>
          }
        />
      </Route>

      {/* admin routes */}
      <Route
        path="/admin/*"
        element={
          <RequireRole allowed={['ROLE_ADMIN']}>
            <AdminLayout />
          </RequireRole>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="manage-inventory" element={<ManageInventory />} />
        <Route path="manage-area" element={<ManageArea />} />
        <Route path="manage-category" element={<ManageCategory />} />
        <Route path="manage-customer" element={<ManageCustomer />} />
        <Route path="manage-order" element={<ManageOrder />} />
        <Route path="manage-store" element={<ManageDarkStore />} />
        <Route path="add-store" element={<AddStore />} />
        <Route path="manage-product" element={<ManageProduct />} />
        <Route path="add-area" element={<DefineAreaPage />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<h1>404: Page Not Found</h1>} />
    </Routes>
  );
}
