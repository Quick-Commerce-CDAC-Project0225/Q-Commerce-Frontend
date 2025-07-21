import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import styled from 'styled-components';

// --- Dummy Product Data ---
// In a real application, this data would be fetched from your backend.
const allProducts = {
  'all': [
    { id: 1, name: 'Espresso Machine', price: 199.99, imageUrl: 'https://placehold.co/600x400/E2D6C8/4F3A2B?text=Espresso+Machine' },
    { id: 2, name: 'Plush Toy Robot', price: 24.99, imageUrl: 'https://placehold.co/600x400/D8E2E7/334E5E?text=Toy+Robot' },
    { id: 3, name: 'Organic Apples', price: 4.99, imageUrl: 'https://placehold.co/600x400/F0E4E4/8B4513?text=Apples' },
    { id: 4, name: 'Wireless Headphones', price: 89.99, imageUrl: 'https://placehold.co/600x400/333333/FFFFFF?text=Headphones' },
  ],
  'cafe': [
    { id: 1, name: 'Espresso Machine', price: 199.99, imageUrl: 'https://placehold.co/600x400/E2D6C8/4F3A2B?text=Espresso+Machine' },
    { id: 5, name: 'Coffee Grinder', price: 45.50, imageUrl: 'https://placehold.co/600x400/E2D6C8/4F3A2B?text=Grinder' },
    { id: 6, name: 'Artisan Coffee Beans', price: 18.99, imageUrl: 'https://placehold.co/600x400/E2D6C8/4F3A2B?text=Coffee+Beans' },
  ],
  'toys': [
    { id: 2, name: 'Plush Toy Robot', price: 24.99, imageUrl: 'https://placehold.co/600x400/D8E2E7/334E5E?text=Toy+Robot' },
    { id: 7, name: 'Wooden Block Set', price: 35.00, imageUrl: 'https://placehold.co/600x400/D8E2E7/334E5E?text=Blocks' },
    { id: 8, name: 'Remote Control Car', price: 49.99, imageUrl: 'https://placehold.co/600x400/D8E2E7/334E5E?text=RC+Car' },
  ],
  'fresh': [
      { id: 3, name: 'Organic Apples', price: 4.99, imageUrl: 'https://placehold.co/600x400/F0E4E4/8B4513?text=Apples' },
      { id: 9, name: 'Fresh Oranges', price: 5.99, imageUrl: 'https://placehold.co/600x400/F0E4E4/8B4513?text=Oranges' },
      { id: 10, name: 'Avocados (3-pack)', price: 6.50, imageUrl: 'https://placehold.co/600x400/F0E4E4/8B4513?text=Avocados' },
  ]
};

// --- STYLED COMPONENTS ---

// FIX: This wrapper component is added to ensure the page content has space to expand.
const PageWrapper = styled.div`
  width: 100%;
  max-width: 1200px; /* Sets a maximum width for very large screens */
  margin: 0 auto; /* Centers the content horizontally */
  padding: 0 1rem; /* Adds some space on the sides */
  box-sizing: border-box; /* Ensures padding doesn't add to the total width */
`;

const GridContainer = styled.div`
  display: flex;
  /* This CSS creates the responsive grid. It was correct before. */
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  padding: 1rem 0 2rem 0; /* Vertical padding */
`;

const CategoryTitle = styled.h1`
    text-align: center;
    padding-top: 160px; /* Adjust based on your fixed navbar's height */
    margin-bottom: 1rem;
    text-transform: capitalize;
`;

// --- COMPONENT ---

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const pathParts = location.pathname.split('/');
    const category = pathParts[2] || 'all';
    setProducts(allProducts[category] || allProducts['all']);
  }, [location]);

  const categoryName = location.pathname.split('/')[2] || 'All Products';

  return (
    // FIX: The content is now wrapped in PageWrapper
    <PageWrapper>
      <CategoryTitle>{categoryName}</CategoryTitle>
      <GridContainer>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </GridContainer>
    </PageWrapper>
  );
};

export default ProductListPage;
