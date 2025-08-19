import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
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
  display: grid;
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

// --- CATEGORY HELPERS ---
const CATEGORY_KEYS = new Set([
  'BEAUTY','CAFE','ELECTRONICS','FASHION','FRESH','HOME','MOBILES','TOYS'
]);

const norm = (c) => (c ?? '').toString().trim().toUpperCase();
const slug = (c) => norm(c).toLowerCase(); // e.g. "FRESH" -> "fresh"
const pretty = (c) => {
  const s = slug(c);
  return s.charAt(0).toUpperCase() + s.slice(1);
};

// --- COMPONENT ---
const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  const location = useLocation();
  const { category: paramCategory } = useParams(); // /products/:category (slug form)

  // Parse search params
  const params = new URLSearchParams(location.search);
  const q = (params.get('q') || '').trim().toLowerCase();
  const queryCategory = norm(params.get('category')); // supports /products?category=FRESH

  // Active category preference: route param > query param
  const activeCategory = paramCategory ? norm(paramCategory) : queryCategory;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        const mapped = data.map((p) => ({
          id: p.productId,
          name: p.name,
          price: p.price,
          description: p.description || '',
          // ⬇️ use backend category as-is (e.g., "FRESH")
          category: norm(p.category),
          imageUrl: p.images?.[0]
            ? `http://52.66.243.195:8080${p.images[0]}`
            : 'https://placehold.co/600x400?text=No+Image',
        }));
        setProducts(mapped);
      } catch (err) {
        console.error(err);
        setError('Failed to load products');
      }
    };
    fetchProducts();
  }, []);

  // Derived list
  const filtered = useMemo(() => {
    let list = products;

    // Filter by category first if provided
    if (activeCategory && CATEGORY_KEYS.has(activeCategory) && activeCategory !== 'ALL') {
      list = list.filter(p => p.category === activeCategory);
    }

    // Then apply search (?q=)
    if (q) {
      const words = q.split(/\s+/).filter(Boolean);
      list = list.filter(p => {
        const hay = `${p.name} ${p.description}`.toLowerCase();
        return words.every(w => hay.includes(w));
      });
    }

    return list;
  }, [products, activeCategory, q]);

  // Title
  const title =
    q
      ? `Search: "${q}"`
      : (activeCategory && CATEGORY_KEYS.has(activeCategory) && activeCategory !== 'ALL')
        ? pretty(activeCategory)
        : 'All Products';

  return (
    <PageWrapper>
      <CategoryTitle>{title}</CategoryTitle>

      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : filtered.length === 0 ? (
        <p style={{ textAlign: 'center', paddingBottom: '2rem' }}>
          No products found{q ? ` for "${q}"` : ''}.
        </p>
      ) : (
        <GridContainer>
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </GridContainer>
      )}
    </PageWrapper>
  );
};

export default ProductListPage;

