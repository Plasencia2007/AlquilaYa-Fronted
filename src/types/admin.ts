export interface AdminMetric {
  label: string;
  value: string;
  change: number;
  changeLabel: string;
}

export interface RecentActivity {
  id: string;
  type: 'reserva' | 'registro' | 'verificacion' | 'alerta';
  description: string;
  user: string;
  timestamp: string;
  status: 'activo' | 'pendiente' | 'critico';
}
