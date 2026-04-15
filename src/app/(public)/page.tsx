'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/features/auth/AuthProvider';
import { MOCK_PROPERTIES } from '@/mocks';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';

export default function Home() {
  const { isAuthenticated, user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      if (user.role === 'PROVEEDOR') {
        router.replace('/landlord/dashboard');
      } else if (user.role === 'ADMIN') {
        router.replace('/admin-master');
      }
    }
  }, [isAuthenticated, user, isLoading, router]);

  const featuredProperties = MOCK_PROPERTIES.filter(p => p.available).slice(0, 3);

  // Si está logueado y se está redirigiendo, mostramos loading para evitar flicker del home
  if (!isLoading && isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* ── Hero Section ── */}
      <section className="relative min-h-screen flex items-center px-6 sm:px-12 overflow-hidden mb-12">

        <div className="absolute inset-0 z-0">
          <img 
            alt="Modern living" 
            className="w-full h-full object-cover" 
            src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/20"></div>
        </div>

        <div className="relative z-10 max-w-4xl animate-fade-in">
          <span className="text-blue-300 font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
            Curated Living for the Modern Professional
          </span>
          <h1 className="text-5xl md:text-[5rem] font-extrabold leading-[1] tracking-tighter text-white mb-8 max-w-2xl">
            Encuentra tu próximo hogar con <span className="text-blue-300">AlquilaYa</span>.
          </h1>

          {/* Glass Search Bar */}
          <Card variant="glass" padding="none" className="flex flex-col md:flex-row gap-2 max-w-3xl backdrop-blur-[24px] pointer-events-auto p-2" hoverable={false}>
            <div className="flex-1 flex items-center px-4 gap-3 py-4 border-r border-outline-variant/20">
              <span className="material-symbols-outlined text-primary">location_on</span>
              <input 
                className="bg-transparent border-none focus:outline-none w-full placeholder:text-outline font-medium text-on-surface" 
                placeholder="¿Dónde quieres vivir?" 
                type="text"
              />
            </div>
            <div className="flex-1 flex items-center px-4 gap-3 py-4 md:border-r border-outline-variant/20">
              <span className="material-symbols-outlined text-primary">calendar_today</span>
              <input 
                className="bg-transparent border-none focus:outline-none w-full placeholder:text-outline font-medium text-on-surface" 
                placeholder="Fecha de ingreso" 
                type="text"
              />
            </div>
            <Button size="lg" className="rounded-xl px-10" leftIcon={<span className="material-symbols-outlined">search</span>}>
              Buscar
            </Button>
          </Card>
        </div>
      </section>

      {/* ── Habitaciones Destacadas (Bento Grid) ── */}
      <section className="py-24 px-6 sm:px-12 bg-surface-container-low">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <h2 className="text-4xl font-extrabold tracking-tight mb-3 text-on-surface">Habitaciones Destacadas</h2>
            <p className="text-on-surface-variant max-w-lg">Residencias seleccionadas a mano, diseñadas para el confort, la productividad y la conexión.</p>
          </div>
          <Link href="/search" className="text-primary font-bold flex items-center gap-2 group transition-all">
            Explorar todas 
            <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Large Hero Card (Bento Style) */}
          {featuredProperties[0] && (
            <Card padding="none" className="md:col-span-2 relative min-h-[550px]" hoverable>
              <img 
                src={featuredProperties[0].images[0]} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                alt={featuredProperties[0].title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-on-surface/90 via-on-surface/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 sm:p-12 text-white w-full flex flex-col sm:flex-row justify-between items-end gap-6">
                <div className="flex-1">
                  <Badge variant="secondary" className="mb-4">
                    Más popular
                  </Badge>
                  <h3 className="text-4xl font-black mb-2 leading-tight">{featuredProperties[0].title}</h3>
                  <p className="flex items-center gap-1 opacity-90 text-lg">
                    <span className="material-symbols-outlined text-sm">location_on</span> {featuredProperties[0].location}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-4xl font-black mb-6">S/ {featuredProperties[0].price}<span className="text-lg font-normal opacity-70">/mes</span></p>
                  <Button variant="white" size="lg" className="px-10" asChild>
                    <Link href={`/property/${featuredProperties[0].id}`}>Ver detalles</Link>
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Stacked Vertical Cards */}
          <div className="flex flex-col gap-8">
            {featuredProperties.slice(1, 3).map((property) => (
              <Card key={property.id} padding="none" className="flex flex-col flex-1 group">
                <div className="relative h-48 overflow-hidden">
                  <img src={property.images[0]} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={property.title} />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1 text-sm font-bold text-on-surface shadow-sm">
                    <span className="material-symbols-outlined text-yellow-500 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    {property.rating}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <h4 className="font-bold text-xl text-on-surface leading-snug">{property.title}</h4>
                      <p className="font-black text-primary text-lg">S/ {property.price}</p>
                    </div>
                    <p className="text-sm text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm text-outline">location_on</span>
                      {property.location}
                    </p>
                  </div>
                  <Link href={`/property/${property.id}`} className="text-primary font-bold flex items-center gap-1 hover:underline mt-4 text-sm group/btn">
                    Conocer más <span className="material-symbols-outlined text-sm transition-transform group-hover/btn:translate-x-1">chevron_right</span>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── User Types Section ── */}
      <section className="py-24 px-6 sm:px-12 bg-surface">
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="text-5xl font-extrabold mb-4 tracking-tighter">Diseñado para cada necesidad</h2>
          <p className="text-on-surface-variant text-xl">Una plataforma, tres experiencias personalizadas.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Students Card */}
          <Card padding="lg" className="text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-primary-fixed rounded-3xl flex items-center justify-center mb-8 shadow-inner transition-colors group-hover:bg-primary group-hover:text-on-primary">
              <span className="material-symbols-outlined text-4xl">school</span>
            </div>
            <h3 className="text-3xl font-black mb-4">Estudiantes</h3>
            <p className="text-on-surface-variant mb-10 leading-relaxed text-lg">Encuentra el cuarto ideal cerca de tu universidad. Filtra por precio, servicios y reseñas reales.</p>
            <ul className="space-y-4 text-left w-full mb-10">
              <li className="flex items-center gap-4 text-sm font-semibold"><span className="material-symbols-outlined text-primary font-black">check_circle</span> Búsqueda inteligente</li>
              <li className="flex items-center gap-4 text-sm font-semibold"><span className="material-symbols-outlined text-primary font-black">check_circle</span> Filtros Universitarios</li>
            </ul>
            <Button variant="outline" size="xl" className="w-full">
              Empezar a buscar
            </Button>
          </Card>

          {/* Providers Card (Premium Dark) */}
          <Card padding="lg" variant="surface" className="bg-primary text-on-primary text-center flex flex-col items-center relative overflow-hidden shadow-2xl shadow-primary/30">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center mb-8 shadow-inner">
              <span className="material-symbols-outlined text-white text-4xl">real_estate_agent</span>
            </div>
            <h3 className="text-3xl font-black mb-4">Proveedores</h3>
            <p className="text-blue-100 mb-10 leading-relaxed text-lg">Monetiza tus espacios vacíos. Gestiona tus rentas de forma profesional y eficiente desde tu celular.</p>
            <ul className="space-y-4 text-left w-full mb-10">
              <li className="flex items-center gap-4 text-sm font-semibold"><span className="material-symbols-outlined text-white/70">check_circle</span> Dashboard de gestión</li>
              <li className="flex items-center gap-4 text-sm font-semibold"><span className="material-symbols-outlined text-white/70">check_circle</span> Pagos automatizados</li>
            </ul>
            <Button variant="white" size="xl" className="w-full">
              Publicar mi cuarto
            </Button>
          </Card>

          {/* Admin Card */}
          <Card padding="lg" className="text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-secondary-fixed rounded-3xl flex items-center justify-center mb-8 shadow-inner group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
              <span className="material-symbols-outlined text-4xl">shield_person</span>
            </div>
            <h3 className="text-3xl font-black mb-4">Administradores</h3>
            <p className="text-on-surface-variant mb-10 leading-relaxed text-lg">Control total sobre la plataforma. Valida usuarios, media disputas y analiza métricas en tiempo real.</p>
            <ul className="space-y-4 text-left w-full mb-10">
              <li className="flex items-center gap-4 text-sm font-semibold"><span className="material-symbols-outlined text-secondary font-black">check_circle</span> Moderación Avanzada</li>
              <li className="flex items-center gap-4 text-sm font-semibold"><span className="material-symbols-outlined text-secondary font-black">check_circle</span> Reportes de IA</li>
            </ul>
            <Button variant="outline" size="xl" className="w-full border-secondary text-secondary hover:bg-secondary hover:text-on-secondary">
              Gestión Central
            </Button>
          </Card>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-24 px-6 sm:px-12 relative overflow-hidden">
        <Card padding="none" variant="surface" className="bg-surface-container-highest flex flex-col lg:flex-row items-center" hoverable={false}>
          <div className="flex-1 p-12 sm:p-20 text-center lg:text-left">
            <h2 className="text-4xl sm:text-[4rem] font-extrabold leading-[1.1] mb-8 tracking-tighter">Convierte tu espacio en una fuente de ingresos.</h2>
            <p className="text-xl text-on-surface-variant mb-12 max-w-xl mx-auto lg:mx-0 leading-relaxed">Únete a cientos de proveedores que confían en AlquilaYa para gestionar sus propiedades con seguridad.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="xl" className="px-12">
                Publicar mi cuarto
              </Button>
              <Button variant="ghost" size="xl" className="px-12 border border-outline-variant/30 bg-white">
                Guía para anfitriones
              </Button>
            </div>
          </div>
          <div className="flex-1 w-full h-[400px] lg:h-full lg:min-h-[600px] relative">
            <img 
              alt="Happy Provider" 
              className="absolute inset-0 w-full h-full object-cover" 
              src="https://images.unsplash.com/photo-1557053910-d9eadeed1c58?q=80&w=1974&auto=format&fit=crop"
            />
          </div>
        </Card>
      </section>
    </main>
  );
}
