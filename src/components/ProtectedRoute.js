import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('accessToken'); // Check if accessToken exists

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
