'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ShoppingBag, MessageCircle, Search, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { getWhatsAppNumber, getStoreName } from '@/lib/whatsapp';

export function Navbar() {
  const { totalItems, openCart } = useCart();
  const phone = getWhatsAppNumber();
  const storeName = getStoreName();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Secret owner shortcut: 5 rapid clicks on logo within 3s redirects to private panel
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleLogoClick = (e: React.MouseEvent) => {
    clickCountRef.current += 1;

    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
    }

    if (clickCountRef.current >= 5) {
      clickCountRef.current = 0;
      router.push('/panel-privado-98xk');
      return;
    }

    clickTimerRef.current = setTimeout(() => {
      clickCountRef.current = 0;
    }, 3000);
  };

  const handleWhatsAppGeneral = () => {
    const text = encodeURIComponent(`¡Hola ${storeName}! Quisiera consultar por los juguetes.`);
    window.open(`/mensaje-enviado?text=${text}`, '_blank');
  };

  return (
    <header className="sticky top-0 z-50 bg-sky-100 border-b border-sky-200 shadow-xs">
      <div className="w-full max-w-[2200px] 3xl:max-w-[2500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16 h-16 flex items-center justify-between gap-4 sm:gap-6">
        
        {/* Left: Brand & Nav Links */}
        <div className="flex items-center gap-6 sm:gap-8">
          <Link href="/" onClick={handleLogoClick} className="flex items-center gap-2 select-none">
            <span className="text-lg font-black tracking-tight text-sky-950">
              {storeName}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2">
            <Link
              href="/"
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
                pathname === '/'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-sky-900 hover:bg-sky-200/80'
              }`}
            >
              Inicio
            </Link>
            <Link
              href="/catalogo"
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
                pathname === '/catalogo'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-sky-900 hover:bg-sky-200/80'
              }`}
            >
              Catálogo
            </Link>
          </nav>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {/* WhatsApp Direct */}
          <button
            onClick={handleWhatsAppGeneral}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-emerald-900 bg-emerald-200 hover:bg-emerald-300 border border-emerald-300 transition-colors cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-emerald-700 fill-emerald-700" />
            <span>WhatsApp</span>
          </button>

          {/* Cart Trigger Button in Pastel Pink */}
          <button
            onClick={openCart}
            className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Mi Pedido</span>
            {totalItems > 0 && (
              <span className="inline-flex items-center justify-center min-w-[18px] h-4 px-1 text-[10px] font-bold text-pink-700 bg-pink-100 rounded-full">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-sky-900 hover:text-sky-950 rounded-full hover:bg-sky-200"
            aria-label="Menú"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-sky-900" /> : <Menu className="w-5 h-5 text-sky-900" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-sky-50 border-b border-sky-200 px-6 py-4 space-y-3 shadow-sm animate-in slide-in-from-top-1">
          <nav className="flex flex-col space-y-2 text-sm font-bold text-sky-950">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`p-2 rounded-lg transition-colors ${
                pathname === '/' ? 'bg-sky-200 text-sky-900' : 'hover:bg-sky-100'
              }`}
            >
              Inicio
            </Link>
            <Link
              href="/catalogo"
              onClick={() => setMobileMenuOpen(false)}
              className={`p-2 rounded-lg transition-colors ${
                pathname === '/catalogo' ? 'bg-sky-200 text-sky-900' : 'hover:bg-sky-100'
              }`}
            >
              Catálogo
            </Link>
          </nav>

          <div className="pt-2 border-t border-sky-200 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleWhatsAppGeneral();
              }}
              className="w-full py-2.5 px-4 rounded-full bg-emerald-200 text-emerald-950 text-xs font-bold flex items-center justify-center gap-2 border border-emerald-300"
            >
              <MessageCircle className="w-4 h-4 text-emerald-700 fill-emerald-700" />
              <span>WhatsApp de la Tienda</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}