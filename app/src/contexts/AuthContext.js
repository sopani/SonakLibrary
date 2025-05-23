import React, { createContext, useState, useContext, useEffect } from 'react';

// Mock users for demo purposes
export const  mockUsers = [
  { id: 1, username: 'user1', password: 'password1', name: 'Sonak Pani', role: 'user' },
  { id: 2, username: 'user2', password: 'password2', name: 'Rahul Gandhi', role: 'user' },
  { id: 3, username: 'admin', password: 'admin123', name: 'Admin', role: 'admin' }
];

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState('');

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('libraryUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setCurrentUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('libraryUser');
      }
    }
  }, []);

  // Login function
  const login = (username, password) => {
    setError('');
    
    // Find user
    const user = mockUsers.find(
      user => user.username === username && user.password === password
    );

    if (user) {
      // Create user data without password
      const userData = {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role
      };
      
      // Store in state and localStorage
      setCurrentUser(userData);
      localStorage.setItem('libraryUser', JSON.stringify(userData));
      return true;
    } else {
      setError('Invalid username or password');
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('libraryUser');
  };

  // Check if current user is admin
  const isAdmin = () => {
    return currentUser?.role === 'admin';
  };

  // Auth context value
  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    isAdmin,
    error,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 