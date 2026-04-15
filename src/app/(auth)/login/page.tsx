'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/features/auth/AuthProvider';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const success = await login(email, password);

    if (success) {
      router.push('/');
    } else {
      setError('Credenciales incorrectas. Intenta de nuevo.');
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-surface-container-lowest rounded-[2.5rem] editorial-shadow border border-outline-variant/10 p-10 animate-scale-in">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-black text-on-surface tracking-tight mb-2">Bienvenido de vuelta</h1>
        <p className="text-on-surface-variant font-medium opacity-70">Gestiona tu espacio o encuentra tu hogar.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-bold text-on-surface ml-1">
            Correo electrónico
          </label>
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">mail</span>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tucorreo@ejemplo.com"
              required
              className="w-full pl-12 pr-4 py-4 bg-surface-container-low border border-outline-variant/20 rounded-2xl text-on-surface placeholder:text-outline/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <div className="flex justify-between items-center ml-1">
            <label htmlFor="password" className="block text-sm font-bold text-on-surface">
              Contraseña
            </label>
            <Link href="#" className="text-xs font-bold text-primary hover:underline">¿La olvidaste?</Link>
          </div>
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">lock</span>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full pl-12 pr-12 py-4 bg-surface-container-low border border-outline-variant/20 rounded-2xl text-on-surface placeholder:text-outline/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors"
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
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 bg-primary text-on-primary font-bold rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Verificando...
            </>
          ) : (
            'Ingresar a mi cuenta'
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-4 my-8">
        <div className="flex-1 h-px bg-outline-variant/20" />
        <span className="text-[10px] font-bold text-outline uppercase tracking-widest">O accede con</span>
        <div className="flex-1 h-px bg-outline-variant/20" />
      </div>

      {/* Google (disabled) */}
      <button
        disabled
        className="w-full py-3.5 border border-outline-variant/30 rounded-full text-sm font-bold text-outline cursor-not-allowed flex items-center justify-center gap-3 transition-colors"
      >
        <svg className="w-5 h-5 opacity-50" viewBox="0 0 24 24"><path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/></svg>
        Cuenta Google
      </button>

      {/* Link a registro */}
      <p className="text-center text-sm text-on-surface-variant font-medium mt-10">
        ¿Aún no tienes cuenta?{' '}
        <Link href="/register" className="text-primary font-bold hover:underline">
          Únete ahora
        </Link>
      </p>

      {/* Test Credentials Placeholder - Made more discreet */}
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
    </div>
  );
}

