'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/utils/cn';
import { ChevronDown, LogOut } from 'lucide-react';
import { useAuth } from '@/features/auth/AuthProvider';

interface SubItem {
  name: string;
  href: string;
}

interface MenuItem {
  name: string;
  icon: string;
  href?: string;
  badge?: number;
  subItems?: SubItem[];
}

interface Category {
  name: string;
  items: MenuItem[];
}

const menuData: Category[] = [
  {
    name: 'PRINCIPAL',
    items: [
      { name: 'Resumen', icon: 'dashboard', href: '/landlord/dashboard' },
    ],
  },
  {
    name: 'PROPIEDADES',
    items: [
      {
        name: 'Mis cuartos',
        icon: 'home',
        badge: 4,
        subItems: [
          { name: 'Cuartos activos', href: '/landlord/properties/active' },
          { name: 'Agregar cuarto', href: '/landlord/properties/add' },
          { name: 'Editar / pausar', href: '/landlord/properties/edit' },
        ],
      },
      {
        name: 'Fotos y detalles',
        icon: 'image',
        subItems: [
          { name: 'Galería por cuarto', href: '/landlord/details/gallery' },
          { name: 'Servicios incluidos', href: '/landlord/details/services' },
          { name: 'Reglas de la casa', href: '/landlord/details/rules' },
        ],
      },
    ],
  },
  {
    name: 'RESERVAS',
    items: [
      {
        name: 'Reservas',
        icon: 'calendar_month',
        badge: 2,
        subItems: [
          { name: 'Pendientes', href: '/landlord/reservations/pending' },
          { name: 'Confirmadas', href: '/landlord/reservations/confirmed' },
          { name: 'Historial', href: '/landlord/reservations/history' },
        ],
      },
    ],
  },
  {
    name: 'FINANZAS',
    items: [
      {
        name: 'Ingresos',
        icon: 'trending_up',
        subItems: [
          { name: 'Resumen mensual', href: '/landlord/finances/monthly' },
          { name: 'Por cuarto', href: '/landlord/finances/per-room' },
        ],
      },
    ],
  },
  {
    name: 'COMUNICACIÓN',
    items: [
      {
        name: 'Mensajes',
        icon: 'chat',
        badge: 3,
        subItems: [
          { name: 'Estudiantes', href: '/landlord/messages/students' },
          { name: 'Notificaciones', href: '/landlord/messages/notifications' },
        ],
      },
    ],
  },
  {
    name: 'CUENTA',
    items: [
      {
        name: 'Perfil',
        icon: 'person',
        subItems: [
          { name: 'Datos personales', href: '/landlord/profile/personal' },
          { name: 'Documentos / DNI', href: '/landlord/profile/docs' },
          { name: 'Contraseña', href: '/landlord/profile/security' },
        ],
      },
    ],
  },
];

export default function LandlordSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const [openItems, setOpenItems] = useState<string[]>(['PROPIEDADES', 'RESERVAS']);

  const toggleItem = (name: string) => {
    setOpenItems((prev) =>
      prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name]
    );
  };

  const handleLogout = () => {
    logout();
    router.replace('/');
  };

  return (
    <aside className="w-64 bg-[#141A5A] flex flex-col h-screen sticky top-0 overflow-y-auto no-scrollbar selection:bg-primary/30 border-r border-white/5">
      {/* Header */}
      <div className="p-6 pb-4">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-blue-400 border border-white/10 group-hover:scale-105 transition-all duration-300">
            <span className="material-symbols-outlined font-light text-[18px]">widgets</span>
          </div>
          <div>
            <h1 className="text-md font-black text-white tracking-tighter leading-none opacity-90">AlquilaYa</h1>
            <span className="text-[8px] font-black text-blue-400/50 uppercase tracking-[0.3em]">PRO PANEL</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {menuData.map((category) => (
          <div key={category.name} className="space-y-1">
            <div className="space-y-0.5">
              {category.items.map((item) => {
                const isOpen = openItems.includes(item.name);
                const hasSubItems = item.subItems && item.subItems.length > 0;
                const isActive = item.href === pathname || (hasSubItems && item.subItems?.some(s => s.href === pathname));

                return (
                  <div key={item.name} className="space-y-0.5">
                    {/* Main Item */}
                    {item.href ? (
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 px-4 py-2 rounded-xl transition-all group relative border",
                          isActive 
                            ? "bg-white/10 border-white/20 text-white shadow-lg shadow-black/10" 
                            : "border-transparent text-white/40 hover:text-white hover:bg-white/5"
                        )}
                      >
                        <span className={cn(
                          "material-symbols-outlined text-[17px] transition-colors",
                          isActive ? "text-blue-400" : "text-white/20 group-hover:text-white"
                        )} style={{ fontVariationSettings: "'FILL' 0, 'wght' 200" }}>
                          {item.icon}
                        </span>
                        <span className="font-semibold text-[12.5px] tracking-tight flex-1">{item.name}</span>
                        {item.badge && (
                          <span className="bg-blue-500 text-white text-[8px] font-black w-4 h-4 flex items-center justify-center rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    ) : (
                      <button
                        onClick={() => toggleItem(item.name)}
                        className={cn(
                          "w-full flex items-center gap-3 px-4 py-2 rounded-xl transition-all group relative border",
                          isActive 
                            ? "bg-white/5 border-white/10 text-white" 
                            : "border-transparent text-white/40 hover:text-white"
                        )}
                      >
                        <span className={cn(
                          "material-symbols-outlined text-[17px] transition-colors",
                          isActive ? "text-blue-400" : "text-white/20 group-hover:text-white"
                        )} style={{ fontVariationSettings: "'FILL' 0, 'wght' 200" }}>
                          {item.icon}
                        </span>
                        <span className="font-semibold text-[12.5px] tracking-tight flex-1 text-left">{item.name}</span>
                        {item.badge && !isOpen && (
                          <span className="bg-blue-500 text-white text-[8px] font-black w-4 h-4 flex items-center justify-center rounded-full mr-1">
                            {item.badge}
                          </span>
                        )}
                        <ChevronDown className={cn("w-3 h-3 text-white/10 transition-transform duration-300", isOpen && "rotate-180")} />
                      </button>
                    )}

                    {/* Sub Items */}
                    {hasSubItems && isOpen && (
                      <div className="pl-11 pr-4 py-0.5 space-y-0 animate-in slide-in-from-top-1 duration-200">
                        {item.subItems?.map((sub) => {
                          const isSubActive = pathname === sub.href;
                          return (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              className={cn(
                                "flex items-center h-7 text-[12px] font-medium transition-all group/sub hover:text-white mb-0.5",
                                isSubActive ? "text-white font-bold" : "text-white/40"
                              )}
                            >
                              <div className={cn(
                                "w-[5px] h-[5px] rounded-[1px] mr-3 transition-all shrink-0",
                                isSubActive ? "bg-blue-400 scale-110 shadow-lg shadow-blue-400/50" : "bg-white/40 group-hover/sub:bg-white/60"
                              )} />
                              {sub.name}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer Profile */}
      <div className="p-4 pt-6 border-t border-white/5 bg-[#171E6B]">
        <div className="bg-white/5 rounded-[1.25rem] p-3 flex items-center gap-3 border border-white/5 group hover:bg-white/10 transition-colors cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-black shadow-inner">
            CA
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-bold text-white truncate leading-tight">Carlos Apaza</p>
            <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Socio Verificado</p>
          </div>
          <button 
            onClick={handleLogout}
            className="text-white/20 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
