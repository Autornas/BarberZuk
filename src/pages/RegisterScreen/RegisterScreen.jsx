import React, { useState } from 'react';
import './RegisterScreen.css';
import { Link, useNavigate } from 'react-router-dom';
import { auth, createUserWithEmailAndPassword, updateProfile } from '../../firebase';

function RegisterScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const nameRegex = /^[A-Za-z\s]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).{8,}$/;

    if (!nameRegex.test(fullName)) {
      alert('Full Name must contain only letters.');
      return;
    }

    if (!passwordRegex.test(password)) {
      alert('Password must be at least 8 characters long and contain at least one uppercase letter and one lowercase letter.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    try {
      // Register the user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Update the user's profile with the full name
      await updateProfile(userCredential.user, {
        displayName: fullName,
      });

      // After registration, navigate to the home or dashboard page
      navigate('/web'); // Change to your desired page

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="register-container">
      <div className="header">
        <h2>Register</h2>
        <div className="underline"></div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleRegister}>
        <div className="inputs">
          <div className="input">
            <input
              type="text"
              placeholder="Full Name"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="input">
            <input
              type="email"
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
          <div className="input">
            <input
              type="password"
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="submit-container">
          <button type="submit" className="register-button">Register</button>
          <div className="login-link">
            Already have an account? <Link to="/login">Login here</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegisterScreen;
