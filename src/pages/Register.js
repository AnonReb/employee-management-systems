// src/pages/Register.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const validatePassword = (password) => {
    const capitalLetter = /[A-Z]/;
    const specialCharacter = /[!@#$%^&*(),.?":{}|<>]/;
    return (
      password.length >= 6 &&
      capitalLetter.test(password) &&
      specialCharacter.test(password)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (password !== confirmPassword) {
      setLoading(false);
      setMessage('Passwords do not match');
      return;
    }

    if (!validatePassword(password)) {
      setLoading(false);
      setMessage('Password must be at least 6 characters long and include a capital letter and a special character');
      return;
    }

    try {
      // Use environment variable for API URL
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, {
        username,
        email,
        password,
      });

      setLoading(false);
      setMessage('Registration successful! You can now log in.');
    } catch (error) {
      setLoading(false);
      console.error(error.response);
      setMessage('Registration failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Register</h2>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default Register;
