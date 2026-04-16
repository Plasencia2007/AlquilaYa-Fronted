import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function decodeTokenPayload(token: string) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    return JSON.parse(atob(parts[1]));
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  const { pathname } = request.nextUrl;

  const payload = token ? decodeTokenPayload(token) : null;
  const role = payload?.role || null;
  const isExpired = payload ? payload.exp < Math.floor(Date.now() / 1000) : true;
  const isAuthenticated = !!payload && !isExpired;

  let response: NextResponse;

  // --- 1. Rutas de autenticación (/login, /register) ---
  if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
    if (isAuthenticated && role) {
      if (role === 'ADMIN') {
        response = NextResponse.redirect(new URL('/admin-master', request.url));
      } else if (role === 'PROVEEDOR') {
        response = NextResponse.redirect(new URL('/landlord/dashboard', request.url));
      } else {
        response = NextResponse.redirect(new URL('/', request.url));
      }
    } else {
      response = NextResponse.next();
    }
  }
  // --- 2. Rutas de administrador (/admin-master) ---
  else if (pathname.startsWith('/admin-master')) {
    if (!isAuthenticated) {
      response = NextResponse.redirect(new URL('/login', request.url));
    } else if (role !== 'ADMIN') {
      response = NextResponse.redirect(new URL('/', request.url));
    } else {
      response = NextResponse.next();
    }
  }
  // --- 3. Rutas de proveedor (/landlord) ---
  else if (pathname.startsWith('/landlord')) {
    if (!isAuthenticated) {
      response = NextResponse.redirect(new URL('/login', request.url));
    } else if (role !== 'PROVEEDOR') {
      response = NextResponse.redirect(new URL('/', request.url));
    } else {
      response = NextResponse.next();
    }
  }
  // --- 4. Rutas de estudiante (/student) ---
  else if (pathname.startsWith('/student')) {
    if (!isAuthenticated) {
      response = NextResponse.redirect(new URL('/login', request.url));
    } else if (role !== 'ESTUDIANTE') {
      response = NextResponse.redirect(new URL('/', request.url));
    } else {
      response = NextResponse.next();
    }
  }
  // --- Rutas públicas ---
  else {
    response = NextResponse.next();
  }

  // ESTRATEGIA SEGURIDAD 1000%: Desactivar caché en rutas privadas para evitar
  // que el navegador muestre versiones cacheadas (bfcache) al usar el botón "Atrás".
  if (
    pathname.startsWith('/admin-master') || 
    pathname.startsWith('/landlord') || 
    pathname.startsWith('/student')
  ) {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    response.headers.set('Surrogate-Control', 'no-store');
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|rooms).*)',
  ],
};
