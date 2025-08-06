import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

function PlaceOrder() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedAddress = location.state?.selectedAddress;

  console.log('Selected address:', selectedAddress);

  return (
    <motion.div
      className="min-vh-100 py-5 px-4"
      style={{ background: 'linear-gradient(to right, #fdfbfb, #ebedee)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container-lg">
        <motion.div
          className="bg-white shadow-lg rounded-4 p-5"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {/* 🔙 Back */}
          <button
            onClick={() => navigate(-1)}
            className="btn btn-link text-decoration-none text-primary mb-4"
          >
            ← Back
          </button>

          {/* 📍 Address Section */}
          <div className="card mb-4 border-primary">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h6 className="fw-bold text-muted mb-1">📍 Deliver to:</h6>
                <p className="mb-0 text-secondary">
                  {selectedAddress ? (
                    `${selectedAddress.type} – ${selectedAddress.address}`
                  ) : (
                    <span className="text-danger">No address selected</span>
                  )}
                </p>
              </div>
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => navigate('/manageaddress')}
              >
                Change →
              </button>
            </div>
          </div>

          {/* 🛒 Items Summary */}
          <div className="card mb-4">
            <div className="card-body">
              <h6 className="fw-bold text-muted mb-3">🛒 Items Summary:</h6>
              <ul className="list-group list-group-flush mb-3">
                <li className="list-group-item">Product 1 (x2) – ₹XX</li>
                <li className="list-group-item">Product 2 (x1) – ₹XX</li>
                <li className="list-group-item">Product 3 (x3) – ₹XX</li>
              </ul>
              <button className="btn btn-link text-primary p-0">
                ✏️ Edit Cart
              </button>
            </div>
          </div>

          {/* 💳 Payment Method */}
          <div className="card mb-4">
            <div className="card-body">
              <h6 className="fw-bold text-muted mb-3">💳 Payment Method:</h6>
              <div className="form-check mb-2">
                <input className="form-check-input" type="radio" name="payment" id="upi" />
                <label className="form-check-label" htmlFor="upi">
                  UPI/Wallet (Recommended)
                </label>
              </div>
              <div className="form-check mb-2">
                <input className="form-check-input" type="radio" name="payment" id="card" />
                <label className="form-check-label" htmlFor="card">
                  Credit / Debit Card
                </label>
              </div>
              <div className="form-check mb-2">
                <input className="form-check-input" type="radio" name="payment" id="cod" />
                <label className="form-check-label" htmlFor="cod">
                  Cash on Delivery
                </label>
              </div>
              <button className="btn btn-link text-primary p-0 mt-2">
                ➕ Add Payment Method
              </button>
            </div>
          </div>

          {/* 📄 Price Details */}
          <div className="card mb-4">
            <div className="card-body">
              <h6 className="fw-bold text-muted mb-3">📄 Price Details:</h6>
              <div className="d-flex justify-content-between mb-2 text-secondary">
                <span>Item Total</span>
                <span>₹XX</span>
              </div>
              <div className="d-flex justify-content-between mb-2 text-secondary">
                <span>Delivery Charges</span>
                <span>₹XX</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold text-dark">
                <span>Grand Total</span>
                <span>₹XX</span>
              </div>
            </div>
          </div>

          {/* 🚀 Delivery ETA */}
          <div className="card mb-4">
            <div className="card-body d-flex justify-content-between align-items-center">
              <span className="text-muted">📦 Estimated Delivery:</span>
              <span className="text-primary fw-semibold">🚀 15–20 mins</span>
            </div>
          </div>

          {/* 🟦 PLACE ORDER */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="btn btn-primary w-100 py-3 fs-5 fw-semibold"
              onClick={() => navigate('/paymentpage')}
            >
              PLACE ORDER
            </button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default PlaceOrder;
