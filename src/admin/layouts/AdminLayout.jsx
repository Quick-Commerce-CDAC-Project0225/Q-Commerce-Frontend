import { Outlet, Link } from 'react-router-dom';

function AdminLayout() {
  return (
    <div>
      <nav>
        <Link to="dashboard">Dashboard</Link> | 
        <Link to="manage-inventory">Inventory</Link>
        {/* other nav links */}
      </nav>

      <main>
        {/* This is where nested routes render */}
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;