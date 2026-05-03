import { useState, useEffect } from 'react';
import { alexis } from '@/api/alexisClient';

/**
 * Hook de autenticação administrativa.
 * Verifica se o usuário logado via Google tem role 'admin'.
 * Remove a senha hardcoded anterior.
 */
export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const user = await alexis.auth.me();
        if (user && user.role === 'admin') {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkAdmin();
  }, []);

  const logout = () => {
    alexis.auth.logout('/');
  };

  return {
    isAuthenticated,
    isLoading,
    logout
  };
}
