'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth/AuthProvider';

export default function AuthLayout({
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
    // Protección anti-retroceso: Si el usuario ya está autenticado, no debe ver el login/registro
    if (isMounted && !isLoading && isAuthenticated && user) {
      if (user.role === 'ADMIN') {
        router.replace('/admin-master');
      } else if (user.role === 'PROVEEDOR') {
        router.replace('/landlord/dashboard');
      } else {
        router.replace('/');
      }
    }
  }, [isAuthenticated, user, isLoading, isMounted, router]);

  // Bloqueo visual mientras se verifica la sesión para evitar que el formulario parpadee
  if (!isMounted || isLoading || isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center z-[9999]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <p className="text-[10px] font-black text-primary/40 uppercase tracking-[0.2em] animate-pulse">Verificando acceso seguro</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-tertiary/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="w-full max-w-md animate-fade-in relative z-10">
        <div className="flex flex-col items-center justify-center gap-1 mb-10 transition-transform hover:scale-105 group cursor-default">
          <span className="text-4xl font-black tracking-tighter text-on-surface flex items-center gap-1">
            Alquila<span className="text-primary drop-shadow-sm">Ya</span>
            <span className="w-1.5 h-1.5 bg-tertiary rounded-full mt-4 animate-bounce" />
          </span>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-outline/40">Premium Housing</p>
        </div>
        {children}
      </div>
    </div>
  );
}
