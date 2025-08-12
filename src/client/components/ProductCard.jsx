import React, { useState } from 'react';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';  // Assuming you have a CartContext
import { Link } from 'react-router-dom';

const CardContainer = styled.div`
  border: 1px solid #eee;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s, box-shadow 0.2s;
  background: white;
  display: flex;
  flex-direction: column;
  cursor: pointer; /* Make entire card clickable */

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
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
  flex-grow: 1;
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
  margin-top: auto;

  &:hover {
    background-color: #218838;
  }
`;

const GoToCartButton = styled(AddToCartButton)`
  background-color: #ffc107; /* Yellow */
  color: #212529; /* Dark text for better contrast */

  &:hover {
    background-color: #e0a800;
  }
`;

const ProductCard = ({ product }) => {
  const { addItem, items } = useCart();
  const [showDescription, setShowDescription] = useState(false);  // State to toggle between image and description

  const handleAddToCart = () => {
    addItem(product);
    console.log(`${product.name} added to cart!`);
  };

  const isInCart = items.some(item => item.product.id === product.id);

  // Toggle between image and description
  const handleToggleContent = () => {
    setShowDescription(prev => !prev);
  };

  return (
    <CardContainer>
      {/* The image is clickable and toggles between image and description */}
      <ProductImage
        src={product.imageUrl}
        alt={product.name}
        onClick={handleToggleContent} // Toggle on image click
      />

      <ProductInfo>
        {/* If showDescription is true, show description, otherwise show image, name, price */}
        {!showDescription ? (
          <>
            <ProductName>{product.name}</ProductName>
            <ProductPrice>{"\u20B9"}{product.price.toFixed(2)}</ProductPrice>
            {isInCart ? (
              <GoToCartButton as={Link} to="/cart">
                Go to Cart
              </GoToCartButton>
            ) : (
              <AddToCartButton onClick={handleAddToCart}>
                Add to Cart
              </AddToCartButton>
            )}
          </>
        ) : (
          // If description is toggled, show description
          <p>{product.description}</p>
        )}
      </ProductInfo>
    </CardContainer>
  );
};

export default ProductCard;
