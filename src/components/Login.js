import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css'; 

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8000/api/login/', {
      username: formData.username,
      password: formData.password
    })
    .then(response => {
      setMessage('Login successful!');
      setError('');
      console.log(response.data);
    })
    .catch(error => {
      setMessage('');
      setError('Login failed: ' + (error.response.data.message || 'Invalid credentials'));
      console.error(error);
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Team Collaboration Tool</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="username" 
            value={formData.username} 
            onChange={handleChange} 
            placeholder="Username" 
            required 
          />
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            placeholder="Password" 
            required 
          />
          <button type="submit">Login</button>
        </form>
        {message && <p>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
