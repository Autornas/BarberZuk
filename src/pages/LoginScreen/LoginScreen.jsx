import './LoginScreen.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); 

    if (email && password) {
      navigate('/web'); 
    } else {
      alert('Please fill in both fields.'); 
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h2>Login</h2>
        <div className="underline"></div>
      </div>

      <form onSubmit={handleLogin}>
        <div className="inputs">
          <div className="input">
            <input
              type="text"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input">
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="submit-container">
          <button type="submit" className="login-button">Login</button>
          <div className="register-link">
            Don't have an account? <Link to="/register">Create Account</Link>
          </div>
          <div className="forgot-password">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginScreen;