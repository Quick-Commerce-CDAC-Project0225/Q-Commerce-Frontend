// // src/admin/pages/ManageProduct.jsx
// import React, { useState, useEffect } from "react";
// import { Table, Button, Form, Modal, Image, Spinner } from "react-bootstrap";
// import {  getAllProducts,
//   addProduct,
//   updateProduct,
//   deleteProduct, } from "../../api/productTempApi";




// export default function ManageProduct() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [newProduct, setNewProduct] = useState({
//     name: "",
//     description: "",
//     price: "",
//   });
//   const [editProduct, setEditProduct] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   // Load products from backend
//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       const res = await getAllProducts();
//       setProducts(res.data.data); // Paginated response
//     } catch (err) {
//       alert("Failed to load products.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAdd = async () => {
//     const { name, price, description } = newProduct;
//     if (!name || !price || !description) {
//       alert("All fields required");
//       return;
//     }

//     try {
//       const res = await addProduct({
//         name,
//         price: parseFloat(price),
//         description,
//       });
//       setProducts((prev) => [...prev, res.data.data]);
//       setNewProduct({ name: "", price: "", description: "" });
//     } catch (err) {
//       alert("Failed to add product");
//     }
//   };

//   const handleEdit = (product) => {
//     setEditProduct({ ...product });
//     setShowModal(true);
//   };

//   const handleSave = async () => {
//     try {
//       const res = await updateProduct(editProduct.productId, {
//         name: editProduct.name,
//         price: editProduct.price,
//         description: editProduct.description,
//       });

//       setProducts((prev) =>
//         prev.map((p) =>
//           p.productId === editProduct.productId ? res.data.data : p
//         )
//       );
//       setShowModal(false);
//     } catch (err) {
//       alert("Failed to update product");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this product?")) return;
//     try {
//       await deleteProduct(id);
//       setProducts((prev) => prev.filter((p) => p.productId !== id));
//     } catch (err) {
//       alert("Failed to delete");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="mb-4">Manage Products</h2>

//       {/* Add Product Form */}
//       <Form className="row g-3 mb-4">
//         <Form.Group className="col-md-3">
//           <Form.Control
//             type="text"
//             placeholder="Product Name"
//             value={newProduct.name}
//             onChange={(e) =>
//               setNewProduct({ ...newProduct, name: e.target.value })
//             }
//           />
//         </Form.Group>
//         <Form.Group className="col-md-3">
//           <Form.Control
//             type="text"
//             placeholder="Description"
//             value={newProduct.description}
//             onChange={(e) =>
//               setNewProduct({ ...newProduct, description: e.target.value })
//             }
//           />
//         </Form.Group>
//         <Form.Group className="col-md-3">
//           <Form.Control
//             type="number"
//             placeholder="Price"
//             value={newProduct.price}
//             onChange={(e) =>
//               setNewProduct({ ...newProduct, price: e.target.value })
//             }
//           />
//         </Form.Group>
//         <div className="col-12">
//           <Button variant="success" onClick={handleAdd}>
//             Add Product
//           </Button>
//         </div>
//       </Form>

//       {/* Product Table */}
//       {loading ? (
//         <div className="text-center">
//           <Spinner animation="border" />
//         </div>
//       ) : (
//         <Table striped bordered hover responsive>
//           <thead className="table-dark">
//             <tr>
//               <th>Name</th>
//               <th>Description</th>
//               <th>Price</th>
//               <th>Images</th>
//               <th>Edit</th>
//               <th>Delete</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((p) => (
//               <tr key={p.productId}>
//                 <td>{p.name}</td>
//                 <td>{p.description}</td>
//                 <td>₹ {p.price}</td>
//                 <td>
//                   {p.images && p.images.length > 0 ? (
//                     <Image
//                       src={`http://localhost:8080${p.images[0]}`}
//                       width={50}
//                       height={50}
//                       rounded
//                     />
//                   ) : (
//                     "No Image"
//                   )}
//                 </td>
//                 <td>
//                   <Button
//                     variant="primary"
//                     size="sm"
//                     onClick={() => handleEdit(p)}
//                   >
//                     Edit
//                   </Button>
//                 </td>
//                 <td>
//                   <Button
//                     variant="danger"
//                     size="sm"
//                     onClick={() => handleDelete(p.productId)}
//                   >
//                     Delete
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       )}

