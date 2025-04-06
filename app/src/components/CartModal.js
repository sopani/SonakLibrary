import React from 'react';

const CartModal = ({ books, onClose, onReturnBook }) => {
  return (
    <div className="popup-overlay">
      <div className="popup cart-popup">
        <h2>Your Borrowing Cart</h2>
        
        {books.length === 0 ? (
          <p className="empty-cart-message">Your cart is empty.</p>
        ) : (
          <div className="cart-books">
            {books.map(book => (
              <div key={book._id} className="cart-book-item">
                <div className="cart-book-info">
                  <h3>{book.title}</h3>
                  <p>Author: {book.author}</p>
                </div>
                <button 
                  onClick={() => onReturnBook(book._id)} 
                  className="return-button"
                >
                  Return to Library
                </button>
              </div>
            ))}
          </div>
        )}
        
        <div className="popup-actions">
          <button onClick={onClose} className="close-button">Close</button>
        </div>
      </div>
    </div>
  );
};

export default CartModal; 