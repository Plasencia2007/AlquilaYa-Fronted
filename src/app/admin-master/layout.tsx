'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth/AuthProvider';
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
    // Protección de cliente: Si no es ADMIN o no está autenticado, fuera
    if (isMounted && !isLoading) {
      if (!isAuthenticated || user?.role !== 'ADMIN') {
        router.replace('/login');
      }
    }
  }, [isAuthenticated, user, isLoading, isMounted, router]);

  // Bloqueo visual mientras se verifica la sesión para evitar que el contenido "parpadee" a intrusos
  if (!isMounted || isLoading || !isAuthenticated || user?.role !== 'ADMIN') {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center z-[9999]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <p className="text-[10px] font-black text-primary/40 uppercase tracking-[0.2em] animate-pulse">Protección Admin Activa</p>
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
