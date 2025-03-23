import './LoginScreen.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetError, setResetError] = useState('');
  const [resetSuccess, setResetSuccess] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email && password) {
      const auth = getAuth();
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/web');
      } catch (err) {
        setError('Invalid email or password. Please try again.');
      }
    } else {
      setError('Please fill in both fields.');
    }
  };

  const handleForgotPasswordClick = () => {
    setShowForgotPasswordModal(true);
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetSuccess('Password reset email sent! Please check your inbox.');
      setResetError('');
    } catch (error) {
      setResetError('Error sending password reset email. Please try again.');
      setResetSuccess('');
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

        {error && <p className="error-message">{error}</p>}

        <div className="submit-container">
          <button type="submit" className="login-button">Login</button>
          <div className="register-link">
            Don't have an account? <Link to="/register">Create Account</Link>
          </div>
          <div className="forgot-password" onClick={handleForgotPasswordClick}>
            Forgot Password?
          </div>
        </div>
      </form>

      {showForgotPasswordModal && (
        <div className="forgot-password-modal">
          <div className="modal-content">
            <h3>Reset Your Password</h3>
            <form onSubmit={handlePasswordReset}>
              <input
                type="email"
                placeholder="Enter your email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
              />
              <button type="submit" className="reset-button">Send Reset Email</button>
            </form>
            {resetError && <p className="error-message">{resetError}</p>}
            {resetSuccess && <p className="success-message">{resetSuccess}</p>}
            <button className="close-modal" onClick={() => setShowForgotPasswordModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginScreen;
