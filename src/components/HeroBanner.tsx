'use client';

import React from 'react';
import { Sparkles, MessageCircle, Truck, Gift, HeartHandshake } from 'lucide-react';
import { getWhatsAppNumber, getStoreName } from '@/lib/whatsapp';

export function HeroBanner() {
  const phone = getWhatsAppNumber();
  const storeName = getStoreName();

  const handleWhatsAppContact = () => {
    const text = encodeURIComponent(`¡Hola ${storeName}! 👋 Quisiera información sobre juguetes y promociones.`);
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-amber-50 via-rose-50/40 to-white pt-8 pb-10 sm:pt-12 sm:pb-16 border-b border-amber-100/60">
      <div className="absolute top-4 left-6 w-24 h-24 bg-yellow-200/50 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-6 right-10 w-36 h-36 bg-rose-200/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-amber-200 text-amber-800 text-xs sm:text-sm font-bold shadow-xs mb-4">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>¡Catálogo actualizado con las últimas novedades!</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-800 tracking-tight leading-tight max-w-4xl mx-auto">
          Los mejores juguetes para llenar de <span className="bg-linear-to-r from-rose-500 via-amber-500 to-indigo-600 bg-clip-text text-transparent">sonrisas y diversión</span>
        </h1>

        <p className="mt-4 text-sm sm:text-base lg:text-lg text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
          Explora nuestro catálogo, elige tus favoritos y pídelos al instante por <strong>WhatsApp</strong>. ¡Te atendemos con gusto y coordinamos tu entrega!
        </p>

        <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={handleWhatsAppContact}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-600/30 hover:shadow-xl transition-all hover:scale-103 cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
            <span>Consultar por WhatsApp</span>
          </button>
          <a
            href="#catalogo"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm sm:text-base border border-slate-200 shadow-xs transition-all hover:scale-103"
          >
            <span>Ver Catálogo de Juguetes</span>
            <span>👇</span>
          </a>
        </div>

        <div className="mt-10 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          <div className="bg-white/90 backdrop-blur-xs p-3.5 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">Envíos Rápidos</h4>
              <p className="text-[11px] text-slate-500">Coordinación directa</p>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-xs p-3.5 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">Venta por WhatsApp</h4>
              <p className="text-[11px] text-slate-500">Atención personalizada</p>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-xs p-3.5 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">100% Garantizados</h4>
              <p className="text-[11px] text-slate-500">Juguetes seguros y nuevos</p>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-xs p-3.5 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">Pagos Seguros</h4>
              <p className="text-[11px] text-slate-500">Yape, Plin o Transferencia</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}