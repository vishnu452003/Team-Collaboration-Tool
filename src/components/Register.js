import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css'; 
import { Snackbar, Alert } from '@mui/material';
import backgroundImage from './assets/images/auth-background.png'; 
const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      //alert('Passwords do not match!');

      setSnackbarSeverity('error');
      setMessage('Passwords do not match!');
      setSnackbarOpen(true);
      return;
    }

    axios.post('http://localhost:8000/api/register/', {
      username: formData.username,
      password: formData.password,
      confirm_password: formData.confirmPassword
    })
    .then(response => {
        setMessage('Registration successful!');
        setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setErrors({}); 
      //console.log(response.data);
    })
    .catch(error => {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors); 
      } else {
        setSnackbarSeverity('error');
        setMessage('An unexpected error occurred.');
        setSnackbarOpen(true);
        
      }
      console.error(error);
    });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  return (
    <div className="auth-container">
     <img src={backgroundImage} alt="Auth Background" className="auth-image" />
      <div className="auth-box ">
        <h2 >Create an Account</h2>
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
          <input 
            type="password" 
            name="confirmPassword" 
            value={formData.confirmPassword} 
            onChange={handleChange} 
            placeholder="Confirm Password" 
            required 
          />
          <button type="submit">Sign Up</button>
        </form>
        {message && <p>{message}</p>}
        {errors && (
          <ul>
            {Object.entries(errors).map(([field, fieldErrors]) => (
              fieldErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))
            ))}
          </ul>
        )}
        <p>
          Already have an account? <a href="/login">Login</a>
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

export default Register;
