'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, MessageCircle, Sparkles, Shield, Search } from 'lucide-react';
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

  const handleWhatsAppGeneral = () => {
    const text = encodeURIComponent(`¡Hola ${storeName}! 👋 Tengo una consulta sobre los juguetes del catálogo.`);
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-amber-100 shadow-xs">
      <div className="bg-linear-to-r from-amber-400 via-rose-400 to-indigo-500 text-white text-xs font-semibold py-1.5 px-4 text-center tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
        <span>¡Envíos rápidos a domicilio! Haz tus pedidos directo a nuestro WhatsApp</span>
        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-linear-to-tr from-amber-400 to-rose-500 flex items-center justify-center text-white shadow-md shadow-rose-200 group-hover:scale-105 transition-transform duration-200">
            <span className="text-2xl">🧸</span>
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-800 flex items-center gap-1">
              {storeName.split(' ')[0]} <span className="text-rose-500">{storeName.split(' ').slice(1).join(' ') || 'Toys'}</span>
            </span>
            <p className="text-[10px] sm:text-xs text-slate-500 font-medium hidden sm:block">
              La magia de jugar y sonreír ✨
            </p>
          </div>
        </Link>

        {onSearchChange && (
          <div className="hidden md:flex flex-1 max-w-md mx-4 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar peluches, pistas, muñecas, juegos..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-100 hover:bg-slate-50 focus:bg-white rounded-full border border-slate-200 focus:border-rose-400 outline-hidden transition-all text-slate-800 placeholder-slate-400"
            />
          </div>
        )}

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
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-all hover:scale-102 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" />
            <span>WhatsApp</span>
          </button>

          <button
            onClick={openCart}
            className="relative flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-linear-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-rose-200 hover:shadow-lg transition-all hover:scale-102 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Mi Pedido</span>
            {totalItems > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-extrabold text-rose-600 bg-white rounded-full shadow-xs animate-bounce">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {onSearchChange && (
        <div className="md:hidden px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar juguetes..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-100 focus:bg-white rounded-full border border-slate-200 focus:border-rose-400 outline-hidden transition-all text-slate-800"
            />
          </div>
        </div>
      )}
    </header>
  );
}