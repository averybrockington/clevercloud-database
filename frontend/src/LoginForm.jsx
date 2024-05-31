import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';
//ZB

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3306/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert('Login successful');
        //optionally redirect to another page like the profiles dashboard
        navigate('/dashboard');
      } else {
        setError(data.message || 'Error logging in');
        navigate('/dashboard');
      }
    } catch (error) {
      setError('Error logging in');
      navigate('/dashboard');
    }
  };

  return (
    <div className = "login-form">
      <h2>User Login</h2>
      <h4>Log in to view account data</h4>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
