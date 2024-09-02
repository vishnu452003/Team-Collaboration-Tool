import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import backgroundImage from './assets/images/auth-background.png'; 
import { Snackbar, Alert } from '@mui/material';

const PasswordReset = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();  
  const [message, setMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/password-reset-request/', { username })
      .then(response => {

      
        navigate(`/password-confirm/${username}`);
      })
      .catch(error => {
        console.error(error);
        setSnackbarSeverity('error');

        setMessage('User does not exist. Please try again.');
        setSnackbarOpen(true);
        //alert("User does not exist or an error occurred.");
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
          <input 
            type="text" 
            name="username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="Enter Your Username" 
            required 
          />
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

export default PasswordReset;
