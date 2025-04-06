import React, { useState, useEffect } from 'react';
import mockBooks from './mockData';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [useEmptyState, setUseEmptyState] = useState(false);

  useEffect(() => {
    // Load books immediately without delay
    setBooks(useEmptyState ? [] : mockBooks);
    setLoading(false);
  }, [useEmptyState]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Library Books</h1>
        <button 
          onClick={() => setUseEmptyState(!useEmptyState)} 
          className="toggle-button"
        >
          {useEmptyState ? 'Show Books' : 'Show Empty Library'}
        </button>
      </header>
      
      <main className="book-list">
        {loading ? (
          <p>Loading books...</p>
        ) : books.length === 0 ? (
          <p>No books available in the library.</p>
        ) : (
          <div className="books-container">
            {books.map((book) => (
              <div key={book._id} className="book-card">
                <h2>{book.title}</h2>
                <p>Author: {book.author}</p>
                <p>ISBN: {book.isbn}</p>
                <div className="availability-info">
                  <p className={`status ${book.available ? 'available' : 'unavailable'}`}>
                    Status: {book.available ? 'Available' : 'Borrowed'}
                  </p>
                  <p className="copies-info">
                    Copies: <span className="copies-count">{book.availableCopies}</span> of {book.totalCopies} available
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App; 