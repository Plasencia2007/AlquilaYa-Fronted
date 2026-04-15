'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { UserRole } from '@/types/auth';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('ESTUDIANTE');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simular registro
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    router.push('/login');
  };

  return (
    <div className="bg-surface-container-lowest rounded-[2.5rem] editorial-shadow border border-outline-variant/10 p-10 animate-scale-in">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-black text-on-surface tracking-tight mb-2">Crea tu cuenta</h1>
        <p className="text-on-surface-variant font-medium opacity-70">Únete a la nueva era del alquiler urbano.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nombre */}
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-bold text-on-surface ml-1">
            Nombre completo
          </label>
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">person</span>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre completo"
              required
              className="w-full pl-12 pr-4 py-4 bg-surface-container-low border border-outline-variant/20 rounded-2xl text-on-surface placeholder:text-outline/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="register-email" className="block text-sm font-bold text-on-surface ml-1">
            Correo electrónico
          </label>
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">mail</span>
            <input
              id="register-email"
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
          <label htmlFor="register-password" className="block text-sm font-bold text-on-surface ml-1">
            Contraseña
          </label>
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">lock</span>
            <input
              id="register-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              required
              minLength={6}
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

        {/* Role selector */}
        <div className="space-y-3">
          <label className="block text-sm font-bold text-on-surface ml-1">
            ¿Cómo usarás AlquilaYa?
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setRole('ESTUDIANTE')}
              className={`p-4 rounded-2xl border-2 text-center transition-all duration-300 flex flex-col items-center gap-1 ${
                role === 'ESTUDIANTE'
                  ? 'border-primary bg-primary/5 text-primary ring-4 ring-primary/10'
                  : 'border-outline-variant/20 text-on-surface-variant hover:border-outline/30 hover:bg-surface-container-low'
              }`}
            >
              <span className="material-symbols-outlined text-2xl">school</span>
              <p className="text-xs font-bold uppercase tracking-wider">Estudiante</p>
            </button>
            <button
              type="button"
              onClick={() => setRole('PROVEEDOR')}
              className={`p-4 rounded-2xl border-2 text-center transition-all duration-300 flex flex-col items-center gap-1 ${
                role === 'PROVEEDOR'
                  ? 'border-primary bg-primary/5 text-primary ring-4 ring-primary/10'
                  : 'border-outline-variant/20 text-on-surface-variant hover:border-outline/30 hover:bg-surface-container-low'
              }`}
            >
              <span className="material-symbols-outlined text-2xl">real_estate_agent</span>
              <p className="text-xs font-bold uppercase tracking-wider">Proveedor</p>
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 bg-primary text-on-primary font-bold rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Creando cuenta...
            </>
          ) : (
            'Empezar ahora'
          )}
        </button>
      </form>

      <p className="text-center text-sm text-on-surface-variant font-medium mt-10">
        ¿Ya eres miembro?{' '}
        <Link href="/login" className="text-primary font-bold hover:underline">
          Inicia sesión
        </Link>
      </p>
    </div>
  );
}

