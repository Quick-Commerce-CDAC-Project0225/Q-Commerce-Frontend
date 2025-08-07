import React from 'react';
import { useCart } from '../context/CartContext'; 
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

const CartContainer = styled.div`
  padding: 2rem;
  padding-top: 150px;
  max-width: 900px;
  margin: 0 auto;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding: 1rem 0;
  flex-wrap: wrap;
`;

const ItemDetails = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 1rem;
  border-radius: 8px;
`;

const ItemName = styled.h4`
  margin: 0;
`;

const ItemControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 10px;
  margin-left: auto;
`;

const QuantityInput = styled.input`
  width: 50px;
  text-align: center;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const RemoveButton = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;

const CartSummary = styled.div`
  margin-top: 2rem;
  text-align: right;
`;

const EmptyCartMessage = styled.div`
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  padding: 2rem;
`;

const CheckoutButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #0056b3;
  }
`;

const CartPage = () => {
  const { items, getCartTotal, updateQuantity, removeItem, clearCart } = useCart();
  const navigate = useNavigate();

  const handleProceedToCheckout = () => {
    const defaultAddress = {
      type: 'Home',
      address: '123 Sample Street, City, Country'
    };

    navigate('/place-order', {
      state: {
        selectedAddress: defaultAddress,
        cart: items
      }
    });
  };

  if (items.length === 0) {
    return (
      <CartContainer>
        <EmptyCartMessage>
          <h2>Your cart is empty.</h2>
          <Link to="/products/all">Go find something great!</Link>
        </EmptyCartMessage>
      </CartContainer>
    );
  }

  return (
    <CartContainer>
      <h2>Your Shopping Cart</h2>
      <div>
        {items.map(item => (
          <CartItem key={item.product.id}>
            <ItemDetails>
              <ItemImage src={item.product.imageUrl} alt={item.product.name} />
              <ItemName>{item.product.name}</ItemName>
            </ItemDetails>
            <ItemControls>
              <span>{"\u20B9"}{(item.product.price * item.quantity).toFixed(2)}</span>
              <QuantityInput
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item.product.id, parseInt(e.target.value))
                }
                min="1"
              />
              <RemoveButton onClick={() => removeItem(item.product.id)}>Remove</RemoveButton>
            </ItemControls>
          </CartItem>
        ))}
      </div>
      <CartSummary>
        <h3>Total: {"\u20B9"} {getCartTotal().toFixed(2)}</h3>
        <button onClick={clearCart} style={{ marginRight: '1rem' }}>
          Clear Cart
        </button>
        <CheckoutButton onClick={handleProceedToCheckout}>Proceed to Checkout</CheckoutButton>
      </CartSummary>
    </CartContainer>
  );
};

export default CartPage;
