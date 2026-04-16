'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth/AuthProvider';
import LandlordSidebar from '@/features/landlord/components/LandlordSidebar';

export default function LandlordLayout({
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
    // Seguridad 1000%: Bloqueo de cliente redundante al middleware
    if (isMounted && !isLoading) {
      if (!isAuthenticated || user?.role !== 'PROVEEDOR') {
        router.replace('/login');
      }
    }
  }, [isAuthenticated, user, isLoading, isMounted, router]);

  // Bloqueo visual preventivo: No renderiza nada si hay dudas sobre la sesión o el rol
  if (!isMounted || isLoading || !isAuthenticated || user?.role !== 'PROVEEDOR') {
    return (
      <div className="fixed inset-0 z-[9999] bg-surface-container-lowest flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <p className="text-[10px] font-black text-primary/40 uppercase tracking-[0.2em] animate-pulse">Protección de Socio Activa</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-surface-container-lowest animate-fade-in relative selection:bg-blue-500/20">
      <LandlordSidebar />
      <main className="flex-1 overflow-y-auto pl-[280px]">
        <div className="max-w-[1400px] mx-auto p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
