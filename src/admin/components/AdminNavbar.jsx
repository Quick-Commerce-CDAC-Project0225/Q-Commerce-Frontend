// src/components/AdminNavbar.jsx
import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../client/context/AuthContext';

export default function AdminNavbar() {
  const { logout } = useAuth(); // ✅ access logout function

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/admin">
          QuickCommerce Admin
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="admin-navbar-nav" />
        <Navbar.Collapse id="admin-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/admin/manage-inventory">Manage Inventory</Nav.Link>
            <Nav.Link as={Link} to="/admin/manage-area">Manage Areas</Nav.Link>
            <Nav.Link as={Link} to="/admin/manage-category">Manage Categories</Nav.Link>
            <Nav.Link as={Link} to="/admin/manage-product">Manage Products</Nav.Link>
            <Nav.Link as={Link} to="/admin/manage-customer">Manage Customers</Nav.Link>
            <Nav.Link as={Link} to="/admin/manage-order">Manage Orders</Nav.Link>
          </Nav>
          
          {/* ✅ Logout Button */}
          <Nav className="ms-auto">
            <Button variant="outline-light" onClick={logout}>
              <i className="fas fa-sign-out-alt me-2"></i>Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
