import React, { useState } from 'react';
import { motion } from 'framer-motion';

function PaymentPage() {
  const [paymentMode, setPaymentMode] = useState('');
  const [upiId, setUpiId] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('NOT PAID');

  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handlePayment = () => {
    if (paymentMode === 'UPI' && upiId.trim() === '') {
      alert('Please enter UPI ID');
      return;
    }
    if (
      paymentMode === 'Card' &&
      (!cardNumber || !cardHolder || !expiryDate || !cvv)
    ) {
      alert('Please fill all card details');
      return;
    }
    setPaymentStatus('PAID');
  };

  const handleCancel = () => {
    setPaymentStatus('NOT PAID');
    setPaymentMode('');
    setUpiId('');
    setCardNumber('');
    setCardHolder('');
    setExpiryDate('');
    setCvv('');
  };

  return (
    <motion.div
      className="min-vh-100 d-flex justify-content-center align-items-center py-5 px-3"
      style={{ background: 'linear-gradient(to right, #edf2f7, #e2e8f0)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container-sm">
        <div className="card shadow-lg border rounded-4 p-4">
          <h2 className="text-center fw-bold text-primary mb-4">
            💳 PAYMENT PAGE
          </h2>

          {/* Payment Mode Selection */}
          <fieldset className="mb-4 p-3 border rounded">
            <legend className="fs-6 fw-semibold text-muted">
              Choose your Payment Method:
            </legend>
            <div className="form-check mb-2">
              <input
                type="radio"
                id="upi"
                name="paymentMode"
                value="UPI"
                checked={paymentMode === 'UPI'}
                onChange={(e) => setPaymentMode(e.target.value)}
                className="form-check-input"
              />
              <label htmlFor="upi" className="form-check-label ms-2">
                UPI / Wallet
              </label>
            </div>
            <div className="form-check mb-2">
              <input
                type="radio"
                id="card"
                name="paymentMode"
                value="Card"
                checked={paymentMode === 'Card'}
                onChange={(e) => setPaymentMode(e.target.value)}
                className="form-check-input"
              />
              <label htmlFor="card" className="form-check-label ms-2">
                Credit / Debit Card
              </label>
            </div>
            <div className="form-check mb-2">
              <input
                type="radio"
                id="cod"
                name="paymentMode"
                value="COD"
                checked={paymentMode === 'COD'}
                onChange={(e) => setPaymentMode(e.target.value)}
                className="form-check-input"
              />
              <label htmlFor="cod" className="form-check-label ms-2">
                Cash on Delivery
              </label>
            </div>
          </fieldset>

          {/* UPI Section */}
          {paymentMode === 'UPI' && (
            <div className="mb-3">
              <label htmlFor="upiId" className="form-label fw-semibold">
                Enter UPI ID
              </label>
              <input
                id="upiId"
                type="text"
                className="form-control"
                placeholder="yourupi@bank"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
              />
            </div>
          )}

          {/* Card Section */}
          {paymentMode === 'Card' && (
            <div className="mb-4">
              <div className="mb-3">
                <label className="form-label fw-semibold">Card Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Card Holder Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="John Doe"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                />
              </div>
              <div className="row g-3">
                <div className="col-6">
                  <label className="form-label fw-semibold">Expiry Date</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="MM/YY"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                  />
                </div>
                <div className="col-6">
                  <label className="form-label fw-semibold">CVV</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="***"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Payment Status */}
          <div className="mb-4">
            <label className="form-label fw-semibold">Payment Status</label>
            <div
              className={`text-center px-3 py-2 rounded fw-bold ${
                paymentStatus === 'PAID'
                  ? 'bg-success-subtle text-success'
                  : 'bg-danger-subtle text-danger'
              }`}
            >
              {paymentStatus}
            </div>
          </div>

          {/* Buttons */}
          <div className="d-flex gap-3">
            <button
              className="btn btn-primary w-100 fw-semibold"
              onClick={handlePayment}
            >
              Pay Now
            </button>
            <button
              className="btn btn-outline-secondary w-100 fw-semibold"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default PaymentPage;
