// src/utils/auth.js

// Save token and user info
export const saveAuthData = (token, user) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
   // ⏰ save login time
  localStorage.setItem("loginTime", Date.now());
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
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("loginTime");
};

// Check if 30-minute session expired
export const isSessionExpired = () => {
  const loginTime = localStorage.getItem("loginTime");
  if (!loginTime) return true;

  const THIRTY_MINUTES = 30 * 60 * 1000; // 30 min
  return Date.now() - Number(loginTime) > THIRTY_MINUTES;
};
