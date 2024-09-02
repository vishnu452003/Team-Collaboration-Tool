import React, { useState } from 'react';
import axios from 'axios';
import { Snackbar, Alert} from '@mui/material';
import backgroundImage from './assets/images/auth-background.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import './Auth.css';
import './Password.css';
import { useNavigate } from 'react-router-dom';



const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
   
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
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

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    })
    .catch(error => {
      if (error.response && error.response.data.errors) {
        const errorMessages = Object.entries(error.response.data.errors)
          .map(([field, fieldErrors]) => fieldErrors.join(' '))
          .join('. ');
          
        setSnackbarSeverity('error');
        setMessage(errorMessages);
        setSnackbarOpen(true);
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
       
      <div className="auth-box">
        <h2>Create an Account</h2>
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
          <div className="password-input-container">
            <input 
              type={showConfirmPassword ? 'text' : 'password'} 
              name="confirmPassword" 
              value={formData.confirmPassword} 
              onChange={handleChange} 
              placeholder="Confirm Password" 
              required 
            />
            <span className="password-toggle-icon" onClick={toggleConfirmPasswordVisibility}>
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <p>Already have an account? <a href="/login">Login</a></p>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
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

export default Register;
