import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import './Password.css';
import FormContainer from './FormContainer';
import InputField from './InputField';
import PasswordField from './PasswordField';
import SubmitButton from './SubmitButton';
import SnackbarNotification from './SnackbarNotification';
import FormFooter from './FormFooter';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  
  const navigate = useNavigate();

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

        localStorage.setItem('accessToken', response.data.access);
        localStorage.setItem('refreshToken', response.data.refresh);
      setMessage('Registration successful!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    })
    .catch(error => {
      const errorMessages = error.response?.data?.errors 
        ? Object.entries(error.response.data.errors)
            .map(([field, fieldErrors]) => fieldErrors.join(' '))
            .join('. ') 
        : 'An unexpected error occurred.';

      setSnackbarSeverity('error');
      setMessage(errorMessages);
      setSnackbarOpen(true);
    });
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);

  return (
    <FormContainer 
      title="Create an Account"
      footer={<FormFooter text="Already have an account?" linkText="Login" linkUrl="/login" />}
    >
      <form onSubmit={handleSubmit}>
        <InputField 
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <PasswordField 
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <PasswordField 
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
        />
        <SubmitButton text="Sign Up" />
      </form>
      <SnackbarNotification
        open={snackbarOpen}
        handleClose={handleSnackbarClose}
        severity={snackbarSeverity}
        message={message}
      />
    </FormContainer>
  );
};

export default Register;
