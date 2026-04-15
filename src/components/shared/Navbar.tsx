'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/features/auth/AuthProvider';
import { Menu, X, User, LogOut, ShieldCheck, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-outline-variant/10 px-6 sm:px-12 py-4 flex justify-between items-center transition-all duration-300 editorial-shadow">
      {/* ── Left Side: Logo & Navigation ── */}
      <div className="flex items-center gap-12">
        <Link href="/" className="flex items-center gap-2 group transition-transform active:scale-95">
          <span className="text-2xl font-black tracking-tighter text-primary">
            Alquila<span className="text-primary-container">Ya</span>
          </span>
        </Link>
        
        <div className="hidden md:flex gap-8 items-center">
          <Link href="/search" className="text-primary font-['Manrope'] font-bold tracking-tight border-b-2 border-primary pb-1 transition-all">
            Explorar Cuartos
          </Link>
          <Link href="#" className="text-on-surface-variant font-['Manrope'] font-bold tracking-tight hover:text-primary transition-all duration-300">
            Para Estudiantes
          </Link>
          <Link href="#" className="text-on-surface-variant font-['Manrope'] font-bold tracking-tight hover:text-primary transition-all duration-300">
            Para Proveedores
          </Link>
        </div>
      </div>

      {/* ── Right Side: Auth Actions ── */}
      <div className="flex items-center gap-4">
        {isAuthenticated && user ? (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-3 px-4 py-2 bg-surface-container-low rounded-full border border-outline-variant/20 hover:shadow-md transition-all group"
            >
              <div className="w-8 h-8 bg-primary text-on-primary rounded-full flex items-center justify-center text-sm font-bold shadow-inner">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="hidden sm:block text-sm font-bold text-on-surface-variant group-hover:text-primary">
                {user.name.split(' ')[0]}
              </span>
              <ChevronDown className={`w-4 h-4 text-outline transition-transform duration-300 ${menuOpen ? 'rotate-180' : ''}`} />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-surface-container-lowest rounded-2xl editorial-shadow border border-outline-variant/10 py-3 animate-scale-in overflow-hidden">
                <div className="px-5 py-3 border-b border-outline-variant/10 mb-2">
                  <p className="text-sm font-bold text-on-surface">{user.name}</p>
                  <p className="text-xs text-outline">{user.email}</p>
                </div>
                
                <Link href={user.role === 'PROVEEDOR' ? '/landlord/dashboard' : '/student/favorites'} 
                      className="flex items-center gap-3 px-5 py-2.5 text-sm font-medium text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[20px]">dashboard</span>
                  Panel de Control
                </Link>

                <button
                  onClick={() => { logout(); setMenuOpen(false); }}
                  className="flex items-center gap-3 w-full px-5 py-2.5 text-sm font-medium text-error hover:bg-error-container/20 transition-colors mt-2"
                >
                  <span className="material-symbols-outlined text-[20px]">logout</span>
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden sm:flex items-center gap-1.5 px-6 py-2.5 rounded-full font-bold text-on-surface-variant hover:bg-surface-container-low transition-all duration-300"
            >
              Log In
            </Link>
            <Link
              href="/register"
              className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-primary/20 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Sign Up
            </Link>
          </div>
        )}

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-full hover:bg-surface-container-low transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-on-surface" />}
        </button>
      </div>

      {/* ── Mobile Navigation Drawer ── */}
      {mobileOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-outline-variant/10 p-6 flex flex-col gap-6 animate-slide-down md:hidden glass-nav shadow-xl">
          <Link href="/search" className="text-lg font-bold text-primary flex items-center justify-between" onClick={() => setMobileOpen(false)}>
            Explorar Cuartos <span className="material-symbols-outlined">search</span>
          </Link>
          <Link href="#" className="text-lg font-bold text-on-surface-variant" onClick={() => setMobileOpen(false)}>
            Para Estudiantes
          </Link>
          <Link href="#" className="text-lg font-bold text-on-surface-variant" onClick={() => setMobileOpen(false)}>
            Para Proveedores
          </Link>
          {!isAuthenticated && (
            <div className="flex flex-col gap-3 pt-4 border-t border-outline-variant/10">
              <Link href="/login" className="w-full text-center py-4 rounded-2xl font-bold bg-surface-container-low" onClick={() => setMobileOpen(false)}>
                Identificarse
              </Link>
              <Link href="/register" className="w-full text-center py-4 rounded-2xl font-bold bg-primary text-on-primary shadow-lg" onClick={() => setMobileOpen(false)}>
                Registrarse
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
