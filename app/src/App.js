import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import mockBooks from './mockData';
import BookCard from './components/BookCard';
import BookPopup from './components/BookPopup';
import CartModal from './components/CartModal';
import LoginPage from './components/loginPage/LoginPage';
import AdminDashboard from './components/adminDashBoard/AdminDashboard';
import { BorrowingCartProvider, useBorrowingCart } from './contexts/BorrowingCartContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import './App.css';

// Library content component
const LibraryContent = () => {
  const [books, setBooks] = useState([]);
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
  const { currentUser, logout, isAdmin } = useAuth();

  // Load books from localStorage or initialize with mock data
  useEffect(() => {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
      setBooks(JSON.parse(storedBooks));
    } else {
      // Initialize with mock data if no books exist in localStorage
      localStorage.setItem('books', JSON.stringify(mockBooks));
      setBooks(mockBooks);
    }
  }, []);

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setShowPopup(true);
    setErrorMessage(''); // Clear any previous error messages
  };

  const updateBookAvailability = (bookId, action) => {
    const updatedBooks = books.map(b => {
      if (b._id === bookId) {
        return {
          ...b,
          availableCopies: action === 'borrow' 
            ? Math.max(0, b.availableCopies - 1)
            : Math.min(b.totalCopies, b.availableCopies + 1),
          available: action === 'borrow' 
            ? b.availableCopies - 1 > 0
            : b.availableCopies + 1 > 0
        };
      }
      return b;
    });
    localStorage.setItem('books', JSON.stringify(updatedBooks));
    setBooks(updatedBooks);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedBook(null);
    setErrorMessage('');
  };

  const handleAddToCart = (book) => {
    const result = addToCart(book);
    if (result.success) {
      updateBookAvailability(book._id, 'borrow');
      closePopup();
    } else if (result.message) {
      setErrorMessage(result.message);
    }
  };

  const handleReturnBook = (bookId) => {
    removeFromCart(bookId);
    updateBookAvailability(bookId, 'return');
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
          <div
            className="cart-indicator"
            onClick={toggleCartModal}
          >
            <span>Cart: {cartCount}/{maxBorrowingLimit}</span>
          </div>
          <div className="user-profile">
            <span className="user-name">Welcome, {currentUser.name}</span>
            {isAdmin() && (
              <Link to="/admin" className="admin-link">
                Admin Dashboard
              </Link>
            )}
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
            onReturnBook={handleReturnBook}
          />
        )}
      </main>
    </div>
  );
};

// Main App component with authentication
const LibraryApp = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <Routes>
      <Route path="/" element={
        isAuthenticated ? (
          <BorrowingCartProvider>
            <LibraryContent />
          </BorrowingCartProvider>
        ) : (
          <LoginPage />
        )
      } />
      <Route path="/admin" element={
        isAuthenticated && isAdmin() ? (
          <AdminDashboard />
        ) : (
          <LoginPage />
        )
      } />
    </Routes>
  );
};

// App wrapper with providers
function App() {
  return (
    <Router>
      <AuthProvider>
        <LibraryApp />
      </AuthProvider>
    </Router>
  );
}

export default App; 