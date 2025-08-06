// src/pages/ManageProduct.jsx
import React, { useState, useEffect } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";

const DEFAULT_PRODUCTS = [
  { id: 1,  name: "Apple",          store: "Dark Store 1", category: "Groceries",         quantity: 100 },
  { id: 2,  name: "Pepsi",          store: "Dark Store 2", category: "Beverages",         quantity: 50  },
  { id: 3,  name: "Bread",          store: "Dark Store 1", category: "Bakery",            quantity: 80  },
  { id: 4,  name: "Milk",           store: "Dark Store 3", category: "Dairy",             quantity: 60  },
  { id: 5,  name: "Cheese",         store: "Dark Store 2", category: "Dairy",             quantity: 40  },
  { id: 6,  name: "Butter",         store: "Dark Store 1", category: "Dairy",             quantity: 30  },
  { id: 7,  name: "Eggs",           store: "Dark Store 3", category: "Dairy",             quantity: 120 },
  { id: 8,  name: "Rice",           store: "Dark Store 2", category: "Groceries",         quantity: 150 },
  { id: 9,  name: "Wheat Flour",    store: "Dark Store 1", category: "Groceries",         quantity: 200 },
  { id: 10, name: "Salt",           store: "Dark Store 3", category: "Groceries",         quantity: 90  },
  { id: 11, name: "Sugar",          store: "Dark Store 2", category: "Groceries",         quantity: 110 },
  { id: 12, name: "Tomatoes",       store: "Dark Store 1", category: "Produce",           quantity: 140 },
  { id: 13, name: "Potatoes",       store: "Dark Store 3", category: "Produce",           quantity: 170 },
  { id: 14, name: "Onions",         store: "Dark Store 2", category: "Produce",           quantity: 130 },
  { id: 15, name: "Peanut Butter",  store: "Dark Store 1", category: "Spreads",           quantity: 70  }
];

export default function ManageProduct() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    store: "",
    category: "",
    quantity: ""
  });
  const [editProduct, setEditProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Load from localStorage or defaults
  useEffect(() => {
    const stored = localStorage.getItem("productData");
    if (stored) {
      setProducts(JSON.parse(stored));
    } else {
      setProducts(DEFAULT_PRODUCTS);
      localStorage.setItem("productData", JSON.stringify(DEFAULT_PRODUCTS));
    }
  }, []);

  // Persist changes
  useEffect(() => {
    localStorage.setItem("productData", JSON.stringify(products));
  }, [products]);

  const handleAdd = () => {
    const { name, store, category, quantity } = newProduct;
    if (!name || !store || !category || !quantity) return;
    const exists = products.some(
      p => p.name.toLowerCase() === name.toLowerCase() && p.store === store
    );
    if (exists) {
      alert("Product already exists in this store.");
      return;
    }
    const newEntry = { ...newProduct, id: Date.now(), quantity: parseInt(quantity) };
    setProducts(prev => [...prev, newEntry]);
    setNewProduct({ name: "", store: "", category: "", quantity: "" });
  };

  const handleEdit = (product) => {
    setEditProduct({ ...product });
    setShowModal(true);
  };

  const handleSave = () => {
    setProducts(prev =>
      prev.map(p => (p.id === editProduct.id ? editProduct : p))
    );
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this product?")) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const resetToDefault = () => {
    setProducts(DEFAULT_PRODUCTS);
    localStorage.setItem("productData", JSON.stringify(DEFAULT_PRODUCTS));
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Manage Products</h2>

      {/* Add Product Form */}
      <Form className="row g-3 mb-4">
        <Form.Group className="col-md-3">
          <Form.Control
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="col-md-3">
          <Form.Control
            type="text"
            placeholder="Store Name"
            value={newProduct.store}
            onChange={e => setNewProduct({ ...newProduct, store: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="col-md-3">
          <Form.Control
            type="text"
            placeholder="Category"
            value={newProduct.category}
            onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="col-md-3">
          <Form.Control
            type="number"
            placeholder="Quantity"
            value={newProduct.quantity}
            onChange={e => setNewProduct({ ...newProduct, quantity: e.target.value })}
          />
        </Form.Group>
        <div className="col-12">
          <Button variant="success" onClick={handleAdd}>
            Add Product
          </Button>
        </div>
      </Form>

      {/* Product Table */}
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Store</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.store}</td>
              <td>{p.category}</td>
              <td>{p.quantity}</td>
              <td>
                <Button variant="primary" size="sm" onClick={() => handleEdit(p)}>
                  Edit
                </Button>
              </td>
              <td>
                <Button variant="danger" size="sm" onClick={() => handleDelete(p.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button variant="secondary" onClick={resetToDefault}>
        Reset to Default
      </Button>

      {/* Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              value={editProduct?.name || ""}
              onChange={e => setEditProduct({ ...editProduct, name: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Store Name</Form.Label>
            <Form.Control
              type="text"
              value={editProduct?.store || ""}
              onChange={e => setEditProduct({ ...editProduct, store: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              value={editProduct?.category || ""}
              onChange={e => setEditProduct({ ...editProduct, category: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              value={editProduct?.quantity || ""}
              onChange={e => setEditProduct({ ...editProduct, quantity: e.target.value })}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}