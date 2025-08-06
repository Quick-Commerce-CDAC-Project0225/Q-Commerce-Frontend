// src/pages/ManageCustomer.jsx
import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';

const DEFAULT_CUSTOMERS = [
  { id: 1, name: "Aarav Sharma",  email: "aarav.sharma@example.com",  phone: "9876543210", address: "MG Road, Mumbai" },
  { id: 2, name: "Priya Verma",   email: "priya.verma@example.com",   phone: "9123456789", address: "HB Colony, Jaipur" },
];

export default function ManageCustomer() {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({
    name: '', email: '', phone: '', address: ''
  });
  const [editCustomer, setEditCustomer] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Load customers from localStorage or defaults
  useEffect(() => {
    const stored = localStorage.getItem('customerData');
    if (stored) {
      setCustomers(JSON.parse(stored));
    } else {
      setCustomers(DEFAULT_CUSTOMERS);
      localStorage.setItem('customerData', JSON.stringify(DEFAULT_CUSTOMERS));
    }
  }, []);

  // Persist customers whenever they change
  useEffect(() => {
    localStorage.setItem('customerData', JSON.stringify(customers));
  }, [customers]);

  // Add a new customer
  const handleAdd = () => {
    const { name, email, phone, address } = newCustomer;
    if (!name.trim() || !email.trim()) return; // require at least name & email

    const id = Date.now();
    setCustomers(prev => [
      ...prev,
      { id, name: name.trim(), email: email.trim(), phone: phone.trim(), address: address.trim() }
    ]);
    setNewCustomer({ name: '', email: '', phone: '', address: '' });
  };

  // Open edit modal
  const handleEdit = customer => {
    setEditCustomer({ ...customer });
    setShowModal(true);
  };

  // Save edited customer
  const handleSave = () => {
    setCustomers(prev =>
      prev.map(c => (c.id === editCustomer.id ? editCustomer : c))
    );
    setShowModal(false);
  };

  // Delete a customer
  const handleDelete = id => {
    if (window.confirm('Delete this customer?')) {
      setCustomers(prev => prev.filter(c => c.id !== id));
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Manage Customers</h2>

      {/* Add Customer Form */}
      <Form className="row g-3 mb-4">
        <Form.Group className="col-md-3">
          <Form.Control
            type="text"
            placeholder="Full Name"
            value={newCustomer.name}
            onChange={e => setNewCustomer({ ...newCustomer, name: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="col-md-3">
          <Form.Control
            type="email"
            placeholder="Email"
            value={newCustomer.email}
            onChange={e => setNewCustomer({ ...newCustomer, email: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="col-md-2">
          <Form.Control
            type="text"
            placeholder="Phone"
            value={newCustomer.phone}
            onChange={e => setNewCustomer({ ...newCustomer, phone: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="col-md-3">
          <Form.Control
            type="text"
            placeholder="Address"
            value={newCustomer.address}
            onChange={e => setNewCustomer({ ...newCustomer, address: e.target.value })}
          />
        </Form.Group>
        <div className="col-md-1">
          <Button variant="success" onClick={handleAdd}>Add</Button>
        </div>
      </Form>

      {/* Customers Table */}
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(c => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
              <td>{c.address}</td>
              <td>
                <Button size="sm" variant="primary" onClick={() => handleEdit(c)}>
                  Edit
                </Button>
              </td>
              <td>
                <Button size="sm" variant="danger" onClick={() => handleDelete(c.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Edit Customer Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                value={editCustomer?.name || ''}
                onChange={e => setEditCustomer({ ...editCustomer, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={editCustomer?.email || ''}
                onChange={e => setEditCustomer({ ...editCustomer, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                value={editCustomer?.phone || ''}
                onChange={e => setEditCustomer({ ...editCustomer, phone: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                value={editCustomer?.address || ''}
                onChange={e => setEditCustomer({ ...editCustomer, address: e.target.value })}
              />
            </Form.Group>
          </Form>
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