// src/utils/auth.js

// Save token and user info
export const saveAuthData = (token, user) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};

// Get token
export const getToken = () => {
  return localStorage.getItem('token');
};

// Get user info
export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Check if user is logged in
export const isLoggedIn = () => {
  return !!localStorage.getItem('token');
};

// Check if current user is admin
export const isAdmin = () => {
  const user = getUser();
  return user?.userType === 'admin';
};

// Logout (clear all auth data)
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
