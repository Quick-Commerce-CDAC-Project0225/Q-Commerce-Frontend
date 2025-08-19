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
  Image,
} from "react-bootstrap";
import axios from "axios";
import {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../../api/productTempApi";

/* ====== Category enum (match backend) ====== */
const CATEGORIES = [
  "BEAUTY",
  "CAFE",
  "ELECTRONICS",
  "FASHION",
  "FRESH",
  "HOME",
  "MOBILES",
  "TOYS",
];
const pretty = (s) => s.charAt(0) + s.slice(1).toLowerCase();

/* ====== Image upload helper ====== */
/** Upload a single image file for a product */
async function uploadProductImage(productId, file) {
  if (!file) return;
  const formData = new FormData();
  formData.append("file", file); // Spring usually expects 'file'
  await axios.post(
    `http://52.66.243.195:8080/api/v1/images/upload/${productId}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    }
  );
}

export default function ManageProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    imageFile: null,
  });

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
      // Works with array or paginated object {data:[...]}
      const list = Array.isArray(res?.data) ? res.data : res?.data?.data ?? [];
      setProducts(Array.isArray(list) ? list : []);
    } catch (e) {
      console.error(e);
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
    setForm({
      name: "",
      description: "",
      price: "",
      category: "", // force user to choose
      imageFile: null,
    });
    setShowModal(true);
  };

  const openEdit = (p) => {
    const pid = p.id ?? p.productId;
    setEditingId(pid);
    setForm({
      name: p.name ?? "",
      description: p.description ?? "",
      price: p.price ?? "",
      category: (p.category || "").toString().toUpperCase(), // enum string or null
      imageFile: null, // user may choose to upload a new one
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.name?.trim() || form.price === "" || form.price === null) {
      setError("Please provide name and price");
      return;
    }
    if (!form.category) {
      setError("Please choose a category");
      return;
    }

    setSaving(true);
    setError("");
    try {
      const payload = {
        name: form.name.trim(),
        description: form.description?.trim() ?? "",
        price: Number(form.price),
        category: form.category, // enum string as backend expects
      };

      let productId = editingId;

      if (editingId) {
        // update
        const res = await updateProduct(editingId, payload);
        // Try to get product id from response if needed
        productId = productId ?? res?.data?.data?.productId ?? res?.data?.data?.id;
      } else {
        // create
        const res = await addProduct(payload);
        productId =
          res?.data?.data?.productId ??
          res?.data?.data?.id ??
          productId;
      }

      // Optional image upload
      if (productId && form.imageFile) {
        await uploadProductImage(productId, form.imageFile);
      }

      setShowModal(false);
      await loadProducts();
    } catch (e) {
      console.error(e);
      setError("Failed to save product");
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = (id) => setDeleteId(id);

  const doDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    setError("");
    try {
      await deleteProduct(deleteId);
      setDeleteId(null);
      await loadProducts();
    } catch (e) {
      console.error(e);
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
              <th style={{ minWidth: 200 }}>Name</th>
              <th>Category</th>
              <th>Description</th>
              <th style={{ width: 140 }}>Price</th>
              <th style={{ width: 150 }}>Image</th>
              <th style={{ width: 180 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(Array.isArray(filtered) ? filtered : []).map((p) => {
              const pid = p.id ?? p.productId;
              const firstImg =
                p.images && p.images.length > 0
                  ? `http://52.66.243.195:8080${p.images[0]}`
                  : null;
              return (
                <tr key={pid}>
                  <td>{pid}</td>
                  <td>{p.name}</td>
                  <td>{p.category || <span className="text-muted">—</span>}</td>
                  <td className="text-truncate" style={{ maxWidth: 360 }}>
                    {p.description || <span className="text-muted">—</span>}
                  </td>
                  <td>{currency(p.price)}</td>
                  <td>
                    {firstImg ? (
                      <Image src={firstImg} alt="" width={56} height={42} rounded />
                    ) : (
                      <span className="text-muted">No Image</span>
                    )}
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <Button size="sm" variant="primary" onClick={() => openEdit(p)}>
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => confirmDelete(pid)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center text-muted">
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
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value.toUpperCase() })
                    }
                  >
                    <option value="">Select category…</option>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {pretty(c)}
                      </option>
                    ))}
                  </Form.Select>
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

              <Col md={12}>
                <Form.Group>
                  <Form.Label>Upload Image (optional)</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setForm({ ...form, imageFile: e.target.files?.[0] ?? null })
                    }
                  />
                  <Form.Text muted>
                    This will upload a new image {editingId ? "for the selected product" : "after the product is created"}.
                  </Form.Text>
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
