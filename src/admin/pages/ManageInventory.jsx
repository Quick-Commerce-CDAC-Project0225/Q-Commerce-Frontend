import React, { useState, useEffect } from "react";
import { Modal, Button, Table, Form } from "react-bootstrap";

const DEFAULT_DATA = [
  { id: 1,  productName: "Milk",           store: "Dark Store 1", quantity: 50 },
  { id: 2,  productName: "Bread",          store: "Dark Store 2", quantity: 30 },
  { id: 3,  productName: "Eggs",           store: "Dark Store 1", quantity: 20 },
  { id: 4,  productName: "Butter",         store: "Dark Store 2", quantity: 25 },
  { id: 5,  productName: "Cheese",         store: "Dark Store 1", quantity: 15 },
  { id: 6,  productName: "Tomatoes",       store: "Dark Store 2", quantity: 40 },
  { id: 7,  productName: "Potatoes",       store: "Dark Store 1", quantity: 60 },
  { id: 8,  productName: "Onions",         store: "Dark Store 2", quantity: 70 },
  { id: 9,  productName: "Rice",           store: "Dark Store 1", quantity: 100 },
  { id: 10, productName: "Wheat Flour",    store: "Dark Store 2", quantity: 80 },
  { id: 11, productName: "Sugar",          store: "Dark Store 1", quantity: 90 },
  { id: 12, productName: "Salt",           store: "Dark Store 2", quantity: 110 },
  { id: 13, productName: "Yogurt",         store: "Dark Store 1", quantity: 45 },
  { id: 14, productName: "Paneer",         store: "Dark Store 2", quantity: 35 },
  { id: 15, productName: "Peanut Butter",  store: "Dark Store 1", quantity: 55 }
];
const ManageInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newQty, setNewQty] = useState("");
  const [newProduct, setNewProduct] = useState({
    productName: "",
    store: "",
    quantity: "",
  });

  // Load from localStorage or default data
  useEffect(() => {
    const storedData = localStorage.getItem("inventoryData");
    if (storedData) {
      setInventory(JSON.parse(storedData));
    } else {
      setInventory(DEFAULT_DATA);
      localStorage.setItem("inventoryData", JSON.stringify(DEFAULT_DATA));
    }
  }, []);

  // Save to localStorage whenever inventory changes
  useEffect(() => {
    localStorage.setItem("inventoryData", JSON.stringify(inventory));
  }, [inventory]);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setNewQty(product.quantity);
    setShowModal(true);
  };

  const handleSave = () => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === selectedProduct.id
          ? { ...item, quantity: parseInt(newQty) }
          : item
      )
    );
    setShowModal(false);
  };

  const handleAddProduct = () => {
    if (
      newProduct.productName.trim() &&
      newProduct.store.trim() &&
      newProduct.quantity
    ) {
      const newItem = {
        ...newProduct,
        id: Date.now(),
        quantity: parseInt(newProduct.quantity),
      };
      setInventory((prev) => [...prev, newItem]);
      setNewProduct({ productName: "", store: "", quantity: "" });
    }
  };

  const handleDelete = (id) => {
    setInventory((prev) => prev.filter((item) => item.id !== id));
  };

  const resetToDefault = () => {
    setInventory(DEFAULT_DATA);
    localStorage.setItem("inventoryData", JSON.stringify(DEFAULT_DATA));
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Manage Inventory</h2>

      {/* Add Product Form */}
      <div className="mb-4">
        <h5>Add New Product</h5>
        <Form className="row g-3">
          <Form.Group className="col-md-4">
            <Form.Control
              type="text"
              placeholder="Product Name"
              value={newProduct.productName}
              onChange={(e) =>
                setNewProduct({ ...newProduct, productName: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="col-md-4">
            <Form.Control
              type="text"
              placeholder="Store Name"
              value={newProduct.store}
              onChange={(e) =>
                setNewProduct({ ...newProduct, store: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="col-md-2">
            <Form.Control
              type="number"
              placeholder="Quantity"
              value={newProduct.quantity}
              onChange={(e) =>
                setNewProduct({ ...newProduct, quantity: e.target.value })
              }
            />
          </Form.Group>
          <div className="col-md-2">
            <Button variant="success" onClick={handleAddProduct}>
              Add
            </Button>
          </div>
        </Form>
      </div>

      {/* Inventory Table */}
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Product Name</th>
            <th>Dark Store</th>
            <th>Quantity</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item.id}>
              <td>{item.productName}</td>
              <td>{item.store}</td>
              <td>{item.quantity}</td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </Button>
              </td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Reset Button */}
      <div className="mt-3">
        <Button variant="secondary" onClick={resetToDefault}>
          Reset to Default Data
        </Button>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Quantity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>New Quantity</Form.Label>
            <Form.Control
              type="number"
              value={newQty}
              onChange={(e) => setNewQty(e.target.value)}
              min="0"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageInventory;
