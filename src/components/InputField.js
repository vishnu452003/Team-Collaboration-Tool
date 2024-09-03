import React from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const InputField = ({ type, name, value, onChange, placeholder, required, showPassword, toggleVisibility, toggleIcon }) => (
  <div className="password-input-container">
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      style={{ paddingRight: toggleIcon ? '40px' : '10px' }}
    />
    {toggleIcon && (
      <span className="password-toggle-icon" onClick={toggleVisibility}>
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </span>
    )}
  </div>
);

export default InputField;
