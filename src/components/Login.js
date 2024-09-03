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

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
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

    axios.post('http://localhost:8000/api/login/', {
      username: formData.username,
      password: formData.password
    })
    .then(response => {
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);

      setMessage('Login successful!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    })
    .catch(error => {
      setMessage('Invalid credentials');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    });
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);

  return (
    <FormContainer 
      title="Login"
      footer={<FormFooter text="Forgot your password?" linkText="Reset Password" linkUrl="/password-reset" />}
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
        <SubmitButton text="Login" />
      </form>
      <FormFooter
        text="Back to Register?"
        linkText="Register"
        linkUrl="/"
      />
      <SnackbarNotification
        open={snackbarOpen}
        handleClose={handleSnackbarClose}
        severity={snackbarSeverity}
        message={message}
      />
    </FormContainer>
  );
};

export default Login;
