import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ManageAddress() {
  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState(null);

  const confirm = () => {
    if (selectedAddress) {
      navigate('/placeorder', { state: { selectedAddress } });
    } else {
      alert('Please select an address.');
    }
  };

  return (
    <motion.div
      className="min-vh-100 py-5 px-4"
      style={{ background: 'linear-gradient(to right, #f5f5fa, #e3f2fd)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container-lg">
        <motion.div
          className="p-5 rounded-4 shadow-lg border"
          style={{
            backgroundColor: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(8px)',
            border: '1px solid #dee2e6'
          }}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-center fw-bold text-primary display-6 mb-4">
            📍 Manage Addresses
          </h2>

          <div className="table-responsive rounded mb-4">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-primary">
                <tr>
                  <th>Select</th>
                  <th>Type</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { type: 'Home', address: '123, Gomti Nagar, Lucknow' },
                  { type: 'Work', address: 'IT Tower, Vibhuti Khand, Lucknow' },
                  { type: 'Other', address: 'Friends Colony, Indira Nagar' }
                ].map((item, index) => (
                  <tr key={index}>
                    <td>
                      <div className="form-check d-flex justify-content-center">
                        <input
                          type="radio"
                          name="address"
                          className="form-check-input"
                          onChange={() => setSelectedAddress(item)}
                          style={{ cursor: 'pointer' }}
                        />
                      </div>
                    </td>
                    <td className="fw-semibold text-secondary">{item.type}</td>
                    <td>{item.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-between">
            <button
              className="btn btn-success px-4 shadow-sm"
              onClick={() => navigate('/addnewaddress')}
            >
              ➕ Add New Address
            </button>
            <button
              className="btn btn-primary px-4 shadow-sm"
              onClick={confirm}
            >
              ✅ Confirm & Use Address
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
