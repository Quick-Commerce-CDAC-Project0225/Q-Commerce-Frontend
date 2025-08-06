import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';

// To make the cart count dynamic, you would import your state management hook
// import { useCartStore } from '../../store/cartStore';
import './Navbar.css'; // For any additional custom styling

const Navbar = () => {
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  // CORRECTED: The href for 'All' now matches the routing pattern.
  const categories = [
    { name: 'All', icon: 'fas fa-store', href: '/products/all' },
    { name: 'Cafe', icon: 'fas fa-mug-hot', href: '/products/cafe' },
    { name: 'Home', icon: 'fas fa-home', href: '/products/home' },
    { name: 'Toys', icon: 'fas fa-puzzle-piece', href: '/products/toys' },
    { name: 'Fresh', icon: 'fas fa-apple-alt', href: '/products/fresh' },
    { name: 'Electronics', icon: 'fas fa-headphones', href: '/products/electronics' },
    { name: 'Mobiles', icon: 'fas fa-mobile-alt', href: '/products/mobiles' },
    { name: 'Beauty', icon: 'fas fa-spray-can', href: '/products/beauty' },
    { name: 'Fashion', icon: 'fas fa-tshirt', href: '/products/fashion' }
  ];

  return (
    <header className="fixed-top">
      {/* Top Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm py-2">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold text-primary" to="/">
            Quick Mart
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded={!isNavCollapsed}
            aria-label="Toggle navigation"
            onClick={handleNavCollapse}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarContent">
            <form className="d-flex flex-grow-1 mx-lg-3 my-2 my-lg-0">
              <input
                className="form-control me-2"
                type="search"
                placeholder='Search for "chocolate box"'
                aria-label="Search"
              />
              <button className="btn btn-outline-primary" type="submit">
                <i className="fas fa-search"></i>
              </button>
            </form>

            <div className="navbar-nav ms-lg-auto d-flex flex-row align-items-center gap-3">
              <Link to="/login" className="nav-link text-dark">
                <i className="fas fa-user me-1"></i> Login
              </Link>
              <Link to="/cart" className="nav-link text-dark position-relative">
                <i className="fas fa-shopping-cart"></i>
                {itemCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {itemCount}
                    <span className="visually-hidden">items in cart</span>
                  </span>
                )}
                <span className="ms-1 d-lg-none">Cart</span>
              </Link>
            </div>
            
            {/* Categories for Mobile View */}
            <ul className="navbar-nav d-lg-none mt-3 border-top pt-2">
              <li className="nav-item-text text-muted small">Categories</li>
              {categories.map((category) => (
                <li className="nav-item" key={category.name}>
                  {/* CORRECTED: Use NavLink instead of <a> */}
                  <NavLink className="nav-link" to={category.href} onClick={() => setIsNavCollapsed(true)}>
                    <i className={`${category.icon} me-2`}></i>{category.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Bottom Category Menu (Desktop Only) */}
      <div className="bg-white shadow-sm py-2 border-top d-none d-lg-flex">
        <div className="container-fluid d-flex flex-wrap gap-4 justify-content-center">
          {categories.map((category) => (
            // CORRECTED: Use NavLink instead of <a>
            <NavLink 
              to={category.href} 
              key={category.name} 
              className="text-secondary text-decoration-none category-item"
            >
              <i className={`${category.icon} me-1`}></i>{category.name}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
