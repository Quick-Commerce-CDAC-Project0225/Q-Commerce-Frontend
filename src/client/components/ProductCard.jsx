import React from 'react';
import styled from 'styled-components';
import { useCart } from '../context/CartContext'; // CORRECTED: Import the context hook
import { Link } from 'react-router-dom';

const CardContainer = styled.div`
  border: 1px solid #eee;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  background: white;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0,0,0,0.2);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* Makes this div take up remaining space */
`;

const ProductName = styled.h3`
  font-size: 1.2rem;
  margin: 0 0 0.5rem 0;
  color: #333;
`;

const ProductPrice = styled.p`
  font-size: 1.1rem;
  font-weight: bold;
  color: #007bff;
  margin: 0 0 1rem 0;
`;

const AddToCartButton = styled.button`
  width: 100%;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  background-color: #28a745; /* Green */
  color: white;
  transition: background-color 0.2s;
  margin-top: auto; /* Pushes the button to the bottom */

  &:hover {
    background-color: #218838;
  }
`;

// New styled component for the "Go to Cart" button
const GoToCartButton = styled(AddToCartButton)`
  background-color: #ffc107; /* Yellow */
  color: #212529; /* Dark text for better contrast */
  text-decoration: none;
  display: inline-block;
  text-align: center;

  &:hover {
    background-color: #e0a800;
  }
`;


const ProductCard = ({ product }) => {
  // Get both addItem and the items array from the context
  const { addItem, items } = useCart();

  const handleAddToCart = () => {
    addItem(product);
    console.log(`${product.name} added to cart!`);
  };

  // Check if the current product is already in the cart
  const isInCart = items.some(item => item.product.id === product.id);

  return (
    <CardContainer>
      <Link to={`/products/${product.id}`}>
        <ProductImage src={product.imageUrl} alt={product.name} />
      </Link>
      <ProductInfo>
        <ProductName>{product.name}</ProductName>
        <ProductPrice>{"\u20B9"}{product.price.toFixed(2)}</ProductPrice>
        
        {/* Conditionally render the button based on whether the item is in the cart */}
        {isInCart ? (
          <GoToCartButton as={Link} to="/cart">
            Go to Cart
          </GoToCartButton>
        ) : (
          <AddToCartButton onClick={handleAddToCart}>
            Add to Cart
          </AddToCartButton>
        )}
      </ProductInfo>
    </CardContainer>
  );
};

export default ProductCard;
