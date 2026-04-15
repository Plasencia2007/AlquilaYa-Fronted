'use client';

import Link from 'next/link';
import { MOCK_PROPERTIES } from '@/mocks';

export default function Home() {
  const featuredProperties = MOCK_PROPERTIES.filter(p => p.available).slice(0, 3);

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
          <div className="bg-white/95 backdrop-blur-[24px] p-2 rounded-2xl editorial-shadow flex flex-col md:flex-row gap-2 max-w-3xl border border-white/20 shadow-2xl">
            <div className="flex-1 flex items-center px-4 gap-3 py-4 border-r border-outline-variant/20">
              <span className="material-symbols-outlined text-primary">location_on</span>
              <input 
                className="bg-transparent border-none focus:ring-0 w-full placeholder:text-outline font-medium text-on-surface" 
                placeholder="¿Dónde quieres vivir?" 
                type="text"
              />
            </div>
            <div className="flex-1 flex items-center px-4 gap-3 py-4 md:border-r border-outline-variant/20">
              <span className="material-symbols-outlined text-primary">calendar_today</span>
              <input 
                className="bg-transparent border-none focus:ring-0 w-full placeholder:text-outline font-medium text-on-surface" 
                placeholder="Fecha de ingreso" 
                type="text"
              />
            </div>
            <button className="bg-primary text-on-primary px-10 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary-container transition-all active:scale-95 shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined">search</span>
              Buscar
            </button>
          </div>
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
            <div className="md:col-span-2 relative group rounded-[2.5rem] overflow-hidden min-h-[550px] editorial-shadow">
              <img 
                src={featuredProperties[0].images[0]} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                alt={featuredProperties[0].title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-on-surface/90 via-on-surface/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 sm:p-12 text-white w-full flex flex-col sm:flex-row justify-between items-end gap-6">
                <div className="flex-1">
                  <span className="bg-secondary-container text-on-secondary-container px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block backdrop-blur-md">
                    Más popular
                  </span>
                  <h3 className="text-4xl font-black mb-2 leading-tight">{featuredProperties[0].title}</h3>
                  <p className="flex items-center gap-1 opacity-90 text-lg">
                    <span className="material-symbols-outlined text-sm">location_on</span> {featuredProperties[0].location}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-4xl font-black mb-6">S/ {featuredProperties[0].price}<span className="text-lg font-normal opacity-70">/mes</span></p>
                  <Link href={`/property/${featuredProperties[0].id}`} className="bg-white text-primary px-10 py-4 rounded-full font-bold hover:bg-primary-fixed transition-all block text-center shadow-xl">
                    Ver detalles
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Stacked Vertical Cards */}
          <div className="flex flex-col gap-8">
            {featuredProperties.slice(1, 3).map((property) => (
              <div key={property.id} className="bg-surface-container-lowest rounded-[2rem] overflow-hidden editorial-shadow group flex flex-col flex-1">
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
              </div>
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
          <div className="p-10 rounded-[3rem] bg-surface-container-lowest border border-outline-variant/10 editorial-shadow text-center flex flex-col items-center group hover:-translate-y-2 transition-transform duration-500">
            <div className="w-20 h-20 bg-primary-fixed rounded-3xl flex items-center justify-center mb-8 shadow-inner transition-colors group-hover:bg-primary group-hover:text-on-primary">
              <span className="material-symbols-outlined text-4xl">school</span>
            </div>
            <h3 className="text-3xl font-black mb-4">Estudiantes</h3>
            <p className="text-on-surface-variant mb-10 leading-relaxed text-lg">Encuentra el cuarto ideal cerca de tu universidad. Filtra por precio, servicios y reseñas reales.</p>
            <ul className="space-y-4 text-left w-full mb-10">
              <li className="flex items-center gap-4 text-sm font-semibold"><span className="material-symbols-outlined text-primary">check_circle</span> Búsqueda inteligente</li>
              <li className="flex items-center gap-4 text-sm font-semibold"><span className="material-symbols-outlined text-primary">check_circle</span> Filtros Universitarios</li>
            </ul>
            <button className="w-full py-5 rounded-full border-2 border-primary text-primary font-bold hover:bg-primary hover:text-on-primary transition-all duration-300">
              Empezar a buscar
            </button>
          </div>

          {/* Providers Card (Premium Dark) */}
          <div className="p-10 rounded-[3rem] bg-primary text-on-primary editorial-shadow text-center flex flex-col items-center relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500 shadow-2xl shadow-primary/30">
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
            <button className="w-full py-5 rounded-full bg-white text-primary font-bold hover:bg-primary-fixed transition-all duration-300 shadow-xl">
              Publicar mi cuarto
            </button>
          </div>

          {/* Admin Card */}
          <div className="p-10 rounded-[3rem] bg-surface-container-lowest border border-outline-variant/10 editorial-shadow text-center flex flex-col items-center group hover:-translate-y-2 transition-transform duration-500">
            <div className="w-20 h-20 bg-secondary-fixed rounded-3xl flex items-center justify-center mb-8 shadow-inner group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
              <span className="material-symbols-outlined text-4xl">shield_person</span>
            </div>
            <h3 className="text-3xl font-black mb-4">Administradores</h3>
            <p className="text-on-surface-variant mb-10 leading-relaxed text-lg">Control total sobre la plataforma. Valida usuarios, media disputas y analiza métricas en tiempo real.</p>
            <ul className="space-y-4 text-left w-full mb-10">
              <li className="flex items-center gap-4 text-sm font-semibold"><span className="material-symbols-outlined text-secondary">check_circle</span> Moderación Avanzada</li>
              <li className="flex items-center gap-4 text-sm font-semibold"><span className="material-symbols-outlined text-secondary">check_circle</span> Reportes de IA</li>
            </ul>
            <button className="w-full py-5 rounded-full border-2 border-secondary text-secondary font-bold hover:bg-secondary hover:text-on-secondary transition-all duration-300">
              Gestión Central
            </button>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-24 px-6 sm:px-12 relative overflow-hidden">
        <div className="bg-surface-container-highest rounded-[4rem] overflow-hidden flex flex-col lg:flex-row items-center editorial-shadow">
          <div className="flex-1 p-12 sm:p-20 text-center lg:text-left">
            <h2 className="text-4xl sm:text-[4rem] font-extrabold leading-[1.1] mb-8 tracking-tighter">Convierte tu espacio en una fuente de ingresos.</h2>
            <p className="text-xl text-on-surface-variant mb-12 max-w-xl mx-auto lg:mx-0 leading-relaxed">Únete a cientos de proveedores que confían en AlquilaYa para gestionar sus propiedades con seguridad.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-primary text-on-primary px-12 py-5 rounded-full font-bold text-lg hover:shadow-2xl hover:-translate-y-1 transition-all">
                Publicar mi cuarto
              </button>
              <button className="bg-white border border-outline-variant/30 text-on-surface px-12 py-5 rounded-full font-bold text-lg hover:bg-surface-container-low transition-all">
                Guía para anfitriones
              </button>
            </div>
          </div>
          <div className="flex-1 w-full h-[400px] lg:h-full lg:min-h-[600px] relative">
            <img 
              alt="Happy Provider" 
              className="absolute inset-0 w-full h-full object-cover" 
              src="https://images.unsplash.com/photo-1557053910-d9eadeed1c58?q=80&w=1974&auto=format&fit=crop"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
