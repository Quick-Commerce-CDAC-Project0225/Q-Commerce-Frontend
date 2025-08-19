import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

function AddStore() {
  const [storeName, setStoreName] = useState('');
  const [area, setArea] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!storeName || !area || status === '') {
      alert('Please fill all fields');
      return;
    }

    const payload = {
      name: storeName,
      area,
      status: parseInt(status)
    };

    try {
      const response = await axios.post('http://52.66.243.195:8080/api/v1/warehouses', payload); // Replace with your actual endpoint
      console.log('Store added:', response.data);
      alert('Store added successfully!');
      setStoreName('');
      setArea('');
      setStatus('');
    } catch (error) {
      console.error('Error adding store:', error);
      alert('Failed to add store');
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
            backdropFilter: 'blur(10px)',
            border: '1px solid #dee2e6'
          }}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-center fw-bold text-primary display-6 mb-4">
            🏬 Add New Store
          </h2>

          <form className="row g-4" onSubmit={handleSubmit}>
            {/* Store Name */}
            <div className="col-md-6">
              <label className="form-label fw-semibold text-secondary">Store Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter store name"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
              />
            </div>

            {/* Area */}
            <div className="col-md-6">
              <label className="form-label fw-semibold text-secondary">Area</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter area (e.g., Phase 1)"
                value={area}
                onChange={(e) => setArea(e.target.value)}
              />
            </div>

            {/* Active Status */}
            <div className="col-md-6">
              <label className="form-label fw-semibold text-secondary">Active Status</label>
              <select
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Select status</option>
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="col-12 text-end mt-3">
              <button
                type="submit"
                className="btn btn-success px-4 py-2 shadow-sm"
              >
                ✅ Save Store
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default AddStore;
