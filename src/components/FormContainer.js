import React from 'react';

const FormContainer = ({ children, title, footer }) => (
  <div className="auth-container">
    <img src={require('./assets/images/auth-background.png')} alt="Auth Background" className="auth-image" />
    <div className="auth-box">
      <h2>{title}</h2>
      {children}
      {footer && <p>{footer}</p>}
    </div>
  </div>
);

export default FormContainer;
