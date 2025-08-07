// src/pages/Home.jsx
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';// For internal navigation without page reloads

// Home component for the admin interface
export default function Home() {
  return (

    <Container className="my-5">
      {/* Subtext description */}
      <h1 className="text-center mb-4">Welcome to QuickCommerce Admin</h1>

      {/* Subtext description */}
      <p className="lead text-center mb-5">
        Manage everything—inventory, areas, categories, products, customers, and orders.
      </p>
      <Row className="gy-4">
        {/* Inventory */}
        <Col md={6} lg={3}>
          <Card className="h-100 shadow-sm">
            <Card.Body className="d-flex flex-column">
              <Card.Title>Inventory</Card.Title>
              <Card.Text className="flex-grow-1">
                Add, edit, or remove items across your dark stores.
              </Card.Text>
              <Button as={Link} to="/manage-inventory" variant="primary">
                Go to Inventory
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* delivery Areas */}
        <Col md={6} lg={3}>
          <Card className="h-100 shadow-sm">
            <Card.Body className="d-flex flex-column">
              <Card.Title>Delivery Areas</Card.Title>
              <Card.Text className="flex-grow-1">
                Define and manage delivery coverage for each store.
              </Card.Text>
              <Button as={Link} to="/manage-area" variant="secondary">
                Go to Areas
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Categories */}
        <Col md={6} lg={3}>
          <Card className="h-100 shadow-sm">
            <Card.Body className="d-flex flex-column">
              <Card.Title>Categories</Card.Title>
              <Card.Text className="flex-grow-1">
                Organize products by category for easier navigation.
              </Card.Text>
              <Button as={Link} to="/manage-category" variant="success">
                Go to Categories
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/*Products*/}
        <Col md={6} lg={3}>
          <Card className="h-100 shadow-sm">
            <Card.Body className="d-flex flex-column">
              <Card.Title>Products</Card.Title>
              <Card.Text className="flex-grow-1">
                Add new products, update details, and keep your catalog fresh.
              </Card.Text>
              <Button as={Link} to="/manage-product" variant="dark">
                Go to Products
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/*Customers*/}
        <Col md={6} lg={3}>
          <Card className="h-100 shadow-sm">
            <Card.Body className="d-flex flex-column">
              <Card.Title>Customers</Card.Title>
              <Card.Text className="flex-grow-1">
                View and manage your customer database and contact info.
              </Card.Text>
              <Button as={Link} to="/manage-customer" variant="info">
                Go to Customers
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/*Orders*/}
        <Col md={6} lg={3}>
          <Card className="h-100 shadow-sm">
            <Card.Body className="d-flex flex-column">
              <Card.Title>Orders</Card.Title>
              <Card.Text className="flex-grow-1">
                Track and process customer orders and their statuses.
              </Card.Text>
              <Button as={Link} to="/manage-order" variant="warning">
                Go to Orders
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}