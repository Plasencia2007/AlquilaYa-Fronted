import Cookies from 'js-cookie';
import { User, UserRole, JWTPayload } from '@/types/auth';
import { encodeJWT } from '@/utils/jwt';

const AUTH_COOKIE_NAME = 'auth-token';

export const MOCK_USERS = [
  { id: '1', email: 'estudiante@test.com', password: '123456', role: 'ESTUDIANTE' as UserRole, name: 'Carlos Estudiante' },
  { id: '2', email: 'proveedor@test.com', password: '123456', role: 'PROVEEDOR' as UserRole, name: 'María Proveedora' },
  { id: '3', email: 'admin@test.com', password: '123456', role: 'ADMIN' as UserRole, name: 'Admin Master' },
];

export const authService = {
  login: async (email: string, password: string): Promise<User | null> => {
    // Simular retraso de red
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
