import React, { useState } from 'react';
import axios from 'axios';

const LogIn = ({ onLogIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setError('All fields are required');
      return;
    }

    try {
      console.log('Logging in with:', { email, password });
      const response = await axios.post('https://edubursarymanagementsystem-backend.onrender.com/api/auth/login', { email, password });
      console.log('Login Response:', response.data);

      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        onLogIn(response.data);
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      console.error('Login Error:', error);
      setError('Log in failed');
    }
  };

  return (
    <div className="auth-form">
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        {error && <p className="error">{error}</p>}
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default LogIn;
