'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/features/auth/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated, user, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthLoading && isAuthenticated && user) {
      if (user.role === 'PROVEEDOR') {
        router.replace('/landlord/dashboard');
      } else if (user.role === 'ADMIN') {
        router.replace('/admin-master');
      } else {
        router.replace('/');
      }
    }
  }, [isAuthenticated, user, isAuthLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const user = await login(email, password);

    if (user) {
      if (user.role === 'PROVEEDOR') {
        router.push('/landlord/dashboard');
      } else if (user.role === 'ADMIN') {
        router.push('/admin-master');
      } else {
        router.push('/');
      }
    } else {
      setError('Credenciales incorrectas. Intenta de nuevo.');
    }
    setIsLoading(false);
  };

  return (
    <Card variant="glass" padding="lg" className="animate-scale-in" hoverable={false}>
      <div className="text-center mb-10">
        <h1 className="text-4xl font-black text-on-surface tracking-tighter mb-2">Bienvenido de vuelta</h1>
        <p className="text-on-surface-variant text-sm font-medium opacity-70">Gestiona tu espacio o encuentra tu hogar.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-bold text-on-surface ml-1">
            Correo electrónico
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tucorreo@ejemplo.com"
            icon="mail"
            required
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <div className="flex justify-between items-center ml-1">
            <label htmlFor="password" className="block text-sm font-bold text-on-surface">
              Contraseña
            </label>
            <Link href="#" className="text-xs font-bold text-primary hover:underline">¿La olvidaste?</Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              icon="lock"
              required
              className="pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors z-10"
            >
              <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="p-4 bg-error-container/20 text-error text-xs font-bold rounded-xl border border-error/10 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">error</span>
            {error}
          </div>
        )}

        {/* Submit */}
        <Button
          type="submit"
          isLoading={isLoading}
          className="w-full mt-4"
          size="lg"
        >
          Ingresar a mi cuenta
        </Button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-4 my-8">
        <div className="flex-1 h-px bg-outline-variant/20" />
        <span className="text-[10px] font-bold text-outline uppercase tracking-widest">O accede con</span>
        <div className="flex-1 h-px bg-outline-variant/20" />
      </div>

      {/* Google (disabled) */}
      <Button
        variant="ghost"
        disabled
        className="w-full border border-outline-variant/30"
        leftIcon={<svg className="w-5 h-5 opacity-50" viewBox="0 0 24 24"><path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" /></svg>}
      >
        Cuenta Google
      </Button>

      {/* Link a registro */}
      <p className="text-center text-sm text-on-surface-variant font-medium mt-10">
        ¿Aún no tienes cuenta?{' '}
        <Link href="/register" className="text-primary font-bold hover:underline">
          Únete ahora
        </Link>
      </p>

      {/* Test Credentials Placeholder */}
      <div className="mt-8 p-5 bg-surface-container-low/50 rounded-2xl border border-outline-variant/10 group overflow-hidden">
        <p className="text-[10px] font-black text-outline uppercase tracking-wider mb-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">terminal</span> Modo Desarrollo (Mocks)
        </p>
        <div className="space-y-2 text-[11px] text-on-surface-variant opacity-80 font-medium">
          <p>• <span className="text-on-surface font-bold">Estudiante:</span> estudiante@test.com / 123456</p>
          <p>• <span className="text-on-surface font-bold">Proveedor:</span> proveedor@test.com / 123456</p>
          <p>• <span className="text-on-surface font-bold">Admin:</span> admin@test.com / 123456</p>
        </div>
      </div>
    </Card>
  );
}

