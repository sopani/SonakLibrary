import React from 'react';

const BookCard = ({ book, onClick }) => {
  return (
    <div onClick={() => onClick(book)}>
      <h2>{book.title}</h2>
      <p>Author: {book.author}</p>
      <p>ISBN: {book.isbn}</p>
      <div>
        <p>
          Status: {book.available ? 'Available' : 'Borrowed'}
        </p>
        <p >
          Copies: <span >{book.availableCopies}</span> of {book.totalCopies} available
        </p>
      </div>
    </div>
  );
};

export default BookCard; 