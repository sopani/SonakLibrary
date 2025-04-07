import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, error } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(username, password)) {
      onLoginSuccess();
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Library Login</h1>
        <form onSubmit={handleSubmit}>
          {error && <div className="login-error">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="login-button">Log In</button>
        </form>
        
        <div className="login-info">
          <p>Demo accounts:</p>
          <p>Username: user1, Password: password1</p>
          <p>Username: user2, Password: password2</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 