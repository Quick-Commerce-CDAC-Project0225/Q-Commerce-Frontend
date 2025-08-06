// src/pages/ManageOrder.jsx
import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Modal, Row, Col } from 'react-bootstrap';

const DEFAULT_ORDERS = [
  {
    id: 1,
    cid: 1001,
    customerName: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    phone: "123-456-7890",
    totalOrders: 3,
    totalAmount: 75.50,
    orderedDate: "2025-07-20",
    deliveryDate: "2025-07-22",
    status: "Pending"
  },
  {
    id: 2,
    cid: 1002,
    customerName: "Priya Verma",
    email: "priya.verma@example.com",
    phone: "987-654-3210",
    totalOrders: 1,
    totalAmount: 25.00,
    orderedDate: "2025-07-21",
    deliveryDate: "2025-07-25",
    status: "Shipped"
  },
  {
    id: 3,
    cid: 1003,
    customerName: "Rohit Gupta",
    email: "rohit.gupta@example.com",
    phone: "555-123-4567",
    totalOrders: 2,
    totalAmount: 45.75,
    orderedDate: "2025-07-19",
    deliveryDate: "2025-07-23",
    status: "Delivered"
  },
  {
    id: 4,
    cid: 1004,
    customerName: "Ananya Singh",
    email: "ananya.singh@example.com",
    phone: "444-987-6543",
    totalOrders: 5,
    totalAmount: 120.00,
    orderedDate: "2025-07-18",
    deliveryDate: "2025-07-20",
    status: "Cancelled"
  },
  {
    id: 5,
    cid: 1005,
    customerName: "Siddharth Patel",
    email: "siddharth.patel@example.com",
    phone: "666-555-4444",
    totalOrders: 4,
    totalAmount: 89.99,
    orderedDate: "2025-07-17",
    deliveryDate: "2025-07-19",
    status: "Shipped"
  },
  {
    id: 6,
    cid: 1006,
    customerName: "Neha Reddy",
    email: "neha.reddy@example.com",
    phone: "777-888-9999",
    totalOrders: 1,
    totalAmount: 15.50,
    orderedDate: "2025-07-16",
    deliveryDate: "2025-07-18",
    status: "Pending"
  },
  {
    id: 7,
    cid: 1007,
    customerName: "Vikram Kumar",
    email: "vikram.kumar@example.com",
    phone: "222-333-4444",
    totalOrders: 3,
    totalAmount: 60.00,
    orderedDate: "2025-07-15",
    deliveryDate: "2025-07-17",
    status: "Delivered"
  },
  {
    id: 8,
    cid: 1008,
    customerName: "Aisha Khan",
    email: "aisha.khan@example.com",
    phone: "333-444-5555",
    totalOrders: 2,
    totalAmount: 30.25,
    orderedDate: "2025-07-14",
    deliveryDate: "2025-07-16",
    status: "Shipped"
  },
  {
    id: 9,
    cid: 1009,
    customerName: "Karan Mehta",
    email: "karan.mehta@example.com",
    phone: "888-777-6666",
    totalOrders: 6,
    totalAmount: 150.00,
    orderedDate: "2025-07-13",
    deliveryDate: "2025-07-17",
    status: "Pending"
  },
  {
    id: 10,
    cid: 1010,
    customerName: "Sneha Joshi",
    email: "sneha.joshi@example.com",
    phone: "111-222-3333",
    totalOrders: 4,
    totalAmount: 99.99,
    orderedDate: "2025-07-12",
    deliveryDate: "2025-07-15",
    status: "Delivered"
  },
  {
    id: 11,
    cid: 1011,
    customerName: "Ankit Rao",
    email: "ankit.rao@example.com",
    phone: "999-000-1111",
    totalOrders: 2,
    totalAmount: 40.00,
    orderedDate: "2025-07-11",
    deliveryDate: "2025-07-13",
    status: "Cancelled"
  },
  {
    id: 12,
    cid: 1012,
    customerName: "Pooja Shah",
    email: "pooja.shah@example.com",
    phone: "555-666-7777",
    totalOrders: 5,
    totalAmount: 110.50,
    orderedDate: "2025-07-10",
    deliveryDate: "2025-07-12",
    status: "Shipped"
  },
  {
    id: 13,
    cid: 1013,
    customerName: "Rohan Desai",
    email: "rohan.desai@example.com",
    phone: "444-555-6666",
    totalOrders: 3,
    totalAmount: 70.75,
    orderedDate: "2025-07-09",
    deliveryDate: "2025-07-14",
    status: "Pending"
  },
  {
    id: 14,
    cid: 1014,
    customerName: "Ishita Banerjee",
    email: "ishita.banerjee@example.com",
    phone: "222-111-0000",
    totalOrders: 2,
    totalAmount: 35.50,
    orderedDate: "2025-07-08",
    deliveryDate: "2025-07-11",
    status: "Delivered"
  },
  {
    id: 15,
    cid: 1015,
    customerName: "Manish Tiwari",
    email: "manish.tiwari@example.com",
    phone: "777-666-5555",
    totalOrders: 1,
    totalAmount: 20.00,
    orderedDate: "2025-07-07",
    deliveryDate: "2025-07-10",
    status: "Shipped"
  }
];

