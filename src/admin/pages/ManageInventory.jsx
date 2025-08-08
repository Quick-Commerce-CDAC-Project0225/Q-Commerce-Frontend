// src/pages/ManageInventory.jsx
import React, { useEffect, useState } from "react";
import { Table, Button, Form, Modal, Spinner, Alert } from "react-bootstrap";
import {
  getAllInventories,
  addInventory,
  updateInventory,
  deleteInventory,
} from "../../api/inventoryTempApi";
import { getAllProducts } from "../../api/productTempApi";
import { getAllWarehouses } from "../../api/warehouseTempApi";

export default function ManageInventory() {
  const [inventories, setInventories] = useState([]);
  const [products, setProducts] = useState([]);
  const [warehouses, setWarehouses] = useState([]);

  const [newInventory, setNewInventory] = useState({ sku: "", productId: "", warehouseId: "" });
  const [editInventory, setEditInventory] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");

  // normalize array to ensure each item has .id and .name
  const normalizeProducts = (arr) =>
    (Array.isArray(arr) ? arr : []).map((p) => ({
      id: p?.id ?? p?.productId, // tolerate either
      name: p?.name ?? "",
    })).filter((p) => p.id != null);

  const normalizeWarehouses = (arr) =>
    (Array.isArray(arr) ? arr : []).map((w) => ({
      id: w?.id,
      name: w?.name ?? "",
    })).filter((w) => w.id != null);

  const loadAll = async () => {
    setLoading(true);
    setError("");
    try {
      const [prodRes, whRes, invRes] = await Promise.all([
        getAllProducts(),           // should return array (from /api/v1/products/all)
        getAllWarehouses(),         // array
        getAllInventories(0, 100),  // Page or array
      ]);
      setProducts(normalizeProducts(prodRes?.data));
      setWarehouses(normalizeWarehouses(whRes?.data));

      const d = invRes?.data;
      const list = Array.isArray(d) ? d : d?.content ?? d?.data?.content ?? [];
      setInventories(Array.isArray(list) ? list : []);
    } catch (e) {
      setError("Failed to load inventory data");
      setInventories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadAll(); }, []);

  const toId = (val) => {
    const n = parseInt(val, 10);
    return Number.isNaN(n) ? null : n;
  };

  const handleAdd = async () => {
    const sku = (newInventory.sku || "").trim();
    const productId = toId(newInventory.productId);
    const warehouseId = toId(newInventory.warehouseId);

    if (!sku || productId == null || warehouseId == null) {
      setError("Please enter SKU and select Product & Warehouse.");
      return;
    }

    setSaving(true);
    setError("");
    try {
      await addInventory({ sku, productId, warehouseId });
      setNewInventory({ sku: "", productId: "", warehouseId: "" });
      await loadAll();
    } catch (e) {
      const serverMsg = e?.response?.data?.message || e?.message;
      setError(serverMsg || "Failed to add inventory. Ensure SKU is unique and IDs are valid.");
    } finally {
      setSaving(false);
    }
  };

  const openEdit = (inv) => {
    setEditInventory({
      id: inv.id,
      sku: inv.sku ?? "",
      productId: inv.productId ?? inv.product?.id ?? "",
      warehouseId: inv.warehouseId ?? inv.warehouse?.id ?? "",
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!editInventory?.id) return;

    const sku = (editInventory.sku || "").trim();
    const productId = toId(editInventory.productId);
    const warehouseId = toId(editInventory.warehouseId);

    if (!sku || productId == null || warehouseId == null) {
      setError("Please enter SKU and select Product & Warehouse.");
      return;
    }

    setSaving(true);
    setError("");
    try {
      await updateInventory(editInventory.id, { sku, productId, warehouseId });
      setShowModal(false);
      await loadAll();
    } catch (e) {
      const serverMsg = e?.response?.data?.message || e?.message;
      setError(serverMsg || "Failed to update inventory.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this inventory item?")) return;
    setDeletingId(id);
    setError("");
    try {
      await deleteInventory(id);
      await loadAll();
    } catch (e) {
      const serverMsg = e?.response?.data?.message || e?.message;
      setError(serverMsg || "Failed to delete inventory.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Manage Inventory</h2>

      {error && <Alert variant="danger" className="mb-3">{error}</Alert>}

      {/* Add Inventory Form */}
      <Form className="row g-3 mb-4">
        <Form.Group className="col-md-3">
          <Form.Control
            type="text"
            placeholder="SKU"
            value={newInventory.sku}
            onChange={(e) => setNewInventory({ ...newInventory, sku: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="col-md-3">
          <Form.Select
            value={newInventory.productId}
            onChange={(e) => setNewInventory({ ...newInventory, productId: e.target.value })}
          >
            <option value="">Select Product</option>
            {products.map((p) => (
              <option key={p.id} value={String(p.id)}>{p.name}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="col-md-3">
          <Form.Select
            value={newInventory.warehouseId}
            onChange={(e) => setNewInventory({ ...newInventory, warehouseId: e.target.value })}
          >
            <option value="">Select Warehouse</option>
            {warehouses.map((w) => (
              <option key={w.id} value={String(w.id)}>{w.name}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <div className="col-md-2">
          <Button variant="success" onClick={handleAdd} disabled={saving}>
            {saving ? "Adding..." : "Add"}
          </Button>
        </div>
      </Form>

      {/* Inventory Table */}
      {loading ? (
        <div className="d-flex align-items-center gap-2">
          <Spinner animation="border" size="sm" /> Loading...
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>SKU</th>
              <th>Product</th>
              <th>Warehouse</th>
              <th>Created</th>
              <th>Updated</th>
              <th style={{ width: 160 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventories.map((inv) => (
              <tr key={inv.id}>
                <td>{inv.sku}</td>
                <td>{inv.productName ?? inv.product?.name ?? inv.productId}</td>
                <td>{inv.warehouseName ?? inv.warehouse?.name ?? inv.warehouseId}</td>
                <td>{inv.createdAt ? new Date(inv.createdAt).toLocaleString() : "-"}</td>
                <td>{inv.updatedAt ? new Date(inv.updatedAt).toLocaleString() : "-"}</td>
                <td>
                  <div className="d-flex gap-2">
                    <Button size="sm" variant="primary" onClick={() => openEdit(inv)}>Edit</Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDelete(inv.id)}
                      disabled={deletingId === inv.id}
                    >
                      {deletingId === inv.id ? "Deleting..." : "Delete"}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {inventories.length === 0 && (
              <tr><td colSpan={6} className="text-center text-muted">No inventory found</td></tr>
            )}
          </tbody>
        </Table>
      )}

      {/* Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton><Modal.Title>Edit Inventory</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>SKU</Form.Label>
              <Form.Control
                value={editInventory?.sku || ""}
                onChange={(e) => setEditInventory({ ...editInventory, sku: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Product</Form.Label>
              <Form.Select
                value={editInventory?.productId || ""}
                onChange={(e) => setEditInventory({ ...editInventory, productId: e.target.value })}
              >
                <option value="">Select Product</option>
                {products.map((p) => (
                  <option key={p.id} value={String(p.id)}>{p.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Warehouse</Form.Label>
              <Form.Select
                value={editInventory?.warehouseId || ""}
                onChange={(e) => setEditInventory({ ...editInventory, warehouseId: e.target.value })}
              >
                <option value="">Select Warehouse</option>
                {warehouses.map((w) => (
                  <option key={w.id} value={String(w.id)}>{w.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)} disabled={saving}>Cancel</Button>
          <Button variant="success" onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
