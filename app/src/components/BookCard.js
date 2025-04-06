import React from 'react';

const BookCard = ({ book, onClick }) => {
  return (
    <div className="book-card" onClick={() => onClick(book)}>
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
  );
};

export default BookCard; 