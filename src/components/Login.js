import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css'; 
import './Password.css';
import backgroundImage from './assets/images/auth-background.png'; 
import { Snackbar, Alert } from '@mui/material';
import { FaEye, FaEyeSlash } from 'react-icons/fa';  // Import icons

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate();  
  const [showPassword, setShowPassword] = useState(false);  // Add state for showing password
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const togglePasswordVisibility = () => setShowPassword(!showPassword);  // Toggle password visibility

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
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setError('');
      navigate('/dashboard');
    })
    .catch(error => {
      setMessage('Invalid credentials');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

 

  return (
    
    <div className="auth-container">
         
      <img src={backgroundImage} alt="Auth Background" className="auth-image" />
      <div className="auth-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
        <div className="password-input-container">
          <input 
            type="text" 
            name="username" 
            value={formData.username} 
            onChange={handleChange} 
            placeholder="Username" 
            required 
          />
          </div>
          <div className="password-input-container">
            <input 
              type={showPassword ? 'text' : 'password'} 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              placeholder="Password" 
              required 
            />
            <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button type="submit">Login</button>
        </form>
        
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <p>
          <Link to="/password-reset">Forgot your password?</Link>
        </p>
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;
