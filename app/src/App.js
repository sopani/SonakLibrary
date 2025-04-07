import React, { useState, useEffect } from 'react';
import mockBooks from './mockData';
import BookCard from './components/BookCard';
import BookPopup from './components/BookPopup';
import CartModal from './components/CartModal';
import LoginPage from './components/LoginPage';
import { BorrowingCartProvider, useBorrowingCart } from './contexts/BorrowingCartContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import './App.css';

// Library content component
const LibraryContent = () => {
  const [books, setBooks] = useState([]);
  const [useEmptyState, setUseEmptyState] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Use the cart context
  const { 
    borrowingCart, 
    addToCart, 
    removeFromCart, 
    isInCart, 
    hasReachedBorrowingLimit, 
    cartCount,
    maxBorrowingLimit 
  } = useBorrowingCart();

  // Use auth context
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    setBooks(useEmptyState ? [] : mockBooks);
  }, [useEmptyState]);

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setShowPopup(true);
    setErrorMessage(''); // Clear any previous error messages
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedBook(null);
    setErrorMessage('');
  };

  const handleAddToCart = (book) => {
    const result = addToCart(book);
    if (result.success) {
      closePopup();
    } else if (result.message) {
      setErrorMessage(result.message);
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
            <span>Cart: {cartCount}/{maxBorrowingLimit}</span>
          </div>
          <div className="user-profile">
            <span className="user-name">Welcome, {currentUser.name}</span>
            <button onClick={logout} className="logout-button">Logout</button>
          </div>
        </div>
      </header>

      <main className="book-list">
        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}
        
        {books.length === 0 ? (
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
            hasReachedLimit={hasReachedBorrowingLimit() && !isInCart(selectedBook._id)}
            maxBorrowingLimit={maxBorrowingLimit}
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

// Main App component with authentication
const LibraryApp = () => {
  const { isAuthenticated } = useAuth();

  // Handle login success
  const handleLoginSuccess = () => {
    // Authentication state is already updated in AuthContext
    //Will use this for  future login success updates 
  };


  return (
    <>
      {isAuthenticated ? (
        <BorrowingCartProvider>
          <LibraryContent />
        </BorrowingCartProvider>
      ) : (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      )}
    </>
  );
};

// App wrapper with providers
function App() {
  return (
    <AuthProvider>
      <LibraryApp />
    </AuthProvider>
  );
}

export default App; 