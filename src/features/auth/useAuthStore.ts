'use client';

import { create } from 'zustand';
import Cookies from 'js-cookie';
import { User, AuthState } from '@/types/auth';
import { authService } from './authService';

interface AuthActions {
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => void;
  initialize: () => void;
  reset: () => void;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  ...initialState,

  initialize: () => {
    const token = Cookies.get('auth-token');
    if (token) {
      const user = authService.getCurrentUserFromToken(token);
      if (user) {
        set({ user, isAuthenticated: true, isLoading: false });
        return;
      }
    }
    set({ user: null, isAuthenticated: false, isLoading: false });
  },

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      const user = await authService.login(email, password);
      if (user) {
        set({ user, isAuthenticated: true, isLoading: false });
        return user;
      }
      set({ isLoading: false });
      return null;
    } catch (error) {
      set({ isLoading: false });
      return null;
    }
  },

  logout: () => {
    authService.logout();
    set({ ...initialState, isLoading: false });
  },

  reset: () => {
    set(initialState);
  },
}));
