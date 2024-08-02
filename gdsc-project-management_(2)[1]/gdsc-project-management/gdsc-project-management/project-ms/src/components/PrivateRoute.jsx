import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  let isAuthenticated = !!token;
  let isAdmin = false;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      isAdmin = decodedToken.userType === 'Admin';
    } catch (error) {
      console.error('Invalid token:', error);
      isAuthenticated = false;
    }
  }

  // If the user is authenticated and is authorized, render the children
  // Otherwise, redirect to the login page
  return isAuthenticated && (window.location.pathname !== '/admin' || isAdmin) ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
