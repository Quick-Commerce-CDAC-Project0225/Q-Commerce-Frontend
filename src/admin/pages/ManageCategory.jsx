import React, { useState } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";

const DEFAULT_CATEGORIES = [
  { id: 1, categoryName: "Groceries" },
  { id: 2, categoryName: "Beverages" },
  { id: 3, categoryName: "Snacks" },
  { id: 4, categoryName: "Dairy" },
  { id: 5, categoryName: "Bakery" },
  { id: 6, categoryName: "Household Supplies" },
  { id: 7, categoryName: "Personal Care" },
  { id: 8, categoryName: "Electronics" },
  { id: 9, categoryName: "Clothing" },
  { id: 10, categoryName: "Health & Wellness" },
  { id: 11, categoryName: "Stationery" },
  { id: 12, categoryName: "Toys & Games" },
  { id: 13, categoryName: "Sports & Outdoors" },
  { id: 14, categoryName: "Automotive" },
  { id: 15, categoryName: "Pet Supplies" }
];

export default function ManageCategory() {
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [newName, setNewName] = useState("");
  const [editCat, setEditCat] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleAdd = () => {
    const name = newName.trim();
    if (!name) return;
    if (categories.some(c => c.categoryName.toLowerCase() === name.toLowerCase())) {
      alert("Category already exists");
      return;
    }
    const newCat = { id: Date.now(), categoryName: name };
    setCategories(prev => [...prev, newCat]);
    setNewName("");
  };

  const handleEdit = (cat) => {
    setEditCat({ ...cat });
    setShowModal(true);
  };

  const handleSave = () => {
    const name = editCat.categoryName.trim();
    if (!name) return;
    if (
      categories.some(
        c =>
          c.id !== editCat.id &&
          c.categoryName.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert("Another category with this name exists");
      return;
    }
    setCategories(prev =>
      prev.map(c => (c.id === editCat.id ? { ...c, categoryName: name } : c))
    );
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this category?")) {
      setCategories(prev => prev.filter(c => c.id !== id));
    }
  };

  const resetToDefault = () => {
    setCategories(DEFAULT_CATEGORIES);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Manage Categories</h2>

      {/* Add Category Form */}
      <Form className="row g-3 mb-4">
        <Form.Group className="col-md-8">
          <Form.Control
            type="text"
            placeholder="New Category Name"
            value={newName}
            onChange={e => setNewName(e.target.value)}
          />
        </Form.Group>
        <div className="col-md-4">
          <Button variant="success" onClick={handleAdd}>
            Add Category
          </Button>
        </div>
      </Form>

      {/* Category Table */}
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Category Name</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(cat => (
            <tr key={cat.id}>
              <td>{cat.categoryName}</td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleEdit(cat)}
                >
                  Edit
                </Button>
              </td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(cat.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="mt-3">
        <Button variant="secondary" onClick={resetToDefault}>
          Reset to Default
        </Button>
      </div>

      {/* Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              value={editCat?.categoryName || ""}
              onChange={e =>
                setEditCat({ ...editCat, categoryName: e.target.value })
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
