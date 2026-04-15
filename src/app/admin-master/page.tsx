'use client';

import { Users, Building, CalendarCheck, DollarSign } from 'lucide-react';
import StatsCard from '@/components/admin/StatsCard';
import StatusBadge from '@/components/admin/StatusBadge';
import { ADMIN_METRICS, RECENT_ACTIVITIES } from '@/lib/mockData';

const METRIC_ICONS = [Users, Building, CalendarCheck, DollarSign];

export default function AdminDashboard() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-admin-text">Panel de Administración</h1>
        <p className="text-sm text-admin-text-muted mt-1">Resumen general de la plataforma AlquilaYa</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {ADMIN_METRICS.map((metric, i) => (
          <StatsCard key={metric.label} {...metric} icon={METRIC_ICONS[i]} />
        ))}
      </div>

      {/* Recent Activity Table */}
      <div className="bg-admin-surface border border-admin-border rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-admin-border">
          <h2 className="text-base font-semibold text-admin-text">Actividad Reciente</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-admin-border text-admin-text-muted text-left">
                <th className="px-5 py-3 font-medium">Descripción</th>
                <th className="px-5 py-3 font-medium">Usuario</th>
                <th className="px-5 py-3 font-medium">Estado</th>
                <th className="px-5 py-3 font-medium">Tiempo</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_ACTIVITIES.map(activity => (
                <tr key={activity.id} className="border-b border-admin-border/50 hover:bg-admin-surface-2 transition-colors">
                  <td className="px-5 py-3.5 text-admin-text">{activity.description}</td>
                  <td className="px-5 py-3.5 text-admin-text-muted">{activity.user}</td>
                  <td className="px-5 py-3.5"><StatusBadge status={activity.status} /></td>
                  <td className="px-5 py-3.5 text-admin-text-muted text-xs">{activity.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
