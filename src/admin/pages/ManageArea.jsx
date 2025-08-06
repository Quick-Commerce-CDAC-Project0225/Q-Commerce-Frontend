import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";

const DEFAULT_AREAS = [
  { id: 1,  areaName: "Kothrud",           store: "Dark Store 1" },
  { id: 2,  areaName: "Viman Nagar",       store: "Dark Store 2" },
  { id: 3,  areaName: "Hinjewadi",         store: "Dark Store 1" },
  { id: 4,  areaName: "Baner",             store: "Dark Store 1" },
  { id: 5,  areaName: "Wakad",             store: "Dark Store 2" },
  { id: 6,  areaName: "Magarpatta City",   store: "Dark Store 1" },
  { id: 7,  areaName: "Hadapsar",          store: "Dark Store 2" },
  { id: 8,  areaName: "Shivaji Nagar",     store: "Dark Store 1" },
  { id: 9,  areaName: "Camp",              store: "Dark Store 2" },
  { id: 10, areaName: "Aundh",             store: "Dark Store 1" },
  { id: 11, areaName: "Pimple Saudagar",   store: "Dark Store 2" },
  { id: 12, areaName: "Wadgaon Sheri",     store: "Dark Store 1" },
  { id: 13, areaName: "Bibwewadi",         store: "Dark Store 2" },
  { id: 14, areaName: "Vishrantwadi",      store: "Dark Store 1" },
  { id: 15, areaName: "Yerawada",          store: "Dark Store 2" }
];

const ManageArea = () => {
  const [areas, setAreas] = useState([]);
  const [newArea, setNewArea] = useState({ areaName: "", store: "" });
  const [editArea, setEditArea] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("areaData");
    if (stored) setAreas(JSON.parse(stored));
    else {
      setAreas(DEFAULT_AREAS);
      localStorage.setItem("areaData", JSON.stringify(DEFAULT_AREAS));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("areaData", JSON.stringify(areas));
  }, [areas]);

  const handleAdd = () => {
    if (!newArea.areaName.trim() || !newArea.store.trim()) return;
    const isDuplicate = areas.some(
      (a) =>
        a.areaName.toLowerCase() === newArea.areaName.toLowerCase() &&
        a.store.toLowerCase() === newArea.store.toLowerCase()
    );
    if (isDuplicate) {
      alert("Area already assigned to this store.");
      return;
    }
    const area = { ...newArea, id: Date.now() };
    setAreas((prev) => [...prev, area]);
    setNewArea({ areaName: "", store: "" });
  };

  const handleEdit = (area) => {
    setEditArea(area);
    setShowModal(true);
  };

  const handleSaveEdit = () => {
    setAreas((prev) =>
      prev.map((item) =>
        item.id === editArea.id ? { ...item, ...editArea } : item
      )
    );
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setAreas((prev) => prev.filter((a) => a.id !== id));
  };

  const resetToDefault = () => {
    setAreas(DEFAULT_AREAS);
    localStorage.setItem("areaData", JSON.stringify(DEFAULT_AREAS));
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Manage Area</h2>

      {/* Add Area Form */}
      <Form className="row g-3 mb-4">
        <Form.Group className="col-md-5">
          <Form.Control
            type="text"
            placeholder="Area Name"
            value={newArea.areaName}
            onChange={(e) =>
              setNewArea({ ...newArea, areaName: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="col-md-5">
          <Form.Control
            type="text"
            placeholder="Store Name"
            value={newArea.store}
            onChange={(e) =>
              setNewArea({ ...newArea, store: e.target.value })
            }
          />
        </Form.Group>
        <div className="col-md-2">
          <Button variant="success" onClick={handleAdd}>
            Add
          </Button>
        </div>
      </Form>

      {/* Area Table */}
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Area Name</th>
            <th>Dark Store</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {areas.map((area) => (
            <tr key={area.id}>
              <td>{area.areaName}</td>
              <td>{area.store}</td>
              <td>
                <Button variant="primary" size="sm" onClick={() => handleEdit(area)}>
                  Edit
                </Button>
              </td>
              <td>
                <Button variant="danger" size="sm" onClick={() => handleDelete(area.id)}>
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
          Reset to Default
        </Button>
      </div>

      {/* Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Area</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Area Name</Form.Label>
            <Form.Control
              type="text"
              value={editArea?.areaName || ""}
              onChange={(e) =>
                setEditArea({ ...editArea, areaName: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Store Name</Form.Label>
            <Form.Control
              type="text"
              value={editArea?.store || ""}
              onChange={(e) =>
                setEditArea({ ...editArea, store: e.target.value })
              }
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSaveEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageArea;