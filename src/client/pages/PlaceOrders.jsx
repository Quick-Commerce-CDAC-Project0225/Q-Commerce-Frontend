

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useCart } from '../context/CartContext'; // <-- ✅ Import your context

function PlaceOrder() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedAddress = location.state?.selectedAddress;

  const { items: cartItems, clearCart } = useCart(); // ✅ Use items directly from context

  const [loading, setLoading] = React.useState(false);

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  };

  const placeOrder = async () => {
    const address = selectedAddress?.address || 'Default Address';
    const products = cartItems.map(item => ({
      productId: item.product.id,
      quantity: item.quantity,
    }));

    const orderData = {
      address,
      type: 'quick',
      products,
    };

    try {
      setLoading(true);
      const response = await axios.post(
        'http://localhost:8080/api/v1/orders',
        orderData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      console.log('Order placed:', response.data);
      alert('Order placed successfully!');
      clearCart(); // ✅ Clear cart from context (which also clears localStorage)
      navigate('/');
    } catch (error) {
      console.error('Order failed:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
          <button
            onClick={() => navigate('/cart')}
            className="btn btn-link text-decoration-none text-primary mb-4"
          >
            ← Back
          </button>

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
                onClick={() => navigate('/location')}
              >
                Change →
              </button>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <h6 className="fw-bold text-muted mb-3">🛒 Items Summary:</h6>
              <ul className="list-group list-group-flush mb-3">
                {cartItems.map((item, index) => (
                  <li key={index} className="list-group-item">
                    {item.product.name} (x{item.quantity}) – ₹{item.product.price * item.quantity}
                  </li>
                ))}
              </ul>
              <button
                className="btn btn-link text-primary p-0"
                onClick={() => navigate('/cart')}
              >
                ✏️ Edit Cart
              </button>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <h6 className="fw-bold text-muted mb-3">💳 Payment Method:</h6>
              <div className="form-check mb-2">
                <input className="form-check-input" type="radio" name="payment" id="upi" defaultChecked />
                <label className="form-check-label" htmlFor="upi">UPI/Wallet (Recommended)</label>
              </div>
              <div className="form-check mb-2">
                <input className="form-check-input" type="radio" name="payment" id="card" />
                <label className="form-check-label" htmlFor="card">Credit / Debit Card</label>
              </div>
              <div className="form-check mb-2">
                <input className="form-check-input" type="radio" name="payment" id="cod" />
                <label className="form-check-label" htmlFor="cod">Cash on Delivery</label>
              </div>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <h6 className="fw-bold text-muted mb-3">📄 Price Details:</h6>
              <div className="d-flex justify-content-between mb-2 text-secondary">
                <span>Item Total</span>
                <span>₹{getTotalPrice()}</span>
              </div>
              <div className="d-flex justify-content-between mb-2 text-secondary">
                <span>Delivery Charges</span>
                <span>₹0</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold text-dark">
                <span>Grand Total</span>
                <span>₹{getTotalPrice()}</span>
              </div>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-body d-flex justify-content-between align-items-center">
              <span className="text-muted">📦 Estimated Delivery:</span>
              <span className="text-primary fw-semibold">🚀 15–20 mins</span>
            </div>
          </div>

          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="btn btn-primary w-100 py-3 fs-5 fw-semibold"
              onClick={placeOrder}
              disabled={loading}
            >
              {loading ? 'Placing Order...' : 'PLACE ORDER'}
            </button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default PlaceOrder;

