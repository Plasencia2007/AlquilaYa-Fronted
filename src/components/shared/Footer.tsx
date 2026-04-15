import Link from 'next/link';
import { Building } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <Building className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Alquila<span className="text-primary-400">Ya</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Tu plataforma de confianza para encontrar el cuarto ideal. Rápido, seguro y sin complicaciones.
            </p>
          </div>

          {/* Explorar */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Explorar</h3>
            <ul className="space-y-2">
              <li><Link href="/search" className="text-sm hover:text-white transition-colors">Buscar cuartos</Link></li>
              <li><Link href="/" className="text-sm hover:text-white transition-colors">Cuartos destacados</Link></li>
              <li><Link href="/" className="text-sm hover:text-white transition-colors">Mapa de zonas</Link></li>
            </ul>
          </div>

          {/* Proveedores */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Proveedores</h3>
            <ul className="space-y-2">
              <li><Link href="/register" className="text-sm hover:text-white transition-colors">Publicar cuarto</Link></li>
              <li><Link href="/" className="text-sm hover:text-white transition-colors">¿Cómo funciona?</Link></li>
              <li><Link href="/" className="text-sm hover:text-white transition-colors">Precios y planes</Link></li>
            </ul>
          </div>

          {/* Soporte */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Soporte</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm hover:text-white transition-colors">Centro de ayuda</Link></li>
              <li><Link href="/" className="text-sm hover:text-white transition-colors">Términos y condiciones</Link></li>
              <li><Link href="/" className="text-sm hover:text-white transition-colors">Política de privacidad</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">© 2026 AlquilaYa. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>Hecho con 💙 en Perú</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
