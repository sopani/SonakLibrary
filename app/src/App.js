import React, { useState, useEffect } from 'react';
import mockBooks from './mockData';
import BookCard from './components/BookCard';
import BookPopup from './components/BookPopup';
import CartModal from './components/CartModal';
import { BorrowingCartProvider, useBorrowingCart } from './contexts/BorrowingCartContext';
import './App.css';

// Main App content separate from the provider
const LibraryApp = () => {
  const [books, setBooks] = useState([]);
  const [useEmptyState, setUseEmptyState] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);

  // Use the cart context
  const { borrowingCart, addToCart, removeFromCart, isInCart, cartCount } = useBorrowingCart();

  useEffect(() => {
    setBooks(useEmptyState ? [] : mockBooks);
  }, [useEmptyState]);

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedBook(null);
  };

  const handleAddToCart = (book) => {
    if (addToCart(book)) {
      closePopup();
    }
  };

  const toggleCartModal = () => {
    setShowCartModal(!showCartModal);
  };

  const closeCartModal = () => {
    setShowCartModal(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Library Books</h1>
        <div className="header-controls">
          <button
            onClick={() => setUseEmptyState(!useEmptyState)}
            className="toggle-button"
          >
            {useEmptyState ? 'Show Books' : 'Show Empty Library'}
          </button>
          <div
            className="cart-indicator"
            onClick={toggleCartModal}
          >
            <span>Cart: {cartCount}</span>
          </div>
        </div>
      </header>

      <main className="book-list">
       { books.length === 0 ? (
        <p>No books available in the library.</p>
        ) : (
        <div className="books-container">
          {books.map((book) => (
            <BookCard
              key={book._id}
              book={book}
              onClick={handleBookClick}
            />
          ))}
        </div>
        )}

        {showPopup && selectedBook && (
          <BookPopup
            book={selectedBook}
            onClose={closePopup}
            onAddToCart={handleAddToCart}
            isInCart={isInCart(selectedBook._id)}
          />
        )}

        {showCartModal && (
          <CartModal
            books={borrowingCart}
            onClose={closeCartModal}
            onReturnBook={removeFromCart}
          />
        )}
      </main>
    </div>
  );
};

// Wrap the app with the provider
function App() {
  return (
    <BorrowingCartProvider>
      <LibraryApp />
    </BorrowingCartProvider>
  );
}

export default App; 