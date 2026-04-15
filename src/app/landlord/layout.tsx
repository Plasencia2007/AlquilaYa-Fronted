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
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  // Aseguramos que el componente se ha montado en el cliente para evitar hidratación parcial
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Si ya montamos, terminó de cargar y no estamos autenticados, expulsar al usuario
    if (isMounted && !isLoading && !isAuthenticated) {
      router.replace('/'); // Usamos replace para que no guarde el dashboard en el historial de navegación
    }
  }, [isAuthenticated, isLoading, isMounted, router]);

  // Bloqueo total: Si no estamos montados o si aún se está verificando la sesión,
  // NO renderizamos nada de la estructura del dashboard ni sus hijos.
  if (!isMounted || isLoading || !isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[9999] bg-surface-container-lowest flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <p className="text-[10px] font-black text-primary/40 uppercase tracking-[0.2em] animate-pulse">Verificando sesión segura</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-surface-container-lowest animate-fade-in">
      <LandlordSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-[1400px] mx-auto p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
