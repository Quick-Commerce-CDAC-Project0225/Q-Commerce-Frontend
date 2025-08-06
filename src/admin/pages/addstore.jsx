import React from 'react';
import { motion } from 'framer-motion';

function AddStore() {
  return (
    <motion.div
      className="min-vh-100 py-5 px-4"
      style={{
        background: 'linear-gradient(to right, #f5f5fa, #e3f2fd)'
      }}
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

          <form className="row g-4">
            {/* Store ID */}
            <div className="col-md-6">
              <label className="form-label fw-semibold text-secondary">Store ID</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter store ID"
              />
            </div>

            {/* Store Name */}
            <div className="col-md-6">
              <label className="form-label fw-semibold text-secondary">Store Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter store name"
              />
            </div>

            {/* Area */}
            <div className="col-md-6">
              <label className="form-label fw-semibold text-secondary">Area</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter area (e.g., Phase 1)"
              />
            </div>

            {/* Active Status */}
            <div className="col-md-6">
              <label className="form-label fw-semibold text-secondary">Active Status</label>
              <select className="form-select">
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
