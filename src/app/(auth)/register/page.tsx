'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserRole } from '@/types/auth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

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
    <Card variant="glass" padding="lg" className="animate-scale-in" hoverable={false}>
      <div className="text-center mb-10">
        <h1 className="text-4xl font-black text-on-surface tracking-tighter mb-2">Crea tu cuenta</h1>
        <p className="text-on-surface-variant text-sm font-medium opacity-70">Únete a la nueva era del alquiler urbano.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nombre */}
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-bold text-on-surface ml-1">
            Nombre completo
          </label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre completo"
            icon="person"
            required
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="register-email" className="block text-sm font-bold text-on-surface ml-1">
            Correo electrónico
          </label>
          <Input
            id="register-email"
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
          <label htmlFor="register-password" className="block text-sm font-bold text-on-surface ml-1">
            Contraseña
          </label>
          <div className="relative">
            <Input
              id="register-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              icon="lock"
              required
              minLength={6}
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

        {/* Role selector */}
        <div className="space-y-3">
          <label className="block text-sm font-bold text-on-surface ml-1">
            ¿Cómo usarás AlquilaYa?
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setRole('ESTUDIANTE')}
              className={`p-4 rounded-2xl border-2 text-center transition-all duration-300 flex flex-col items-center gap-2 ${
                role === 'ESTUDIANTE'
                  ? 'border-primary bg-primary/5 text-primary ring-4 ring-primary/10'
                  : 'border-outline-variant/20 text-on-surface-variant hover:border-outline/30 hover:bg-surface-container-low'
              }`}
            >
              <span className="material-symbols-outlined text-2xl">school</span>
              <p className="text-[10px] font-black uppercase tracking-wider">Estudiante</p>
            </button>
            <button
              type="button"
              onClick={() => setRole('PROVEEDOR')}
              className={`p-4 rounded-2xl border-2 text-center transition-all duration-300 flex flex-col items-center gap-2 ${
                role === 'PROVEEDOR'
                  ? 'border-primary bg-primary/5 text-primary ring-4 ring-primary/10'
                  : 'border-outline-variant/20 text-on-surface-variant hover:border-outline/30 hover:bg-surface-container-low'
              }`}
            >
              <span className="material-symbols-outlined text-2xl">real_estate_agent</span>
              <p className="text-[10px] font-black uppercase tracking-wider">Proveedor</p>
            </button>
          </div>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          isLoading={isLoading}
          className="w-full mt-4"
          size="lg"
        >
          Empezar ahora
        </Button>
      </form>

      <p className="text-center text-sm text-on-surface-variant font-medium mt-10">
        ¿Ya eres miembro?{' '}
        <Link href="/login" className="text-primary font-bold hover:underline">
          Inicia sesión
        </Link>
      </p>
    </Card>
  );
}

