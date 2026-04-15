'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/features/auth/AuthProvider';
import {
  LayoutDashboard,
  Users,
  Building,
  BarChart3,
  AlertTriangle,
  ArrowLeft,
  LogOut,
  ShieldCheck,
} from 'lucide-react';

const NAV_ITEMS = [
  { href: '/admin-master', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin-master/clients', icon: Users, label: 'Clientes' },
  { href: '/admin-master/properties', icon: Building, label: 'Propiedades' },
  { href: '/admin-master/metrics', icon: BarChart3, label: 'Métricas' },
  { href: '/admin-master/alerts', icon: AlertTriangle, label: 'Alertas' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-admin-surface border-r border-admin-border flex flex-col z-50">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-admin-border">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-admin-accent rounded-lg flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-base font-bold text-admin-text">Admin</span>
            <span className="text-base font-light text-admin-text-muted">Panel</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-admin-accent/15 text-admin-accent border border-admin-accent/20'
                  : 'text-admin-text-muted hover:text-admin-text hover:bg-admin-surface-2'
              }`}
            >
              <Icon className="w-[18px] h-[18px] shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="p-3 border-t border-admin-border space-y-1">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-admin-text-muted hover:text-admin-text hover:bg-admin-surface-2 transition-colors"
        >
          <ArrowLeft className="w-[18px] h-[18px]" />
          Volver a la web
        </Link>

        {/* User info + logout */}
        <div className="flex items-center gap-3 px-3 py-3 mt-2 rounded-lg bg-admin-surface-2">
          <div className="w-8 h-8 bg-admin-accent rounded-full flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-semibold">
              {user?.name?.charAt(0) || 'A'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-admin-text truncate">{user?.name}</p>
            <p className="text-[10px] text-admin-text-muted truncate">{user?.email}</p>
          </div>
          <button
            onClick={logout}
            className="p-1.5 rounded-md hover:bg-admin-border transition-colors"
            title="Cerrar sesión"
          >
            <LogOut className="w-3.5 h-3.5 text-admin-text-muted" />
          </button>
        </div>
      </div>
    </aside>
  );
}
