import React, { useState } from 'react';
import InputField from './InputField';


const PasswordField = ({ name, value, onChange, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <InputField
      type={showPassword ? 'text' : 'password'}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required
      showPassword={showPassword}
      toggleVisibility={togglePasswordVisibility}
      toggleIcon
    />
  );
};

export default PasswordField;
