import React, { createContext, useState, useContext } from 'react';

// Create a context for the borrowing cart
const BorrowingCartContext = createContext();

// Create a provider component
export const BorrowingCartProvider = ({ children }) => {
  const [borrowingCart, setBorrowingCart] = useState([]);

  // Add a book to the cart
  const addToCart = (book) => {
    if (book.availableCopies > 0 && !borrowingCart.some(item => item._id === book._id)) {
      setBorrowingCart([...borrowingCart, book]);
      return true; // Return true to indicate success
    }
    return false; // Return false to indicate failure
  };

  // Remove a book from the cart
  const removeFromCart = (bookId) => {
    setBorrowingCart(borrowingCart.filter(book => book._id !== bookId));
  };

  // Check if a book is in the cart
  const isInCart = (bookId) => {
    return borrowingCart.some(book => book._id === bookId);
  };


  // TODO: Clear the cart to be checked if needed 
  // // Clear the cart to be checked if needed 
  // const clearCart = () => {
  //   setBorrowingCart([]);
  // };

  return (
    <BorrowingCartContext.Provider 
      value={{ 
        borrowingCart, 
        addToCart, 
        removeFromCart, 
        isInCart,
        // clearCart,
        cartCount: borrowingCart.length
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