import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import PasswordField from './PasswordField';
import SubmitButton from './SubmitButton';
import SnackbarNotification from './SnackbarNotification';
import FormContainer from './FormContainer';
import backgroundImage from './assets/images/auth-background.png';
import FormFooter from './FormFooter';

const PasswordConfirm = () => {
  const [newPassword, setNewPassword] = useState('');
  const { username } = useParams();
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

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
      setSnackbarSeverity('error');
      setMessage('Error resetting password');
      setSnackbarOpen(true);
    });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <FormContainer backgroundImage={backgroundImage} title="Reset Password">
      <form onSubmit={handleSubmit}>
        <PasswordField
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter New Password"
        />
        <SubmitButton text="Reset Password" />
      </form>
      <FormFooter
        text="Back to login?"
        linkText="Login"
        linkUrl="/login"
      />

      <SnackbarNotification
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message={message}
        severity={snackbarSeverity}
      />
    </FormContainer>
  );
};

export default PasswordConfirm;
