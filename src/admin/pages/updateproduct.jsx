import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

function UpdateProductPage() {
  const location = useLocation();
  const productId = location.state?.id || '';

  const [productData, setProductData] = useState(null);

  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (productId) {
      // Simulate fetching product data by ID
      const mockData = {
        '101': {
          name: 'Wireless Headphones',
          desc: 'High-quality sound with noise cancellation.',
          price: '1499',
          category: 'Electronics'
        },
        '102': {
          name: 'Cotton T-Shirt',
          desc: 'Soft and breathable fabric.',
          price: '499',
          category: 'Clothing'
        }
        // Add more mock entries if needed
      };

      const data = mockData[productId] || {
        name: '',
        desc: '',
        price: '',
        category: ''
      };

      setProductData(data);
      setName(data.name);
      setDesc(data.desc);
      setPrice(data.price);
      setCategory(data.category);
    }
  }, [productId]);

  const saveChanges = () => {
    console.log('Updated Product:', {
      id: productId,
      name,
      desc,
      price,
      category
    });

    alert('Product updated successfully (frontend only)');
  };

  return (
    <motion.div
      className="min-vh-100 py-5 px-4"
      style={{ background: 'linear-gradient(to right, #f8f9fa, #e3f2fd)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container-sm">
        <div className="card shadow-lg rounded-4 p-4">
          <h2 className="text-center fw-bold text-primary mb-4">🛠️ Update Product</h2>

          {/* Locked Product ID */}
          <div className="mb-4">
            <label className="form-label fw-semibold">Product ID</label>
            <input
              type="text"
              className="form-control"
              value={productId}
              disabled
            />
          </div>

          {/* Product Form */}
          {productData && (
            <div className="mt-4">
              <div className="mb-3">
                <label className="form-label fw-semibold">Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Description</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                ></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Price</label>
                <input
                  type="text"
                  className="form-control"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Category</label>
                <select
                  className="form-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Home Decor">Home Decor</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="text-end">
                <button className="btn btn-success px-4" onClick={saveChanges}>
                  ✅ Save Changes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default UpdateProductPage;
