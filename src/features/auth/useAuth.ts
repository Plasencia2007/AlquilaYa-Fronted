'use client';

import { useAuth as useAuthContext } from './AuthProvider';

/**
 * Hook personalizado para acceder de forma sencilla al contexto de autenticación.
 */
export const useAuth = () => {
  return useAuthContext();
};
