import React from 'react';
import { FaHome, FaBuilding, FaEllipsisH, FaPlus, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Reusable card component
const AddressCard = ({ icon, label }) => (
  <div className="card shadow-sm rounded-4 mb-4 border">
    <div className="card-body">
      <div className="d-flex align-items-center gap-3 mb-3">
        <span className="fs-4">{icon}</span>
        <h5 className="fw-semibold text-dark mb-0">{label} Address</h5>
      </div>
      <input
        type="text"
        placeholder={`Enter ${label} address`}
        className="form-control"
      />
    </div>
  </div>
);

export default function AddressPage() {
  const navigate = useNavigate();

  return (
    <motion.div
      className="min-vh-100 py-5 px-4"
      style={{ background: 'linear-gradient(to right, #f8f9fa, #e3f2fd)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container-lg">
        <motion.div
          className="bg-white rounded-4 shadow-lg p-5 border"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {/* Header */}
          <div className="d-flex align-items-center justify-content-between mb-4">
            <button
              className="btn btn-outline-secondary"
              onClick={() => navigate('/manageaddress')}
            >
              <FaArrowLeft className="me-2" />
              Go Back
            </button>
            <h2 className="fw-bold text-primary mb-0 fs-4">➕ Add New Address</h2>
          </div>

          {/* Address Cards */}
          <div className="row">
            <div className="col-12 mb-3">
              <AddressCard icon={<FaHome className="text-primary" />} label="Home" />
            </div>
            <div className="col-12 mb-3">
              <AddressCard icon={<FaBuilding className="text-success" />} label="Work" />
            </div>
            <div className="col-12 mb-3">
              <AddressCard icon={<FaEllipsisH className="text-secondary" />} label="Other" />
            </div>
          </div>

          {/* Submit Button */}
          <div className="d-flex justify-content-center pt-4 border-top mt-4">
            <button className="btn btn-primary d-flex align-items-center gap-2 px-4 py-2">
              <FaPlus />
              Add Address
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
