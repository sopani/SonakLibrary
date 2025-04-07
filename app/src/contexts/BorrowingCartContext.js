import React, { createContext, useState, useContext } from 'react';

// Create a context for the borrowing cart
const BorrowingCartContext = createContext();

// Maximum number of books a user can borrow
const MAX_BORROWING_LIMIT = 2;

// Create a provider component
export const BorrowingCartProvider = ({ children }) => {
  const [borrowingCart, setBorrowingCart] = useState([]);

  // Add a book to the cart
  const addToCart = (book) => {
    // Check if user has reached borrowing limit
    if (borrowingCart.length >= MAX_BORROWING_LIMIT) {
      return { success: false, message: `You can only borrow up to ${MAX_BORROWING_LIMIT} books at a time` };
    }

    // Check if book is available and not already in cart
    if (book.availableCopies > 0 && !borrowingCart.some(item => item._id === book._id)) {
      setBorrowingCart([...borrowingCart, book]);
      return { success: true };
    }
    
    return { success: false, message: "This book is not available or already in your cart" };
  };

  // Remove a book from the cart
  const removeFromCart = (bookId) => {
    setBorrowingCart(borrowingCart.filter(book => book._id !== bookId));
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

// Create a custom hook to use the cart context
export const useBorrowingCart = () => {
  const context = useContext(BorrowingCartContext);
  if (!context) {
    throw new Error('useBorrowingCart must be used within a BorrowingCartProvider');
  }
  return context;
};

export default BorrowingCartContext; 