'use client';

import { useAuth as useAuthContext } from './AuthProvider';

export const useAuth = () => {
  return useAuthContext();
};