export default function ManageOrder() {
  const [orders, setOrders] = useState([]);
  const [idCounter, setIdCounter] = useState(0);
  const [newOrder, setNewOrder] = useState({
    cid: '', customerName: '', email: '', phone: '',
    totalOrders: '', totalAmount: '',
    orderedDate: '', deliveryDate: '', status: 'Pending'
  });
  const [editOrder, setEditOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Load orders & idCounter from localStorage (or initialize)
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('orderData'));
    const initialOrders = Array.isArray(stored) ? stored : DEFAULT_ORDERS;
    setOrders(initialOrders);

    const storedCounter = parseInt(localStorage.getItem('orderIdCounter'), 10);
    if (!isNaN(storedCounter)) {
      setIdCounter(storedCounter);
    } else {
      const maxId = initialOrders.reduce((max, o) => Math.max(max, o.id), 0);
      setIdCounter(maxId);
      localStorage.setItem('orderIdCounter', maxId);
    }
  }, []);

  // Persist orders whenever they change
  useEffect(() => {
    localStorage.setItem('orderData', JSON.stringify(orders));
  }, [orders]);

  // Add new order with auto-incrementing ID
  const handleAdd = () => {
    const {
      cid, customerName, email, phone,
      totalOrders, totalAmount,
      orderedDate, deliveryDate, status
    } = newOrder;
    if (!cid || !customerName || !email || !phone ||
        !totalOrders || !totalAmount ||
        !orderedDate || !deliveryDate) return;

    const nextId = idCounter + 1;
    const entry = {
      id: nextId,
      cid: parseInt(cid, 10),
      customerName,
      email,
      phone,
      totalOrders: parseInt(totalOrders, 10),
      totalAmount: parseFloat(totalAmount),
      orderedDate,
      deliveryDate,
      status
    };

    setOrders(prev => [...prev, entry]);
    setIdCounter(nextId);
    localStorage.setItem('orderIdCounter', nextId);

    setNewOrder({
      cid: '', customerName: '', email: '', phone: '',
      totalOrders: '', totalAmount: '',
      orderedDate: '', deliveryDate: '', status: 'Pending'
    });
  };

  // Begin edit
  const handleEdit = (order) => {
    setEditOrder({ ...order });
    setShowModal(true);
  };

  // Save edited order
  const handleSave = () => {
    setOrders(prev =>
      prev.map(o => (o.id === editOrder.id ? editOrder : o))
    );
    setShowModal(false);
  };

  // Delete order
  const handleDelete = (id) => {
    if (window.confirm('Delete this order?')) {
      setOrders(prev => prev.filter(o => o.id !== id));
    }
  };

  // Reset to defaults (and reset counter)
  const handleReset = () => {
    setOrders(DEFAULT_ORDERS);
    const maxId = DEFAULT_ORDERS.reduce((max, o) => Math.max(max, o.id), 0);
    setIdCounter(maxId);
    localStorage.setItem('orderData', JSON.stringify(DEFAULT_ORDERS));
    localStorage.setItem('orderIdCounter', maxId);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Manage Orders</h2>

      {/* Add Order Form */}
      <Form className="mb-4">
        <Row className="g-3">
          <Col md={1}>
            <Form.Control
              type="number" placeholder="CID"
              value={newOrder.cid}
              onChange={e => setNewOrder({ ...newOrder, cid: e.target.value })}
            />
          </Col>
          <Col md={2}>
            <Form.Control
              type="text" placeholder="Customer Name"
              value={newOrder.customerName}
              onChange={e => setNewOrder({ ...newOrder, customerName: e.target.value })}
            />
          </Col>
          <Col md={2}>
            <Form.Control
              type="email" placeholder="Email"
              value={newOrder.email}
              onChange={e => setNewOrder({ ...newOrder, email: e.target.value })}
            />
          </Col>
          <Col md={1}>
            <Form.Control
              type="text" placeholder="Phone"
              value={newOrder.phone}
              onChange={e => setNewOrder({ ...newOrder, phone: e.target.value })}
            />
          </Col>
          <Col md={1}>
            <Form.Control
              type="number" placeholder="# Items"
              value={newOrder.totalOrders}
              onChange={e => setNewOrder({ ...newOrder, totalOrders: e.target.value })}
            />
          </Col>
          <Col md={1}>
            <Form.Control
              type="number" step="0.01" placeholder="Amount"
              value={newOrder.totalAmount}
              onChange={e => setNewOrder({ ...newOrder, totalAmount: e.target.value })}
            />
          </Col>
          <Col md={2}>
            <Form.Control
              type="date" value={newOrder.orderedDate}
              onChange={e => setNewOrder({ ...newOrder, orderedDate: e.target.value })}
            />
          </Col>
          <Col md={2}>
            <Form.Control
              type="date" value={newOrder.deliveryDate}
              onChange={e => setNewOrder({ ...newOrder, deliveryDate: e.target.value })}
            />
          </Col>
          <Col md={1}>
            <Form.Select
              value={newOrder.status}
              onChange={e => setNewOrder({ ...newOrder, status: e.target.value })}
            >
              <option>Pending</option>
              <option>Shipped</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </Form.Select>
          </Col>
        </Row>
        <div className="mt-3">
          <Button variant="success" onClick={handleAdd}>Add Order</Button>{' '}
          <Button variant="secondary" onClick={handleReset}>Reset Defaults</Button>
        </div>
      </Form>

      {/* Orders Table */}
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>CID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th># Items</th>
            <th>Amount</th>
            <th>Ordered</th>
            <th>Delivery</th>
            <th>Status</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.cid}</td>
              <td>{o.customerName}</td>
              <td>{o.email}</td>
              <td>{o.phone}</td>
              <td>{o.totalOrders}</td>
              <td>{o.totalAmount.toFixed(2)}</td>
              <td>{o.orderedDate}</td>
              <td>{o.deliveryDate}</td>
              <td>{o.status}</td>
              <td>
                <Button size="sm" variant="primary" onClick={() => handleEdit(o)}>
                  Edit
                </Button>
              </td>
              <td>
                <Button size="sm" variant="danger" onClick={() => handleDelete(o.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="g-3">
              <Col md={1}>
                <Form.Label>ID</Form.Label>
                <Form.Control type="number" value={editOrder?.id || ''} readOnly />
              </Col>
              <Col md={1}>
                <Form.Label>CID</Form.Label>
                <Form.Control
                  type="number"
                  value={editOrder?.cid || ''}
                  onChange={e => setEditOrder({ ...editOrder, cid: parseInt(e.target.value, 10) })}
                />
              </Col>
              <Col md={4}>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={editOrder?.customerName || ''}
                  onChange={e => setEditOrder({ ...editOrder, customerName: e.target.value })}
                />
              </Col>
              <Col md={6}>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={editOrder?.email || ''}
                  onChange={e => setEditOrder({ ...editOrder, email: e.target.value })}
                />
              </Col>
              <Col md={4}>
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  value={editOrder?.phone || ''}
                  onChange={e => setEditOrder({ ...editOrder, phone: e.target.value })}
                />
              </Col>
              <Col md={2}>
                <Form.Label># Items</Form.Label>
                <Form.Control
                  type="number"
                  value={editOrder?.totalOrders || ''}
                  onChange={e => setEditOrder({ ...editOrder, totalOrders: parseInt(e.target.value, 10) })}
                />
              </Col>
              <Col md={2}>
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number" step="0.01"
                  value={editOrder?.totalAmount || ''}
                  onChange={e => setEditOrder({ ...editOrder, totalAmount: parseFloat(e.target.value) })}
                />
              </Col>
              <Col md={4}>
                <Form.Label>Ordered Date</Form.Label>
                <Form.Control
                  type="date"
                  value={editOrder?.orderedDate || ''}
                  onChange={e => setEditOrder({ ...editOrder, orderedDate: e.target.value })}
                />
              </Col>
              <Col md={4}>
                <Form.Label>Delivery Date</Form.Label>
                <Form.Control
                  type="date"
                  value={editOrder?.deliveryDate || ''}
                  onChange={e => setEditOrder({ ...editOrder, deliveryDate: e.target.value })}
                />
              </Col>
              <Col md={4}>
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={editOrder?.status || 'Pending'}
                  onChange={e => setEditOrder({ ...editOrder, status: e.target.value })}
                >
                  <option>Pending</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                  <option>Cancelled</option>
                </Form.Select>
              </Col>
            </Row>
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