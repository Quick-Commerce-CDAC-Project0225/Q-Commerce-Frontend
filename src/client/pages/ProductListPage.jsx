import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import styled from 'styled-components';
import { getAllProducts } from '../services/productService';

// --- STYLED COMPONENTS ---
const PageWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  box-sizing: border-box;
`;

const GridContainer = styled.div`
  display: grid; /* use grid instead of flex */
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  padding: 1rem 0 2rem 0;
`;

const CategoryTitle = styled.h1`
  text-align: center;
  padding-top: 160px;
  margin-bottom: 1rem;
  text-transform: capitalize;
`;

// --- COMPONENT ---
const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        const mapped = data.map((p) => ({
          id: p.productId,
          name: p.name,
          price: p.price,
          imageUrl: p.images?.[0] ? `http://localhost:8080${p.images[0]}` : 'https://placehold.co/600x400?text=No+Image',
        }));
        setProducts(mapped);
      } catch (err) {
        console.error(err);
        setError('Failed to load products');
      }
    };
    fetchProducts();
  }, []);

  const categoryName = location.pathname.split('/')[2] || 'All Products';

  return (
    <PageWrapper>
      <CategoryTitle>{categoryName}</CategoryTitle>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <GridContainer>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </GridContainer>
      )}
    </PageWrapper>
  );
};

export default ProductListPage;
