import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';

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
        const user = await base44.auth.me();
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
    base44.auth.logout('/');
  };

  return {
    isAuthenticated,
    isLoading,
    logout
  };
}