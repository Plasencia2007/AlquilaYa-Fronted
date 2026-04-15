'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { User, AuthState } from '@/types/auth';
import { authService } from './authService';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>(() => {
    const token = typeof window !== 'undefined' ? Cookies.get('auth-token') : undefined;
    if (token) {
      const user = authService.getCurrentUserFromToken(token);
      if (user) {
        return { user, isAuthenticated: true, isLoading: false };
      }
    }
    return { user: null, isAuthenticated: false, isLoading: typeof window === 'undefined' };
  });

  useEffect(() => {
    const token = Cookies.get('auth-token');
    if (token) {
      const user = authService.getCurrentUserFromToken(token);
      if (user) {
        setState({ user, isAuthenticated: true, isLoading: false });
      } else {
        setState({ user: null, isAuthenticated: false, isLoading: false });
      }
    } else {
      setState({ user: null, isAuthenticated: false, isLoading: false });
    }
  }, []);


  const login = async (email: string, password: string) => {
    setState(prev => ({ ...prev, isLoading: true }));
    const user = await authService.login(email, password);

    if (user) {
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
      return true;
    }

    setState(prev => ({ ...prev, isLoading: false }));
    return false;
  };

  const logout = () => {
    authService.logout();
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
