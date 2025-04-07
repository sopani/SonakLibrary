import React from 'react';

const BookPopup = ({ book, onClose, onAddToCart, isInCart, hasReachedLimit, maxBorrowingLimit }) => {
  if (!book) return null;

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>{book.title}</h2>
        <p>Author: {book.author}</p>
        <p>ISBN: {book.isbn}</p>
        <p className="copies-info">
          Available copies: {book.availableCopies} of {book.totalCopies}
        </p>
        
        {hasReachedLimit && !isInCart && (
          <p className="borrowing-limit-message">
            You can only borrow up to {maxBorrowingLimit} books at a time.
          </p>
        )}
        
        <div className="popup-actions">
          <button 
            onClick={() => onAddToCart(book)}
            disabled={book.availableCopies === 0 || isInCart || hasReachedLimit}
            className="borrow-button"
          >
            {isInCart 
              ? 'Already in cart' 
              : hasReachedLimit
                ? 'Borrowing limit reached'
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