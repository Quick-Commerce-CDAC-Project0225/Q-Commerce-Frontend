import React from 'react';
import { motion } from 'framer-motion';

function AddProducts() {
  return (
    <motion.div
      className="min-vh-100 py-5 px-3"
      style={{
        background: 'linear-gradient(to right, #e3f2fd, #ede7f6)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="p-5 shadow rounded-4"
          style={{
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(6px)',
            border: '1px solid rgba(200, 200, 200, 0.2)',
          }}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-center fw-bold fs-2 text-primary mb-4">
            🛒 Add Product
          </h1>

          <form className="row g-4">
            {/* Product Name */}
            <div className="col-md-6">
              <label className="form-label fw-semibold text-dark">Product Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter product name"
              />
            </div>

            {/* Description */}
            <div className="col-md-6">
              <label className="form-label fw-semibold text-dark">Description</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter description"
              />
            </div>

            {/* Price */}
            <div className="col-md-6">
              <label className="form-label fw-semibold text-dark">Price</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter price"
              />
            </div>

            {/* Category */}
            <div className="col-md-6">
              <label className="form-label fw-semibold text-dark">Category</label>
              <select className="form-select">
                <option value="">Select category</option>
                <option>Electronics</option>
                <option>Clothing</option>
                <option>Home Decor</option>
                <option>Other</option>
              </select>
            </div>

            {/* Image Upload */}
            <div className="col-md-12">
              <label className="form-label fw-semibold text-dark">Product Image</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
              />
            </div>

            {/* Submit Button */}
            <div className="col-12 text-end">
              <motion.button
                type="submit"
                className="btn btn-success px-4 py-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ✅ Save Product
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default AddProducts;
