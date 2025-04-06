import React from 'react';

const BookPopup = ({ book, onClose, onAddToCart, isInCart }) => {
  if (!book) return null;

  return (
    <div >
      <div >
        <h2>{book.title}</h2>
        <p>Author: {book.author}</p>
        <p>ISBN: {book.isbn}</p>
        <p>
          Available copies: {book.availableCopies} of {book.totalCopies}
        </p>
        <div >
          <button 
            onClick={() => onAddToCart(book)}
            disabled={book.availableCopies === 0 || isInCart}
            className="borrow-button"
          >
            {isInCart 
              ? 'Already in cart' 
              : book.availableCopies === 0 
                ? 'Not available' 
                : 'Add to borrowing cart'}
          </button>
          <button onClick={onClose} className="close-button">Close</button>
        </div>
      </div>
    </div>
  );
};

export default BookPopup; 