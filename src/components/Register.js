import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css'; 

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    axios.post('http://localhost:8000/api/register/', {
      username: formData.username,
      password: formData.password,
      confirm_password: formData.confirmPassword
    })
    .then(response => {
      setMessage('Registration successful!');
      setErrors({}); // Clear previous errors
      console.log(response.data);
    })
    .catch(error => {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors); // Set errors from backend response
      } else {
        setMessage('An unexpected error occurred.');
      }
      console.error(error);
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Create an Account</h2>
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
    </div>
  );
};

export default Register;
