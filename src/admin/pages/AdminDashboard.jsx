// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Your enum categories are static:
const CATEGORY_ENUM = [
  'BEAUTY','CAFE','ELECTRONICS','FASHION','FRESH','HOME','MOBILES','TOYS'
];
const CATEGORIES_COUNT = CATEGORY_ENUM.length;

// Try to extract a total count from various backend shapes
function extractCount(payload) {
  // Common paginated shapes
  if (payload && Number.isFinite(payload.totalElements)) return payload.totalElements;
  if (payload?.data && Number.isFinite(payload.data.totalElements)) return payload.data.totalElements;

  // Arrays wrapped in { data: [...] }
  if (Array.isArray(payload?.data)) return payload.data.length;

  // Spring Page<T> shape: { content: [...], totalElements: N }
  if (Array.isArray(payload?.content)) {
    return Number.isFinite(payload.totalElements) ? payload.totalElements : payload.content.length;
  }

  // Bare array
  if (Array.isArray(payload)) return payload.length;

  return 0;
}

// Conservative fetcher:
// 1) Try minimal payload with page=1&size=1 to read totalElements,
// 2) If that fails to reveal a count, fallback to full call once.
async function fetchCount(url) {
  const opts = { withCredentials: true };

  // Try light call first
  try {
    const u = url.includes('?') ? `${url}&page=1&size=1` : `${url}?page=1&size=1`;
    const { data } = await axios.get(u, opts);
    const c = extractCount(data);
    if (c > 0) return c;
  } catch (_) { /* ignore and fallback */ }

  // Fallback to base URL
  const { data } = await axios.get(url, opts);
  return extractCount(data);
}

export default function AdminDashboard() {
  const [counts, setCounts] = useState({
    inventory: 0,
    warehouses: 0,
    categories: CATEGORIES_COUNT, // static
    products: 0,
    customers: 0,
    orders: 0,
  });
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    let alive = true;

    (async () => {
      setErr('');
      setLoading(true);
      try {
        const [
          customers,
          inventory,
          orders,
          products,
          warehouses,
        ] = await Promise.all([
          fetchCount('http://52.66.243.195:8080/api/v1/users/customers'),
          fetchCount('http://52.66.243.195:8080/api/v1/inventory'),
          fetchCount('http://52.66.243.195:8080/api/v1/orders'),
          fetchCount('http://52.66.243.195:8080/api/v1/products'),
          fetchCount('http://52.66.243.195:8080/api/v1/warehouses'),
        ]);

        if (!alive) return;
        setCounts({
          customers,
          inventory,
          orders,
          products,
          warehouses,
          categories: CATEGORIES_COUNT,
        });
      } catch (e) {
        console.error(e);
        if (!alive) return;
        setErr('Failed to load dashboard stats.');
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => { alive = false; };
  }, []);

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" role="status" />
      </Container>
    );
  }

  const cards = [
    { title: 'Inventory',       count: counts.inventory,  to: '/admin/manage-inventory', variant: 'primary',   border: 'border-primary' },
    { title: 'Warehouses',      count: counts.warehouses, to: '/admin/manage-store',     variant: 'secondary', border: 'border-secondary' },
    { title: 'Categories',      count: counts.categories, to: '/admin/manage-category',  variant: 'success',   border: 'border-success' },
    { title: 'Products',        count: counts.products,   to: '/admin/manage-product',   variant: 'dark',      border: 'border-dark' },
    { title: 'Customers',       count: counts.customers,  to: '/admin/manage-customer',  variant: 'info',      border: 'border-info' },
    { title: 'Orders',          count: counts.orders,     to: '/admin/manage-order',     variant: 'warning',   border: 'border-warning' },
  ];

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Admin Dashboard</h1>
      {err && <Alert variant="danger">{err}</Alert>}

      <Row className="gy-4">
        {cards.map(({ title, count, to, variant, border }) => (
          <Col md={6} lg={3} key={title}>
            <Card className={`h-100 shadow-sm ${border}`}>
              <Card.Body className="d-flex flex-column">
                <Card.Title>{title}</Card.Title>
                <Card.Text className="flex-grow-1">
                  Total {title.toLowerCase()}: {count}
                </Card.Text>
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
