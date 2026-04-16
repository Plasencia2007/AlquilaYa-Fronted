'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth/useAuth';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminMasterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, user, isLoading } = useAuth();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted && (!isAuthenticated || user?.role !== 'ADMIN')) {
        router.replace('/login');
      }
    };
    window.addEventListener('pageshow', handlePageShow);

    if (isMounted && !isLoading) {
      if (!isAuthenticated || user?.role !== 'ADMIN') {
        router.replace('/login');
      }
    }

    return () => window.removeEventListener('pageshow', handlePageShow);
  }, [isAuthenticated, user, isLoading, isMounted, router]);

  // Bloqueo visual mientras se verifica la sesión para evitar que el contenido "parpadee" a intrusos
  if (!isMounted || isLoading || !isAuthenticated || user?.role !== 'ADMIN') {
    return (
      <div className="fixed inset-0 z-[9999] bg-[#0b1222] flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <div className="text-center">
            <p className="text-[11px] font-black text-primary uppercase tracking-[0.3em] animate-pulse">Sincronizando Torre de Control</p>
            <p className="text-[9px] text-[#64748b] font-bold mt-2 uppercase tracking-widest">Protección Admin Activa</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/20 animate-fade-in text-on-surface">
      <AdminSidebar />
      <main className="pl-[280px] min-h-screen">
        <div className="p-8 lg:p-12 max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
