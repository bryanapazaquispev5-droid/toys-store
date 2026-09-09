'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, MessageCircle, Sparkles, Shield, Search, Menu, X, Flame, Package, Home as HomeIcon } from 'lucide-react';
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
    const text = encodeURIComponent(`¡Hola ${storeName}! 👋 Tengo una consulta sobre los juguetes del catálogo.`);
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  const navLinks = [
    { label: 'Inicio', href: '/', icon: HomeIcon },
    { label: 'Catálogo Completo', href: '/catalogo', icon: Package },
    { label: 'Destacados', href: '/#destacados', icon: Flame },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      {/* Top promotional bar */}
      <div className="bg-linear-to-r from-rose-500 via-amber-500 to-indigo-600 text-white text-xs font-semibold py-1.5 px-4 text-center tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 animate-pulse hidden sm:inline" />
        <span>⚡ Envíos rápidos y seguros • ¡Haz tu pedido directo a nuestro WhatsApp!</span>
        <Sparkles className="w-3.5 h-3.5 animate-pulse hidden sm:inline" />
      </div>

      <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-linear-to-tr from-amber-400 via-rose-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-rose-200 group-hover:scale-105 transition-transform duration-200">
            <span className="text-2xl">🧸</span>
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 flex items-center gap-1.5">
              {storeName.split(' ')[0]} <span className="text-rose-500 font-extrabold">{storeName.split(' ').slice(1).join(' ') || 'Toys'}</span>
            </span>
            <p className="text-[10px] sm:text-xs text-slate-400 font-medium hidden sm:block">
              Juguetes mágicos para todas las edades ✨
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1 rounded-2xl border border-slate-200">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-white text-rose-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Search bar on desktop if supported */}
        {onSearchChange ? (
          <div className="hidden md:flex flex-1 max-w-xs xl:max-w-sm mx-2 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar juguetes en vivo..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs font-medium bg-slate-100/80 hover:bg-slate-50 focus:bg-white rounded-full border border-slate-200 focus:border-rose-400 outline-hidden transition-all text-slate-800 placeholder-slate-400"
            />
          </div>
        ) : (
          <div className="hidden md:flex">
            <Link
              href="/catalogo"
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-500 hover:text-rose-600 bg-slate-100 hover:bg-rose-50 rounded-full border border-slate-200 transition-colors"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>Explorar catálogo...</span>
            </Link>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/admin"
            title="Panel de Administración"
            className="p-2 sm:px-3 sm:py-2 text-xs font-semibold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors flex items-center gap-1.5 border border-transparent hover:border-indigo-100"
          >
            <Shield className="w-4 h-4 text-indigo-500" />
            <span className="hidden sm:inline">Admin</span>
          </Link>

          <button
            onClick={handleWhatsAppGeneral}
            title="Escribir por WhatsApp"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-all hover:scale-102 cursor-pointer shadow-2xs"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" />
            <span>WhatsApp</span>
          </button>

          {/* Cart Button */}
          <button
            onClick={openCart}
            className="relative flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-linear-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-rose-200 hover:shadow-lg transition-all hover:scale-102 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Mi Pedido</span>
            {totalItems > 0 && (
              <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-extrabold text-rose-600 bg-white rounded-full shadow-xs animate-bounce">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile search bar if supported */}
      {onSearchChange && (
        <div className="md:hidden px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar juguetes en vivo..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-100 focus:bg-white rounded-full border border-slate-200 focus:border-rose-400 outline-hidden transition-all text-slate-800"
            />
          </div>
        </div>
      )}

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-2 shadow-lg animate-in slide-in-from-top-2">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                  isActive ? 'bg-rose-50 text-rose-600' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4 text-rose-500" />
                <span>{item.label}</span>
              </Link>
            );
          })}

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleWhatsAppGeneral();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" />
              <span>Contactar por WhatsApp</span>
            </button>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200"
            >
              <Shield className="w-4 h-4 text-indigo-500" />
              <span>Panel de Administración</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}