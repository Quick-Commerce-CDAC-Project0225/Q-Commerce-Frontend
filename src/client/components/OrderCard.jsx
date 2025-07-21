import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const CardContainer = styled.div`
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 8px rgba(0,0,0,0.05);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  align-items: center;

  @media (min-width: 600px) {
    grid-template-columns: repeat(4, 1fr);
    text-align: center;
  }
`;

const InfoBlock = styled.div`
  font-size: 0.9rem;
  color: #555;

  span {
    display: block;
    font-weight: bold;
    color: #333;
    font-size: 1rem;
    margin-top: 4px;
  }
`;

const Status = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: ${({ status }) => {
    switch (status) {
      case 'Delivered':
        return '#28a745'; // Green
      case 'Processing':
        return '#ffc107'; // Yellow
      case 'Cancelled':
        return '#dc3545'; // Red
      default:
        return '#333';
    }
  }};
  font-weight: bold;
`;

const ViewDetailsLink = styled(Link)`
  font-weight: bold;
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
    </svg>
);


const OrderCard = ({ order }) => {
  return (
    <CardContainer>
      <InfoBlock>
        Order ID
        <span>{order.id}</span>
      </InfoBlock>
      <InfoBlock>
        Date
        <span>{order.date}</span>
      </InfoBlock>
      <InfoBlock>
        Status
        <Status status={order.status}>
            {order.status}
            {order.status === 'Delivered' && <CheckIcon />}
        </Status>
      </InfoBlock>
      <InfoBlock>
        Items
        <span>{order.itemCount}</span>
        <ViewDetailsLink to={`/orders/${order.id.replace('#', '')}`}>
          [View Details]
        </ViewDetailsLink>
      </InfoBlock>
    </CardContainer>
  );
};

export default OrderCard;
