import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

// Create a context for the borrowing cart
const BorrowingCartContext = createContext();

// Maximum number of books a user can borrow
const MAX_BORROWING_LIMIT = 2;

// Create a provider component
export const BorrowingCartProvider = ({ children }) => {
  const [borrowingCart, setBorrowingCart] = useState([]);
  const { currentUser } = useAuth();

  // Get user-specific cart key
  const getCartKey = () => `borrowingCart_${currentUser?.id || ''}`;

  // Load cart from localStorage on mount or when user changes
  useEffect(() => {
    if (currentUser) {
      const storedCart = localStorage.getItem(getCartKey());
      if (storedCart) {
        try {
          const parsedCart = JSON.parse(storedCart);
          setBorrowingCart(parsedCart);
        } catch (error) {
          console.error('Error parsing cart data:', error);
          setBorrowingCart([]);
        }
      } else {
        setBorrowingCart([]);
      }
    } else {
      setBorrowingCart([]);
    }
  }, [currentUser]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (currentUser && borrowingCart.length > 0) {
      localStorage.setItem(getCartKey(), JSON.stringify(borrowingCart));
    }
  }, [borrowingCart, currentUser]);

  // Add a book to the cart
  const addToCart = (book) => {
    if (!currentUser) {
      return { success: false, message: "You must be logged in to borrow books" };
    }

    // Check if user has reached borrowing limit
    if (borrowingCart.length >= MAX_BORROWING_LIMIT) {
      return { success: false, message: `You can only borrow up to ${MAX_BORROWING_LIMIT} books at a time` };
    }

    // Check if book is available and not already in cart
    if (book.availableCopies > 0 && !borrowingCart.some(item => item._id === book._id)) {
      const updatedCart = [...borrowingCart, book];
      setBorrowingCart(updatedCart);
      return { success: true };
    }
    
    return { success: false, message: "This book is not available or already in your cart" };
  };

  // Remove a book from the cart
  const removeFromCart = (bookId) => {
    const updatedCart = borrowingCart.filter(book => book._id !== bookId);
    setBorrowingCart(updatedCart);
    if (updatedCart.length === 0) {
      localStorage.removeItem(getCartKey());
    }
  };

  // Check if a book is in the cart
  const isInCart = (bookId) => {
    return borrowingCart.some(book => book._id === bookId);
  };

  // Check if user has reached borrowing limit
  const hasReachedBorrowingLimit = () => {
    return borrowingCart.length >= MAX_BORROWING_LIMIT;
  };

  // Clear the cart
  const clearCart = () => {
    setBorrowingCart([]);
    if (currentUser) {
      localStorage.removeItem(getCartKey());
    }
  };

  return (
    <BorrowingCartContext.Provider 
      value={{ 
        borrowingCart, 
        addToCart, 
        removeFromCart, 
        isInCart,
        hasReachedBorrowingLimit,
        clearCart,
        cartCount: borrowingCart.length,
        maxBorrowingLimit: MAX_BORROWING_LIMIT
      }}
    >
      {children}
    </BorrowingCartContext.Provider>
  );
};

// Custom hook to use the borrowing cart context
export const useBorrowingCart = () => {
  const context = useContext(BorrowingCartContext);
  if (!context) {
    throw new Error('useBorrowingCart must be used within a BorrowingCartProvider');
  }
  return context;
};

export default BorrowingCartContext; 