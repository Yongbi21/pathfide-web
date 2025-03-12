import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const user = JSON.parse(localStorage.getItem('authUser')); // Check if a user is stored in localStorage

  return user ? element : <Navigate to="/LoginPage" />;
};

export default ProtectedRoute;