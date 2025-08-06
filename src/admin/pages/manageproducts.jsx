import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEdit, FaPlusCircle, FaTrashAlt } from 'react-icons/fa';

function ManageProducts() {
  const navigate = useNavigate();

  const handleAddProduct = () => {
    navigate('/addproducts');
  };

  const handleEdit = (id) => {
   navigate('/updateproduct', { state: { id: '101' } });

  };

  const handleDelete = (id) => {
    alert(`Product ${id} deleted (frontend only)`);
  };

  const defaultProduct = {
    id: '101',
    name: 'Wireless Headphones',
    price: '₹1499',
    category: 'Electronics'
  };

  return (
    <motion.div
      className="container-fluid min-vh-100 py-5"
      style={{
        background: 'linear-gradient(to right, #f0f4f8, #e0eaf0)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center mb-5 px-3">
        <h1 className="display-5 fw-bold text-dark">🛒 Product Manager</h1>
        <p className="text-muted">Manage your inventory and add new products easily</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddProduct}
          className="btn btn-success mt-3 d-flex align-items-center gap-2"
        >
          <FaPlusCircle />
          Add New Product
        </motion.button>
      </div>

      <div className="row justify-content-center px-3">
        <div className="col-md-12 col-lg-10">
          <motion.div
            className="card shadow-sm"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{
              background: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(200, 200, 200, 0.3)',
            }}
          >
            <div className="card-header bg-success text-white fw-semibold">
              Product List
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover table-striped table-bordered mb-0">
                  <thead className="table-success">
                    <tr>
                      <th style={{ minWidth: '100px' }}>Product ID</th>
                      <th style={{ minWidth: '150px' }}>Name</th>
                      <th style={{ minWidth: '100px' }}>Price</th>
                      <th style={{ minWidth: '150px' }}>Category</th>
                      <th style={{ minWidth: '160px' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <motion.tr
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                    >
                      <td>{defaultProduct.id}</td>
                      <td>{defaultProduct.name}</td>
                      <td>{defaultProduct.price}</td>
                      <td>{defaultProduct.category}</td>
                      <td>
                        <div className="d-flex gap-2 justify-content-center">
                          <button
                            className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1"
                            onClick={() => handleEdit(defaultProduct.id)}
                          >
                            <FaEdit />
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1"
                            onClick={() => handleDelete(defaultProduct.id)}
                          >
                            <FaTrashAlt />
                            Delete
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="card-footer text-muted text-end">
              Total Products: 1
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default ManageProducts;
