'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, MessageCircle, Search, Menu, X, Shield, Sparkles } from 'lucide-react';
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
    const text = encodeURIComponent(`¡Hola ${storeName}! Quisiera hacer una consulta sobre los juguetes.`);
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-rose-100/80 shadow-xs">
      {/* Playful mini promo bar */}
      <div className="bg-linear-to-r from-amber-400 via-rose-500 to-indigo-500 text-white text-xs font-bold py-1.5 px-4 text-center tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5" />
        <span>¡Envíos rápidos a todo el país! Pide directo a nuestro WhatsApp</span>
        <Sparkles className="w-3.5 h-3.5" />
      </div>

      <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        
        {/* Brand with colorful icon */}
        <div className="flex items-center gap-6 sm:gap-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-linear-to-tr from-amber-400 via-rose-500 to-indigo-500 flex items-center justify-center text-white text-xl shadow-md shadow-rose-200 group-hover:scale-105 transition-transform duration-200">
              🧸
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-1">
                {storeName.split(' ')[0]} <span className="text-rose-500">{storeName.split(' ').slice(1).join(' ') || 'Toys'}</span>
              </span>
              <p className="text-[10px] text-amber-600 font-bold hidden sm:block">
                Mundo de diversión ✨
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-amber-50/80 p-1 rounded-2xl border border-amber-200/60">
            <Link
              href="/"
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                pathname === '/'
                  ? 'bg-rose-500 text-white shadow-xs'
                  : 'text-slate-700 hover:text-rose-600 hover:bg-white/60'
              }`}
            >
              Inicio
            </Link>
            <Link
              href="/catalogo"
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                pathname === '/catalogo'
                  ? 'bg-rose-500 text-white shadow-xs'
                  : 'text-slate-700 hover:text-rose-600 hover:bg-white/60'
              }`}
            >
              Catálogo
            </Link>
          </nav>
        </div>

        {/* Center: Search input if in catalog, or quick link */}
        {onSearchChange ? (
          <div className="hidden lg:flex flex-1 max-w-xs relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-rose-400" />
            <input
              type="text"
              placeholder="Buscar juguetes..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs font-semibold bg-rose-50/40 hover:bg-rose-50 focus:bg-white rounded-full border border-rose-200 focus:border-rose-400 outline-hidden transition-all text-slate-900 placeholder-slate-400"
            />
          </div>
        ) : (
          <div className="hidden lg:flex">
            <Link
              href="/catalogo"
              className="text-xs font-semibold text-slate-600 hover:text-rose-600 flex items-center gap-2 transition-colors py-1.5 px-4 rounded-full bg-slate-100 hover:bg-rose-50 border border-slate-200 hover:border-rose-200"
            >
              <Search className="w-3.5 h-3.5 text-rose-500" />
              <span>Buscar juguetes...</span>
            </Link>
          </div>
        )}

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* WhatsApp Direct */}
          <button
            onClick={handleWhatsAppGeneral}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-all hover:scale-102 cursor-pointer shadow-2xs"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" />
            <span>WhatsApp</span>
          </button>

          {/* Admin link */}
          <Link
            href="/admin"
            title="Administración"
            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors border border-transparent hover:border-indigo-100"
          >
            <Shield className="w-4 h-4 text-indigo-500" />
          </Link>

          {/* Cart Trigger with Vibrant Warm Colors */}
          <button
            onClick={openCart}
            className="relative flex items-center gap-2 px-4 py-2 rounded-2xl bg-linear-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-rose-200 hover:shadow-lg transition-all hover:scale-103 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Mi Pedido</span>
            {totalItems > 0 && (
              <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-black text-rose-600 bg-white rounded-full shadow-xs animate-bounce">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-slate-900 rounded-xl hover:bg-slate-100"
            aria-label="Menú"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-rose-500" /> : <Menu className="w-5 h-5 text-slate-700" />}
          </button>
        </div>
      </div>

      {/* Mobile search bar if on catalog */}
      {onSearchChange && (
        <div className="lg:hidden px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-400" />
            <input
              type="text"
              placeholder="Buscar en el catálogo..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-rose-50/40 focus:bg-white rounded-xl border border-rose-200 outline-hidden text-slate-900"
            />
          </div>
        </div>
      )}

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-rose-100 px-6 py-5 space-y-4 shadow-lg animate-in slide-in-from-top-1">
          <nav className="flex flex-col space-y-2 text-sm font-bold text-slate-800">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`p-2.5 rounded-xl transition-colors ${
                pathname === '/' ? 'bg-rose-50 text-rose-600' : 'hover:bg-slate-50'
              }`}
            >
              🏠 Inicio
            </Link>
            <Link
              href="/catalogo"
              onClick={() => setMobileMenuOpen(false)}
              className={`p-2.5 rounded-xl transition-colors ${
                pathname === '/catalogo' ? 'bg-rose-50 text-rose-600' : 'hover:bg-slate-50'
              }`}
            >
              🎁 Catálogo Completo
            </Link>
          </nav>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleWhatsAppGeneral();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold flex items-center justify-center gap-2 border border-emerald-200 shadow-2xs"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" />
              <span>Escribir al WhatsApp</span>
            </button>

            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2 px-4 rounded-xl text-slate-500 text-xs text-center bg-slate-50 hover:bg-slate-100 font-semibold"
            >
              Panel de Administración
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}