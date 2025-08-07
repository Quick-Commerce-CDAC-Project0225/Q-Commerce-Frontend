import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { fetchAllOrders } from '../../api/orderTempApi'; // step 1 import

export default function ManageOrder() {
  const [orders, setOrders] = useState([]);

  // Step 2: Fetch orders from backend
  useEffect(() => {
    fetchAllOrders()
      .then(data => {
        console.log("Fetched orders:", data);
        setOrders(data);
      })
      .catch(error => {
        console.error("Error fetching orders:", error);
        alert("Failed to fetch orders from server.");
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Manage Orders</h2>

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Customer Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Items</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Created</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.user?.name}</td>
              <td>{order.user?.email}</td>
              <td>{order.address}</td>
              <td>{order.items?.length}</td>
              <td>
                ₹{order.items.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
              </td>
              <td>{order.status}</td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td>{new Date(order.updatedAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
