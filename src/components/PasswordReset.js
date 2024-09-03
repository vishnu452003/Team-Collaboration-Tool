import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import SnackbarNotification from './SnackbarNotification';
import FormContainer from './FormContainer';
import backgroundImage from './assets/images/auth-background.png';
import FormFooter from './FormFooter';

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
        setSnackbarSeverity('error');
        setMessage('User does not exist. Please try again.');
        setSnackbarOpen(true);
      });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <FormContainer backgroundImage={backgroundImage} title="Reset Password">
      <form onSubmit={handleSubmit}>
        <InputField
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter Your Username"
          required
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

export default PasswordReset;