//       {/* Edit Modal */}
//       <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Edit Product</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form.Group className="mb-3">
//             <Form.Label>Product Name</Form.Label>
//             <Form.Control
//               type="text"
//               value={editProduct?.name || ""}
//               onChange={(e) =>
//                 setEditProduct({ ...editProduct, name: e.target.value })
//               }
//             />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label>Description</Form.Label>
//             <Form.Control
//               type="text"
//               value={editProduct?.description || ""}
//               onChange={(e) =>
//                 setEditProduct({
//                   ...editProduct,
//                   description: e.target.value,
//                 })
//               }
//             />
//           </Form.Group>
//           <Form.Group>
//             <Form.Label>Price</Form.Label>
//             <Form.Control
//               type="number"
//               value={editProduct?.price || ""}
//               onChange={(e) =>
//                 setEditProduct({ ...editProduct, price: e.target.value })
//               }
//             />
//           </Form.Group>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="success" onClick={handleSave}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }

// src/admin/pages/ManageProduct.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  Button,
  Form,
  Modal,
  Spinner,
  Alert,
  InputGroup,
  Row,
  Col,
} from "react-bootstrap";
import {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../../api/productTempApi";

export default function ManageProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: "", description: "", price: "" });

  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [search, setSearch] = useState("");

  const currency = (n) =>
    typeof n === "number"
      ? n.toLocaleString("en-IN", { style: "currency", currency: "INR" })
      : n;

  const loadProducts = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await getAllProducts();
      // Works with either: array OR { data: [...] }
      const list = Array.isArray(res?.data) ? res.data : res?.data?.data ?? [];
      setProducts(Array.isArray(list) ? list : []);
    } catch (e) {
      setError("Failed to load products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        (p.name || "").toLowerCase().includes(q) ||
        (p.description || "").toLowerCase().includes(q)
    );
  }, [products, search]);

  const openCreate = () => {
    setEditingId(null);
    setForm({ name: "", description: "", price: "" });
    setShowModal(true);
  };

  const openEdit = (p) => {
    setEditingId(p.id ?? p.productId); // handle either id or productId
    setForm({
      name: p.name ?? "",
      description: p.description ?? "",
      price: p.price ?? "",
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.name?.trim() || form.price === "" || form.price === null) {
      setError("Please provide name and price");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const payload = {
        name: form.name.trim(),
        description: form.description?.trim() ?? "",
        price: Number(form.price),
      };
      if (editingId) {
        await updateProduct(editingId, payload);
      } else {
        await addProduct(payload);
      }
      setShowModal(false);
      await loadProducts();
    } catch (e) {
      setError("Failed to save product");
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
  };

  const doDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    setError("");
    try {
      await deleteProduct(deleteId);
      setDeleteId(null);
      await loadProducts();
    } catch (e) {
      setError("Failed to delete product");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
        <h2 className="mb-2 mb-md-0">Manage Products</h2>
        <div className="d-flex gap-2">
          <InputGroup>
            <Form.Control
              placeholder="Search name or description"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
          <Button variant="success" onClick={openCreate}>
            Add Product
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="danger" className="mb-3">
          {error}
        </Alert>
      )}

      {loading ? (
        <div className="d-flex align-items-center gap-2">
          <Spinner animation="border" size="sm" /> Loading...
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th style={{ width: 80 }}>ID</th>
              <th style={{ minWidth: 220 }}>Name</th>
              <th>Description</th>
              <th style={{ width: 140 }}>Price</th>
              <th style={{ width: 180 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(Array.isArray(filtered) ? filtered : []).map((p) => (
              <tr key={p.id ?? p.productId}>
                <td>{p.id ?? p.productId}</td>
                <td>{p.name}</td>
                <td className="text-truncate" style={{ maxWidth: 420 }}>
                  {p.description || <span className="text-muted">—</span>}
                </td>
                <td>{currency(p.price)}</td>
                <td>
                  <div className="d-flex gap-2">
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => openEdit(p)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => confirmDelete(p.id ?? p.productId)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center text-muted">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? "Edit Product" : "Add Product"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="eg. iPhone 15"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    placeholder="eg. 99999"
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    placeholder="Short description"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowModal(false)}
            disabled={saving}
          >
            Cancel
          </Button>
          <Button variant="success" onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : editingId ? "Save Changes" : "Create"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal
        show={!!deleteId}
        onHide={() => setDeleteId(null)}
        centered
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete product{" "}
          <strong>#{deleteId}</strong>? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setDeleteId(null)}
            disabled={deleting}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={doDelete} disabled={deleting}>
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
