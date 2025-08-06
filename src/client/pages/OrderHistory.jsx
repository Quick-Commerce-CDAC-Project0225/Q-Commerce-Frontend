import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import OrderCard from '../components/OrderCard'; // Assuming this path

// --- Dummy Data ---
// In a real app, this would be fetched from a service based on the logged-in user.
const dummyOrders = [
  {
    id: '#123456',
    date: '24-Apr-2025',
    status: 'Delivered',
    itemCount: 3,
  },
  {
    id: '#123457',
    date: '22-Apr-2025',
    status: 'Processing',
    itemCount: 1,
  },
  {
    id: '#123458',
    date: '20-Apr-2025',
    status: 'Cancelled',
    itemCount: 5,
  },
    {
    id: '#123459',
    date: '15-Apr-2025',
    status: 'Delivered',
    itemCount: 2,
  },
];

// --- Styled Components ---
const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
  padding-top: 120px; /* Adjust for navbar */
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
`;

const SearchContainer = styled.div`
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 12px 20px;
  font-size: 16px;
  border-radius: 25px;
  border: 1px solid #ccc;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const OrderListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;


const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching data
  useEffect(() => {
    // In a real app, you would call a service here
    // e.g., orderService.getOrderHistory().then(data => setOrders(data));
    setOrders(dummyOrders);
    setLoading(false);
  }, []);

  if (loading) {
    return <PageContainer><p>Loading order history...</p></PageContainer>
  }

  return (
    <PageContainer>
      <Title>Order History</Title>
      <SearchContainer>
        <SearchInput type="text" placeholder="Search by Order ID or Product..." />
      </SearchContainer>
      <OrderListContainer>
        {orders.map(order => (
          <OrderCard key={order.id} order={order} />
        ))}
      </OrderListContainer>
    </PageContainer>
  );
};

export default OrderHistoryPage;
