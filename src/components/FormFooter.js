import React from 'react';
import { Link } from 'react-router-dom';

const FormFooter = ({ text, linkText, linkUrl }) => (
  <p>
    {text} <Link to={linkUrl}>{linkText}</Link>
  </p>
);

export default FormFooter;
