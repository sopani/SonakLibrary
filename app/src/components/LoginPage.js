import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate('/');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Library Login</h2>
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="login-button">Login</button>
        </form>

        <div className="demo-credentials">
          <h3>Demo Credentials</h3>
          <div className="admin-credentials">
            <h4>Admin Account</h4>
            <p>Username: admin</p>
            <p>Password: admin123</p>
          </div>
          <div className="user-credentials">
            <h4>User Accounts</h4>
            <p>Username: user1 | Password: password1</p>
            <p>Username: user2 | Password: password2</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 