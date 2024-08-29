import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Auth.css'; 
import backgroundImage from './assets/images/auth-background.png'; 
import { Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate();  
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
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
      console.log(response.data);
      navigate('/dashboard');
    })
    .catch(error => {
      setMessage('Invalid credentials');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      //setError('Login failed: ' + (error.response.data.message || 'Invalid credentials'));
      console.error(error);
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
        <p>
          <Link to="/password-reset">Forgot your password?</Link>
        </p>
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;
