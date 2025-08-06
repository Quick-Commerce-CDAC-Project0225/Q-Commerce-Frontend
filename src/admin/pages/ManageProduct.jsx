// src/admin/pages/ManageProduct.jsx
import React, { useState, useEffect } from "react";
import { Table, Button, Form, Modal, Image, Spinner } from "react-bootstrap";
import {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../../api/productTempApi"; // ✅ Ensure 2 dots

export default function ManageProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [editProduct, setEditProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Load products from backend
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await getAllProducts();
      setProducts(res.data.data); // Paginated response
    } catch (err) {
      alert("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    const { name, price, description } = newProduct;
    if (!name || !price || !description) {
      alert("All fields required");
      return;
    }

    try {
      const res = await addProduct({
        name,
        price: parseFloat(price),
        description,
      });
      setProducts((prev) => [...prev, res.data.data]);
      setNewProduct({ name: "", price: "", description: "" });
    } catch (err) {
      alert("Failed to add product");
    }
  };

  const handleEdit = (product) => {
    setEditProduct({ ...product });
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      const res = await updateProduct(editProduct.productId, {
        name: editProduct.name,
        price: editProduct.price,
        description: editProduct.description,
      });

      setProducts((prev) =>
        prev.map((p) =>
          p.productId === editProduct.productId ? res.data.data : p
        )
      );
      setShowModal(false);
    } catch (err) {
      alert("Failed to update product");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.productId !== id));
    } catch (err) {
      alert("Failed to delete");
    }
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
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="col-md-3">
          <Form.Control
            type="text"
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="col-md-3">
          <Form.Control
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
        </Form.Group>
        <div className="col-12">
          <Button variant="success" onClick={handleAdd}>
            Add Product
          </Button>
        </div>
      </Form>

      {/* Product Table */}
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Images</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.productId}>
                <td>{p.name}</td>
                <td>{p.description}</td>
                <td>₹ {p.price}</td>
                <td>
                  {p.images && p.images.length > 0 ? (
                    <Image
                      src={`http://localhost:8082${p.images[0]}`}
                      width={50}
                      height={50}
                      rounded
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleEdit(p)}
                  >
                    Edit
                  </Button>
                </td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(p.productId)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

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
              onChange={(e) =>
                setEditProduct({ ...editProduct, name: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              value={editProduct?.description || ""}
              onChange={(e) =>
                setEditProduct({
                  ...editProduct,
                  description: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              value={editProduct?.price || ""}
              onChange={(e) =>
                setEditProduct({ ...editProduct, price: e.target.value })
              }
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
