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

  // --- Rutas de auth (login/register) ---
  // Si ya está logueado, redirigir a home
  if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // --- Rutas de estudiante ---
  if (pathname.startsWith('/student')) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    if (role !== 'ESTUDIANTE') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // --- Rutas de proveedor ---
  if (pathname.startsWith('/landlord')) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    if (role !== 'PROVEEDOR') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // --- Rutas de admin ---
  if (pathname.startsWith('/admin-master')) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    if (role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // --- Rutas públicas: pasar sin restricción ---
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|rooms).*)',
  ],
};
