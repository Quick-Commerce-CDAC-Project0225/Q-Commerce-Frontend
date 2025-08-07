// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
   // Loading state to handle spinner display before data loads
  const [counts, setCounts] = useState({
    inventory: 0,
    areas: 0,
    categories: 0,
    products: 0,
    customers: 0,
    orders: 0,
  });

  // useEffect runs once after the component mounts
  const [loading, setLoading] = useState(true);

  useEffect(() => {
     // Helper function to get and parse data from localStorage safely
    const loadCount = (key) => {
      try {
        const data = JSON.parse(localStorage.getItem(key));
        return Array.isArray(data) ? data.length : 0;
      } catch {
        return 0;
      }
    };

    // Set all entity counts from localStorage
    setCounts({
      inventory: loadCount('inventoryData'),
      areas: loadCount('areaData'),
      categories: loadCount('categoryData'),
      products: loadCount('productData'),
      customers: loadCount('customerData'),
      orders: loadCount('orderData'),
    });
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" role ="status" />
      </Container>
    );
  }
// Main dashboard UI layout
  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Admin Dashboard</h1>
      <Row className="gy-4">
        {[
          
          // src/pages/AdminDashboard.jsx
// src/pages/AdminDashboard.jsx
{ title: 'Inventory',     count: counts.inventory,  to: '/admin/manage-inventory',  variant: 'primary',   border: 'border-primary' },
{ title: 'Delivery Areas', count: counts.areas,      to: '/admin/manage-area',       variant: 'secondary', border: 'border-secondary' },
{ title: 'Categories',     count: counts.categories, to: '/admin/manage-category',   variant: 'success',   border: 'border-success' },
// { title: 'Products',       count: counts.products,   to: '/admin/manage-product',    variant: 'dark',      border: 'border-dark' },
{ title: 'Customers',      count: counts.customers,  to: '/admin/manage-customer',   variant: 'info',      border: 'border-info' },
{ title: 'Orders',         count: counts.orders,     to: '/admin/manage-order',      variant: 'warning',   border: 'border-warning' },
        ].map(({ title, count, to, variant, border }) => (
          <Col md={6} lg={3} key={title}>
            <Card className={`h-100 shadow-sm ${border}`}>
              <Card.Body className="d-flex flex-column">
                <Card.Title>{title}</Card.Title>
                <Card.Text className="flex-grow-1">Total {title.toLowerCase()}: {count}</Card.Text>
                <Button as={Link} to={to} variant={variant}>
                  Manage {title}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}