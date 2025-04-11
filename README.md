# Library Management System

A modern web application for managing a library's book inventory and borrowing system. Built with React and styled with CSS.

## Features

### User Features
- **Book Browsing**: View all available books in the library
- **Book Details**: Click on any book to view its details
- **Borrowing System**: 
  - Borrow books with a simple click
  - View your current borrowed books
  - Return books when finished
- **User Authentication**: Secure login system for users

### Admin Features
- **Admin Dashboard**: Special view for library administrators
- **Borrowing Management**: View all borrowed books across users
- **Admin Cart**: Ability to add books to cart like regular users
- **User Tracking**: See which books are borrowed by which users

## Technical Details

### Frontend
- Built with React.js
- Responsive design for all screen sizes
- Modern UI with clean styling
- Local storage for data persistence

### Data Management
- Books data stored in localStorage
- User authentication with mock data
- Borrowing records tracked per user
- Admin access with special privileges

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## Usage

### Regular Users
1. Login with your credentials
2. Browse available books
3. Click on a book to view details
4. Use the "Borrow" button to add to cart
5. View your borrowed books in the cart

### Admin Users
1. Login with admin credentials (username: admin, password: admin123)
2. Access the admin dashboard
3. View all borrowed books across users
4. Manage your own cart like regular users

## Mock Data

The application comes with sample data for testing:

### Users
- Regular User 1: username: user1, password: password1
- Regular User 2: username: user2, password: password2
- Admin: username: admin, password: admin123

### Books
- Sample books with titles, authors, and available copies
- Books can be borrowed and returned
- Availability updates automatically

## Contributing

Feel free to submit issues and enhancement requests!

