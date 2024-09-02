import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import backgroundImage from './assets/images/auth-background.png'; 
import { Snackbar, Alert } from '@mui/material';
import { FaEye, FaEyeSlash } from 'react-icons/fa';  // Import icons
import './Password.css'

const PasswordConfirm = () => {
  const [newPassword, setNewPassword] = useState('');
  const { username } = useParams();  
  const navigate = useNavigate();  
  const [showPassword, setShowPassword] = useState(false);  // Add state for showing password
  const [message, setMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const togglePasswordVisibility = () => setShowPassword(!showPassword);  // Toggle password visibility

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/password-reset-confirm/', {
      username: username,
      new_password: newPassword
    })
    .then(response => {
      setMessage('Password reset successful!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    })
    .catch(error => {
      setMessage('Error resetting password');
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
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="password-input-container">
            <input 
              type={showPassword ? 'text' : 'password'} 
              value={newPassword} 
              onChange={(e) => setNewPassword(e.target.value)} 
              placeholder="Enter New Password" 
              required 
            />
            <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button type="submit">Reset Password</button>
        </form>
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

export default PasswordConfirm;
