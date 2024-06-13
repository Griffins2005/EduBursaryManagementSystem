import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setError('All fields are required');
      return;
    }

    try {
      console.log('Sign Up Attempt:', { email, password }); // Logging the signup attempt
      const response = await axios.post('https://edubursarymanagementsystem-backend.onrender.com/api/auth/signup', { email, password });
      console.log('Sign Up Success:', response.data); // Logging successful signup

      // Log in the user after signing up
      const loginResponse = await axios.post('https://edubursarymanagementsystem-backend.onrender.com/api/auth/login', { email, password });
      console.log('Login Response:', loginResponse.data);

      if (loginResponse.data && loginResponse.data.token) {
        localStorage.setItem('token', loginResponse.data.token);
        navigate('/profile'); // Redirect to main page after successful login
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      console.error('Sign Up Error:', error); // Improved logging
      setError('Sign up failed');
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="auth-form">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        {error && <p className="error">{error}</p>}
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account?</p>
      <button onClick={handleLoginRedirect}>Log In</button>
    </div>
  );
};

export default SignIn;
