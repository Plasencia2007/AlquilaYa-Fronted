'use client';

import { useEffect } from 'react';
import { useAuthStore } from './useAuthStore';

export const useAuth = () => {
  const { initialize, isLoading, isAuthenticated, user, login, logout } = useAuthStore();
  
  useEffect(() => {
    // Sincronización inicial estable: solo se dispara si isLoading es true
    if (isLoading && !isAuthenticated) {
      initialize();
    }
  }, [initialize, isLoading, isAuthenticated]);

  return { user, isAuthenticated, logout, isLoading, login, initialize };
};
