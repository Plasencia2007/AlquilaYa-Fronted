import { AdminMetric, RecentActivity } from '@/types/admin';

export const ADMIN_METRICS: AdminMetric[] = [
  { label: 'Usuarios Activos', value: '2,847', change: 12.5, changeLabel: 'vs mes anterior' },
  { label: 'Propiedades Listadas', value: '1,234', change: 8.2, changeLabel: 'vs mes anterior' },
  { label: 'Reservas del Mes', value: '486', change: -3.1, changeLabel: 'vs mes anterior' },
  { label: 'Ingresos Plataforma', value: 'S/ 48,520', change: 15.7, changeLabel: 'vs mes anterior' },
];

export const RECENT_ACTIVITIES: RecentActivity[] = [
  { id: '1', type: 'reserva', description: 'Nueva reserva en Cuarto Luminoso - Miraflores', user: 'Carlos E.', timestamp: 'Hace 5 min', status: 'activo' },
  { id: '2', type: 'registro', description: 'Nuevo proveedor registrado', user: 'Ana Torres', timestamp: 'Hace 15 min', status: 'pendiente' },
  { id: '3', type: 'verificacion', description: 'Propiedad en Barranco requiere verificación', user: 'Sistema', timestamp: 'Hace 1 hora', status: 'pendiente' },
  { id: '4', type: 'alerta', description: 'Reporte de usuario sobre propiedad #45', user: 'Pedro M.', timestamp: 'Hace 2 horas', status: 'critico' },
  { id: '5', type: 'reserva', description: 'Reserva confirmada - Estudio San Isidro', user: 'Laura G.', timestamp: 'Hace 3 horas', status: 'activo' },
  { id: '6', type: 'registro', description: 'Nuevo estudiante registrado', user: 'Diego R.', timestamp: 'Hace 4 horas', status: 'activo' },
];
