'use client';

import Link from 'next/link';
import { Search, MapPin, Star, ArrowRight, Shield, Zap, HeartHandshake } from 'lucide-react';
import { MOCK_PROPERTIES } from '@/lib/mockData';

export default function Home() {
  const featuredProperties = MOCK_PROPERTIES.filter(p => p.available).slice(0, 6);

  return (
    <div>
      {/* ── Hero Section ── */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-[-120px] right-[-80px] w-[400px] h-[400px] bg-primary-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-[-100px] left-[-60px] w-[300px] h-[300px] bg-primary-400/15 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Encuentra tu
              <span className="block text-primary-200">cuarto ideal</span>
            </h1>
            <p className="text-lg text-primary-100 mb-8 leading-relaxed">
              Explora cientos de cuartos verificados cerca de tu universidad.
              Rápido, seguro y sin complicaciones.
            </p>

            {/* Search bar */}
            <div className="bg-white rounded-2xl p-2 shadow-2xl flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="¿Dónde buscas? (zona, distrito, universidad...)"
                  className="w-full pl-10 pr-4 py-3.5 text-gray-900 text-sm rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-gray-50"
                />
              </div>
              <button className="flex items-center justify-center gap-2 px-6 py-3.5 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors shrink-0">
                <Search className="w-4 h-4" />
                Buscar
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-10">
              <div>
                <p className="text-2xl font-bold">1,200+</p>
                <p className="text-sm text-primary-200">Cuartos activos</p>
              </div>
              <div>
                <p className="text-2xl font-bold">850+</p>
                <p className="text-sm text-primary-200">Estudiantes felices</p>
              </div>
              <div>
                <p className="text-2xl font-bold">98%</p>
                <p className="text-sm text-primary-200">Satisfacción</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Cuartos Destacados ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Cuartos Destacados</h2>
            <p className="text-gray-500 mt-1">Los más buscados esta semana</p>
          </div>
          <Link
            href="/search"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
          >
            Ver todos <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProperties.map((property, index) => (
            <Link
              key={property.id}
              href={`/property/${property.id}`}
              className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-gray-300 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image placeholder */}
              <div className="relative h-52 bg-gradient-to-br from-primary-100 to-primary-200 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary-300/50 rounded-2xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="w-8 h-8 text-primary-700" />
                    </div>
                    <p className="text-xs text-primary-600 font-medium">{property.type}</p>
                  </div>
                </div>
                {/* Price badge */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                  <span className="text-sm font-bold text-gray-900">S/ {property.price}</span>
                  <span className="text-xs text-gray-500">/mes</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-1">
                  {property.title}
                </h3>
                <div className="flex items-center gap-1 mt-1.5 text-sm text-gray-500">
                  <MapPin className="w-3.5 h-3.5" />
                  {property.location}
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium text-gray-900">{property.rating}</span>
                    <span className="text-xs text-gray-400">({property.reviews})</span>
                  </div>
                  <div className="flex gap-3 text-xs text-gray-500">
                    <span>{property.area}m²</span>
                    <span>{property.bedrooms} hab</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="sm:hidden mt-6 text-center">
          <Link
            href="/search"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600"
          >
            Ver todos los cuartos <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── Cómo funciona ── */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">¿Cómo funciona?</h2>
            <p className="text-gray-500 mt-2">Encontrar tu cuarto ideal es más fácil de lo que crees</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Search,
                title: 'Busca',
                description: 'Filtra por zona, precio, universidad cercana y amenidades. Encuentra justo lo que necesitas.',
              },
              {
                icon: Shield,
                title: 'Verifica',
                description: 'Todas las propiedades son verificadas por nuestro equipo. Fotos reales y datos confirmados.',
              },
              {
                icon: Zap,
                title: 'Reserva',
                description: 'Contacta al proveedor y reserva en minutos. Proceso 100% digital y seguro.',
              },
            ].map(({ icon: Icon, title, description }, i) => (
              <div key={title} className="text-center p-6 animate-fade-in" style={{ animationDelay: `${i * 150}ms` }}>
                <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-[-50px] right-[-50px] w-[200px] h-[200px] bg-primary-500/20 rounded-full blur-2xl" />
          <div className="relative">
            <HeartHandshake className="w-12 h-12 mx-auto mb-4 text-primary-200" />
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">¿Tienes un cuarto disponible?</h2>
            <p className="text-primary-100 mb-6 max-w-lg mx-auto">
              Únete como proveedor y llega a miles de estudiantes buscando alojamiento.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-700 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
            >
              Publicar mi cuarto <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
