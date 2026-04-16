'use client';

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

  // --- 1. Rutas de autenticación (/login, /register) ---
  // Seguridad 1000%: Si ya está logueado, redirigir a su dashboard correspondiente
  if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
    if (isAuthenticated && role) {
      if (role === 'ADMIN') {
        return NextResponse.redirect(new URL('/admin-master', request.url));
      }
      if (role === 'PROVEEDOR') {
        return NextResponse.redirect(new URL('/landlord/dashboard', request.url));
      }
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // --- 2. Rutas de administrador (/admin-master) ---
  if (pathname.startsWith('/admin-master')) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    if (role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // --- 3. Rutas de proveedor (/landlord) ---
  if (pathname.startsWith('/landlord')) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    if (role !== 'PROVEEDOR') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // --- 4. Rutas de estudiante (/student) ---
  if (pathname.startsWith('/student')) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    if (role !== 'ESTUDIANTE') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // --- Rutas públicas y recursos: pasar sin restricción ---
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - rooms (public assets)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|rooms).*)',
  ],
};
