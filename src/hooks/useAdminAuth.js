import { useState, useEffect } from 'react';

/**
 * Custom hook to manage administrative authentication session.
 * Stores authentication state in sessionStorage to persist across tab navigation
 * but clear when the browser session ends.
 */
export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check initial state from sessionStorage
    return sessionStorage.getItem('admin_session_active') === 'true';
  });

  const login = (password) => {
    if (password === '@Alex7550') {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_session_active', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_session_active');
    window.location.href = '/'; // Redirect to home on logout
  };

  return {
    isAuthenticated,
    login,
    logout
  };
}
