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
    const text = encodeURIComponent(`¡Hola ${storeName}! Quisiera consultar por los juguetes.`);
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 sm:gap-6">
        
        {/* Left: Brand & Nav Links */}
        <div className="flex items-center gap-6 sm:gap-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-black tracking-tight text-slate-900">
              {storeName}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2">
            <Link
              href="/"
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
                pathname === '/'
                  ? 'bg-sky-100 text-sky-800'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Inicio
            </Link>
            <Link
              href="/catalogo"
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
                pathname === '/catalogo'
                  ? 'bg-sky-100 text-sky-800'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Catálogo
            </Link>
          </nav>
        </div>

        {/* Center: Search input if in catalog, or quick link */}
        {onSearchChange ? (
          <div className="hidden lg:flex flex-1 max-w-xs relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar juguetes..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs font-medium bg-slate-50 focus:bg-white rounded-full border border-slate-200 focus:border-sky-400 outline-hidden transition-all text-slate-900 placeholder-slate-400"
            />
          </div>
        ) : (
          <div className="hidden lg:flex">
            <Link
              href="/catalogo"
              className="text-xs font-medium text-slate-500 hover:text-slate-800 flex items-center gap-2 transition-colors py-1.5 px-4 rounded-full bg-slate-100 hover:bg-slate-200/60"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>Buscar en el catálogo...</span>
            </Link>
          </div>
        )}

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {/* WhatsApp Direct */}
          <button
            onClick={handleWhatsAppGeneral}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" />
            <span>WhatsApp</span>
          </button>

          {/* Admin link */}
          <Link
            href="/admin"
            title="Administración"
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
          >
            <Shield className="w-4 h-4" />
          </Link>

          {/* Cart Trigger Button */}
          <button
            onClick={openCart}
            className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Mi Pedido</span>
            {totalItems > 0 && (
              <span className="inline-flex items-center justify-center min-w-[18px] h-4 px-1 text-[10px] font-bold text-sky-800 bg-white rounded-full">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-slate-700 hover:text-slate-900 rounded-full hover:bg-slate-100"
            aria-label="Menú"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-slate-800" /> : <Menu className="w-5 h-5 text-slate-700" />}
          </button>
        </div>
      </div>

      {/* Mobile search bar if on catalog */}
      {onSearchChange && (
        <div className="lg:hidden px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar en el catálogo..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 focus:bg-white rounded-full border border-slate-200 outline-hidden text-slate-900"
            />
          </div>
        </div>
      )}

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-3 shadow-sm animate-in slide-in-from-top-1">
          <nav className="flex flex-col space-y-2 text-sm font-bold text-slate-800">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`p-2 rounded-lg transition-colors ${
                pathname === '/' ? 'bg-sky-50 text-sky-700' : 'hover:bg-slate-50'
              }`}
            >
              Inicio
            </Link>
            <Link
              href="/catalogo"
              onClick={() => setMobileMenuOpen(false)}
              className={`p-2 rounded-lg transition-colors ${
                pathname === '/catalogo' ? 'bg-sky-50 text-sky-700' : 'hover:bg-slate-50'
              }`}
            >
              Catálogo
            </Link>
          </nav>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleWhatsAppGeneral();
              }}
              className="w-full py-2.5 px-4 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center justify-center gap-2 border border-emerald-200"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" />
              <span>WhatsApp de la Tienda</span>
            </button>

            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2 px-4 rounded-full text-slate-500 text-xs text-center bg-slate-50 hover:bg-slate-100 font-semibold"
            >
              Panel de Administración
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}