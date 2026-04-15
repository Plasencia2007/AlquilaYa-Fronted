import { UserRole } from '@/types/auth';

export const MOCK_USERS = [
  { id: '1', email: 'estudiante@test.com', password: '123456', role: 'ESTUDIANTE' as UserRole, name: 'Carlos Estudiante' },
  { id: '2', email: 'proveedor@test.com', password: '123456', role: 'PROVEEDOR' as UserRole, name: 'María Proveedora' },
  { id: '3', email: 'admin@test.com', password: '123456', role: 'ADMIN' as UserRole, name: 'Admin Master' },
];
