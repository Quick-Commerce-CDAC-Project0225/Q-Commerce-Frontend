import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. Create the context
const CartContext = createContext();

// A helper function to get cart data from localStorage
const getInitialCart = () => {
    try {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
        console.error("Failed to parse cart from localStorage", error);
        return [];
    }
};


// 2. Create the Provider component
export const CartProvider = ({ children }) => {
    const [items, setItems] = useState(getInitialCart);

    // Persist cart to localStorage whenever items change
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items));
    }, [items]);

    const addItem = (product) => {
        setItems(prevItems => {
            const existingItem = prevItems.find(item => item.product.id === product.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevItems, { product, quantity: 1 }];
        });
    };

    const removeItem = (productId) => {
        setItems(prevItems => prevItems.filter(item => item.product.id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity < 1) {
            removeItem(productId);
            return;
        }
        setItems(prevItems =>
            prevItems.map(item =>
                item.product.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    const getCartTotal = () => {
        return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
    };

    const getItemCount = () => {
        return items.reduce((total, item) => total + item.quantity, 0);
    };

    // The value that will be supplied to all consuming components
    const value = {
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getCartTotal,
        getItemCount,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

// 3. Create a custom hook for easy consumption of the context
export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
