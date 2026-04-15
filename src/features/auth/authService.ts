import Cookies from 'js-cookie';
import { User, UserRole, JWTPayload } from '@/types/auth';
import { encodeJWT } from '@/utils/jwt';

const AUTH_COOKIE_NAME = 'auth-token';

import { MOCK_USERS } from '@/mocks/users';


export const authService = {
  login: async (email: string, password: string): Promise<User | null> => {
    await new Promise(resolve => setTimeout(resolve, 800));

    const user = MOCK_USERS.find(u => u.email === email && u.password === password);

    if (user) {
      const payload: JWTPayload = {
        sub: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), // 24 horas
      };

      const token = encodeJWT(payload);
      Cookies.set(AUTH_COOKIE_NAME, token, { expires: 1 }); // 1 día

      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }

    return null;
  },

  logout: () => {
    Cookies.remove(AUTH_COOKIE_NAME);
  },

  getCurrentUserFromToken: (token: string): User | null => {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      const payload: JWTPayload = JSON.parse(atob(parts[1]));
      return {
        id: payload.sub,
        email: payload.email,
        name: payload.name,
        role: payload.role
      };
    } catch (error) {
      return null;
    }
  }
};
