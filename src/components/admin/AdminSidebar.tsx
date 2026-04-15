'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/features/auth/AuthProvider';

const NAV_ITEMS = [
  { href: '/admin-master', icon: 'dashboard', label: 'Dashboard' },
  { href: '/admin-master/clients', icon: 'group', label: 'Clientes' },
  { href: '/admin-master/properties', icon: 'apartment', label: 'Propiedades' },
  { href: '/admin-master/metrics', icon: 'analytics', label: 'Métricas' },
  { href: '/admin-master/alerts', icon: 'notifications_active', label: 'Alertas' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-surface-container-lowest border-r border-outline-variant/10 flex flex-col z-[60] editorial-shadow">
      {/* Logo Section */}
      <div className="px-8 py-10">
        <Link href="/admin-master" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-white text-2xl">shield_person</span>
          </div>
          <div>
            <p className="text-xl font-black text-on-surface tracking-tighter leading-none">Alquila<span className="text-primary">Ya</span></p>
            <p className="text-[10px] font-bold text-outline uppercase tracking-[0.2em] mt-1">Admin Space</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto custom-scrollbar">
        <p className="px-4 text-[10px] font-black text-outline uppercase tracking-widest mb-4 opacity-50">Menú Principal</p>
        {NAV_ITEMS.map(({ href, icon, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 group ${
                isActive
                  ? 'bg-primary text-on-primary shadow-lg shadow-primary/20'
                  : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
              }`}
            >
              <span className={`material-symbols-outlined text-[22px] transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-outline/70'}`}>
                {icon}
              </span>
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="p-6 border-t border-outline-variant/10 space-y-4 bg-surface-container-low/30">
        <Link
          href="/"
          className="flex items-center gap-4 px-4 py-3 rounded-2xl text-xs font-bold text-on-surface-variant hover:bg-white hover:text-primary transition-all group"
        >
          <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
          Volver a la web pública
        </Link>

        {/* User Card */}
        <div className="p-4 rounded-[2rem] bg-surface-container-lowest border border-outline-variant/10 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 bg-secondary-fixed rounded-full flex items-center justify-center shrink-0 shadow-inner">
            <span className="text-on-secondary-fixed text-sm font-black">
              {user?.name?.charAt(0) || 'A'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-black text-on-surface truncate">{user?.name || 'Administrador'}</p>
            <p className="text-[10px] text-outline font-medium truncate">{user?.email || 'admin@alquilaya.com'}</p>
          </div>
          <button
            onClick={logout}
            className="w-8 h-8 rounded-full flex items-center justify-center text-outline hover:bg-error/10 hover:text-error transition-all"
            title="Cerrar sesión"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

