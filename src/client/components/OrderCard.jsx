import React, { useState } from 'react';
import styled from 'styled-components';

const Card = styled.div`
  border: 1px solid #ddd;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  transition: all 0.3s;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Info = styled.div`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const ToggleButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const ProductList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 1rem;
  border-top: 1px dashed #ccc;
  padding-top: 1rem;
`;

const ProductItem = styled.li`
  margin-bottom: 0.75rem;
`;

const ProductName = styled.div`
  font-weight: bold;
`;

const ProductDetail = styled.div`
  color: #555;
  font-size: 0.9rem;
`;

const OrderCard = ({ order }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card>
      <Header>
        <Info><strong>Order ID:</strong> {order.orderId}</Info>
        <Info><strong>Status:</strong> {order.status}</Info>
        <Info><strong>Total:</strong> ₹{order.totalPrice}</Info>
        <Info><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</Info>
      </Header>

      <ToggleButton onClick={() => setShowDetails(prev => !prev)}>
        {showDetails ? 'Hide Details' : 'View Details'}
      </ToggleButton>

      {showDetails && order.products && (
        <ProductList>
          {order.products.map((product, index) => (
            <ProductItem key={index}>
              <ProductName>{product.product.name}</ProductName>
              <ProductDetail>Quantity: {product.quantity}</ProductDetail>
              <ProductDetail>Price: ₹{product.price}</ProductDetail>
            </ProductItem>
          ))}
        </ProductList>
      )}
    </Card>
  );
};

export default OrderCard;
