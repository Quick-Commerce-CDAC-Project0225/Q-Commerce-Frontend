// import React, { useEffect, useState } from 'react';
// import OrderCard from '../components/OrderCard';
// import { useNavigate } from 'react-router-dom';
// import styled from 'styled-components';
// import { getMyOrders } from '../services/orderService';
// import { useAuth } from '../context/AuthContext';

// const PageContainer = styled.div`
//   max-width: 900px;
//   margin: 0 auto;
//   padding: 1rem;
//   padding-top: 100px;
// `;

// const Title = styled.h1`
//   font-size: 2rem;
//   font-weight: bold;
//   margin-bottom: 2rem;
//   text-align: center;
// `;

// const OrderListContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 1.5rem;
// `;

// const Message = styled.p`
//   text-align: center;
//   font-size: 1rem;
//   color: ${({ error }) => (error ? 'red' : '#555')};
// `;

// const OrderHistoryPage = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     if (user === false) {
//       navigate('/login');
//     } else if (user) {
//       fetchOrders();
//     }
//   }, [user]);

//   const fetchOrders = async () => {
//     try {
//       const data = await getMyOrders();
//       console.log('Fetched orders:', data);
//       setOrders(data.data || []);
//     } catch (err) {
//       setError('Failed to load your orders. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <PageContainer>
//       <Title>My Orders</Title>

//       {loading && <Message>Loading order history...</Message>}

//       {error && <Message error>{error}</Message>}

//       {!loading && !error && (
//         <OrderListContainer>
//           {orders.length === 0 ? (
//             <Message>No orders found.</Message>
//           ) : (
//             orders.map(order => <OrderCard key={order.id} order={order} />)
//           )}
//         </OrderListContainer>
//       )}
//     </PageContainer>
//   );
// };

// export default OrderHistoryPage;
// src/pages/OrderHistoryPage.jsx
import React, { useEffect, useState } from 'react';
import OrderCard from '../components/OrderCard';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getMyOrders } from '../services/orderService';
import { useAuth } from '../context/AuthContext';

const PageContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 1rem;
  padding-top: 100px;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: center;
`;

const OrderListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Message = styled.p`
  text-align: center;
  font-size: 1rem;
  color: ${({ error }) => (error ? 'red' : '#555')};
`;

const OrderHistoryPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user === false) {
      navigate('/login');
    } else if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const response = await getMyOrders();
      const data = response.data || [];

      // Ensure each order has a "products" array (you may need to adjust this mapping if API structure differs)
      const ordersWithProducts = data.map(order => ({
        ...order,
        products: order.orderDetails || order.items || [], // fallback
      }));

      setOrders(ordersWithProducts);
    } catch (err) {
      setError('Failed to load your orders. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <Title>My Orders</Title>

      {loading && <Message>Loading order history...</Message>}

      {error && <Message error>{error}</Message>}

      {!loading && !error && (
        <OrderListContainer>
          {orders.length === 0 ? (
            <Message>No orders found.</Message>
          ) : (
            orders.map(order => <OrderCard key={order.id} order={order} />)
          )}
        </OrderListContainer>
      )}
    </PageContainer>
  );
};

export default OrderHistoryPage;
