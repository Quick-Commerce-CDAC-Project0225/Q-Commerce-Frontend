import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Reusable StoreRow component with toggle
function StoreRow({ id, name, area, initialStatus }) {
  const [isActive, setIsActive] = useState(initialStatus === 1);

  const toggleStatus = () => {
    setIsActive(prev => !prev);
    console.log(`Store ${id} status changed to: ${!isActive ? 1 : 0}`);
  };

  return (
    <tr className="table-row">
      <td>{id}</td>
      <td>{name}</td>
      <td>{area}</td>
      <td>
        <div className="form-check form-switch d-flex justify-content-center">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            checked={isActive}
            onChange={toggleStatus}
            style={{
              cursor: 'pointer',
              borderColor: isActive ? '#198754' : '#dc3545',
              boxShadow: '0 0 3px rgba(0,0,0,0.2)'
            }}
          />
        </div>
      </td>
    </tr>
  );
}

function ManageDarkStore() {
  const navigate = useNavigate();

  const storeList = [
    { id: 1, name: 'ABC', area: 'Phase 1', status: 1 },
    { id: 2, name: 'XYZ', area: 'Phase 2', status: 0 }
  ];

  return (
    <motion.div
      className="min-vh-100 py-5 px-4"
      style={{
        background: 'linear-gradient(to right, #f5f5fa, #e3f2fd)'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container-lg">
        <motion.div
          className="p-5 rounded-4 shadow-lg border"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.96)',
            backdropFilter: 'blur(10px)',
            border: '1px solid #dee2e6'
          }}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <button className="btn btn-outline-secondary">
              ← Back
            </button>
            <h1 className="fw-bold text-primary display-6 m-0">
              🏬 Manage Dark Stores
            </h1>
            <button
              className="btn btn-success px-4 py-2 shadow-sm"
              onClick={() => navigate('/addstore')}
            >
              ＋ Add Store
            </button>
          </div>

          {/* Table */}
          <div className="table-responsive rounded">
            <table className="table table-bordered table-hover align-middle text-center">
              <thead className="table-primary">
                <tr>
                  <th>ID</th>
                  <th>Store Name</th>
                  <th>Area</th>
                  <th>Active Status</th>
                </tr>
              </thead>
              <tbody>
                {storeList.map(store => (
                  <StoreRow
                    key={store.id}
                    id={store.id}
                    name={store.name}
                    area={store.area}
                    initialStatus={store.status}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default ManageDarkStore;
