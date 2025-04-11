import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockUsers } from '../contexts/AuthContext';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load all books
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
      setAllBooks(JSON.parse(storedBooks));
    }

    // Load all borrowing records
    const borrowingRecords = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('borrowingCart_')) {
        const userId = key.replace('borrowingCart_', '');
        const userCart = JSON.parse(localStorage.getItem(key));
        if (Array.isArray(userCart)) {
          userCart.forEach(book => {
            const user = mockUsers.find(u => u.id.toString() === userId);
            borrowingRecords.push({
              ...book,
              userId: userId,
              userName: user ? user.name : 'Unknown User'
            });
          });
        }
      }
    }
    setBorrowedBooks(borrowingRecords);
  }, []);

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <button 
          className="back-to-user-button"
          onClick={() => navigate('/')}
        >
          Back to User View
        </button>
      </div>
      
      <div className="dashboard-section">
        <h3>Borrowed Books</h3>
        {borrowedBooks.length === 0 ? (
          <p>No books are currently borrowed.</p>
        ) : (
          <ul className="borrowed-books-list">
            {borrowedBooks.map((book) => (
              <li 
                key={`${book._id}-${book.userId}`} 
                className="borrowed-book-item"
              >
                <span className="book-title">{book.title}</span>
                <span className="book-author">by {book.author}</span>
                <span className="borrower">Borrowed by {book.userName}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard; 