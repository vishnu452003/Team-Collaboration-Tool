import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import backgroundImage from './assets/images/auth-background.png'; 
import { Snackbar, Alert } from '@mui/material';

const PasswordConfirm = () => {
  const [newPassword, setNewPassword] = useState('');
  const { username } = useParams();  
  const navigate = useNavigate();  
  const [message, setMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/password-reset-confirm/', {
      username,
      new_password: newPassword
    })
    .then(response => {
      setMessage('Password has been successfully reset!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      //alert("Password reset successfully");
      navigate('/login');  
    })
    .catch(error => {
      console.error(error);
      setSnackbarSeverity('error');
      setMessage('Failed to reset password. Please try again.');
      setSnackbarOpen(true);
      //alert("An error occurred. Please try again.");
    });
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  return (
    <div className="auth-container">
       <img src={backgroundImage} alt="Auth Background" className="auth-image" />
      <div className="auth-box">
        <h2>Set New Password</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="password" 
            name="newPassword" 
            value={newPassword} 
            onChange={(e) => setNewPassword(e.target.value)} 
            placeholder="Enter new password" 
            required 
          />
          <button type="submit">Set Password</button>
        </form>
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

export default PasswordConfirm;
