'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, MessageCircle, Search, Menu, X, Shield } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { getWhatsAppNumber, getStoreName } from '@/lib/whatsapp';

interface NavbarProps {
  searchTerm?: string;
  onSearchChange?: (val: string) => void;
}

export function Navbar({ searchTerm = '', onSearchChange }: NavbarProps) {
  const { totalItems, openCart } = useCart();
  const phone = getWhatsAppNumber();
  const storeName = getStoreName();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleWhatsAppGeneral = () => {
    const text = encodeURIComponent(`¡Hola ${storeName}! Quisiera hacer una consulta sobre los productos.`);
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        
        {/* Left: Brand */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-lg font-black tracking-tight text-slate-900">
              {storeName.toUpperCase()}
            </span>
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
          </Link>

          {/* Desktop Clean Nav */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold tracking-wide text-slate-600 uppercase">
            <Link
              href="/"
              className={`transition-colors hover:text-slate-900 ${
                pathname === '/' ? 'text-slate-900 font-bold' : ''
              }`}
            >
              Inicio
            </Link>
            <Link
              href="/catalogo"
              className={`transition-colors hover:text-slate-900 ${
                pathname === '/catalogo' ? 'text-slate-900 font-bold' : ''
              }`}
            >
              Catálogo
            </Link>
          </nav>
        </div>

        {/* Center: Search input if in catalog, or quick link */}
        {onSearchChange ? (
          <div className="hidden lg:flex flex-1 max-w-xs relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 hover:bg-slate-100/70 focus:bg-white rounded-full border border-slate-200 focus:border-slate-400 outline-hidden transition-all text-slate-900 placeholder-slate-400"
            />
          </div>
        ) : (
          <div className="hidden lg:flex">
            <Link
              href="/catalogo"
              className="text-xs text-slate-400 hover:text-slate-700 flex items-center gap-2 transition-colors py-1 px-3 rounded-full hover:bg-slate-50"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Buscar en el catálogo...</span>
            </Link>
          </div>
        )}

        {/* Right: Actions */}
        <div className="flex items-center gap-4 sm:gap-5">
          {/* WhatsApp Direct */}
          <button
            onClick={handleWhatsAppGeneral}
            className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-700 hover:text-emerald-600 transition-colors cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>WhatsApp</span>
          </button>

          {/* Admin link */}
          <Link
            href="/admin"
            title="Administración"
            className="text-slate-400 hover:text-slate-700 transition-colors p-1"
          >
            <Shield className="w-4 h-4" />
          </Link>

          {/* Cart Trigger */}
          <button
            onClick={openCart}
            className="relative flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-all cursor-pointer shadow-xs"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Bolsa</span>
            {totalItems > 0 && (
              <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-slate-700 hover:text-slate-900"
            aria-label="Menú"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile search bar if on catalog */}
      {onSearchChange && (
        <div className="lg:hidden px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar en el catálogo..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 focus:bg-white rounded-xl border border-slate-200 outline-hidden text-slate-900"
            />
          </div>
        </div>
      )}

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 px-6 py-5 space-y-4 shadow-sm animate-in slide-in-from-top-1">
          <nav className="flex flex-col space-y-3 text-sm font-semibold text-slate-800 uppercase tracking-wide">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-1 ${pathname === '/' ? 'text-rose-600' : ''}`}
            >
              Inicio
            </Link>
            <Link
              href="/catalogo"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-1 ${pathname === '/catalogo' ? 'text-rose-600' : ''}`}
            >
              Catálogo
            </Link>
          </nav>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleWhatsAppGeneral();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-semibold flex items-center justify-center gap-2 border border-emerald-100"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Contactar por WhatsApp</span>
            </button>

            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2 px-4 rounded-xl text-slate-500 text-xs text-center hover:bg-slate-50"
            >
              Panel de Administración
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}