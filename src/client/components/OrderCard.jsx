// import React from 'react';
// import styled from 'styled-components';
// import { Link } from 'react-router-dom';

// const CardContainer = styled.div`
//   background: white;
//   border: 1px solid #e0e0e0;
//   border-radius: 12px;
//   padding: 1.5rem;
//   box-shadow: 0 4px 8px rgba(0,0,0,0.05);
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
//   gap: 1rem;
//   align-items: center;

//   @media (min-width: 600px) {
//     grid-template-columns: repeat(4, 1fr);
//     text-align: center;
//   }
// `;

// const InfoBlock = styled.div`
//   font-size: 0.9rem;
//   color: #555;

//   span {
//     display: block;
//     font-weight: bold;
//     color: #333;
//     font-size: 1rem;
//     margin-top: 4px;
//   }
// `;

// const Status = styled.span`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 0.5rem;
//   color: ${({ status }) => {
//     switch (status) {
//       case 'Delivered':
//         return '#28a745'; // Green
//       case 'Processing':
//         return '#ffc107'; // Yellow
//       case 'Cancelled':
//         return '#dc3545'; // Red
//       default:
//         return '#333';
//     }
//   }};
//   font-weight: bold;
// `;

// const ViewDetailsLink = styled(Link)`
//   font-weight: bold;
//   color: #007bff;
//   text-decoration: none;
//   &:hover {
//     text-decoration: underline;
//   }
// `;

// const CheckIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
//     <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
//   </svg>
// );

// const OrderCard = ({ order }) => {
//   if (!order) return null;

//   return (
//     <CardContainer>
//       <InfoBlock>
//         Order ID
//         <span>{order.orderId}</span>
//       </InfoBlock>
//       <InfoBlock>
//         Date
//         <span>{new Date(order.createdAt).toLocaleString()}</span>
//       </InfoBlock>
//       <InfoBlock>
//         Status
//         <Status status={order.status}>
//           {order.status}
//           {order.status === 'Delivered' && <CheckIcon />}
//         </Status>
//       </InfoBlock>
//       <InfoBlock>
//         Items
//         <span>{order.items?.length ?? 0}</span>
//         <ViewDetailsLink to={`/orders/${String(order.orderId).replace('#', '')}`}>
//           [View Details]
//         </ViewDetailsLink>
//       </InfoBlock>
//     </CardContainer>
//   );
// };

// export default OrderCard;

// src/components/OrderCard.jsx
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
              <ProductName>{product.name}</ProductName>
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
