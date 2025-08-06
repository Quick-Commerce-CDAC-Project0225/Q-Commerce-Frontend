// src/components/AdminNavbar.jsx
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function AdminNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          QuickCommerce Admin
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="admin-navbar-nav" />
        <Navbar.Collapse id="admin-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/manage-inventory">Manage Inventory</Nav.Link>
            <Nav.Link as={Link} to="/manage-area">Manage Areas</Nav.Link>
            <Nav.Link as={Link} to="/manage-category">Manage Categories</Nav.Link>
            <Nav.Link as={Link} to="/manage-product">Manage Products</Nav.Link>
            <Nav.Link as={Link} to="/manage-customer">Manage Customers</Nav.Link>
            <Nav.Link as={Link} to="/manage-order">Manage Orders</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}