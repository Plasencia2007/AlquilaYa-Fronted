import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Este middleware servirá para proteger las rutas en (private)
export function middleware(request: NextRequest) {
  // Por ahora no realiza ninguna acción
  return NextResponse.next();
}

// Configuración de las rutas que el middleware debe observar
export const config = {
  matcher: [
    /*
     * Coincidir con todas las rutas excepto:
     * - api (rutas de API de Next.js)
     * - _next/static (archivos estáticos)
     * - _next/image (optimización de imágenes)
     * - favicon.ico (archivo de favicon)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
