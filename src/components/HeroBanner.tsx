'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldCheck, Truck, Clock, MessageSquareHeart } from 'lucide-react';
import { getWhatsAppNumber } from '@/lib/whatsapp';

export function HeroBanner() {
  const phone = getWhatsAppNumber();

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-rose-50/70 via-amber-50/40 to-white py-12 md:py-16 lg:py-20 border-b border-slate-100">
      {/* Decorative light gradient orbs */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-1/4 translate-x-1/2 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-rose-200/80 shadow-2xs text-rose-600 text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" />
              <span>Colección Exclusiva 2026</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Los mejores juguetes para{' '}
              <span className="bg-linear-to-r from-rose-600 via-amber-500 to-indigo-600 bg-clip-text text-transparent">
                crear recuerdos
              </span>{' '}
              inolvidables.
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Explora nuestra cuidada selección de peluches, juegos didácticos, pistas y figuras. Pide directamente por WhatsApp con asesoría inmediata y envío a domicilio.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                href="/catalogo"
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-linear-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-extrabold text-sm shadow-lg shadow-rose-200 hover:shadow-xl transition-all hover:scale-102 flex items-center justify-center gap-2"
              >
                <span>Explorar Catálogo Completo</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={`https://wa.me/${phone}?text=${encodeURIComponent('¡Hola! Me gustaría ver promociones y consultar por juguetes disponibles 🧸')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm border border-slate-200 shadow-2xs hover:shadow-xs transition-all flex items-center justify-center gap-2"
              >
                <MessageSquareHeart className="w-4 h-4 text-emerald-600" />
                <span>Consultar por WhatsApp</span>
              </a>
            </div>

            {/* Trust highlights */}
            <div className="pt-6 border-t border-slate-200/60 grid grid-cols-3 gap-2 sm:gap-4 text-center lg:text-left">
              <div>
                <p className="text-xl sm:text-2xl font-black text-slate-900">+500</p>
                <p className="text-[11px] sm:text-xs text-slate-500 font-medium">Juguetes Entregados</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-rose-600">100%</p>
                <p className="text-[11px] sm:text-xs text-slate-500 font-medium">Calidad Garantizada</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-emerald-600">Rápido</p>
                <p className="text-[11px] sm:text-xs text-slate-500 font-medium">Respuesta por WhatsApp</p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-4/3 sm:aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-linear-to-tr from-amber-100 via-rose-100 to-indigo-100 p-3">
              <img
                src="https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=1000&auto=format&fit=crop&q=80"
                alt="Juguetes y Peluches"
                className="w-full h-full object-cover rounded-2xl shadow-inner"
              />

              {/* Floating Badge 1 */}
              <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-2.5 animate-bounce duration-1000">
                <span className="text-xl">🎁</span>
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400">Para Regalos</p>
                  <p className="text-xs font-bold text-slate-800">Envoltura Especial</p>
                </div>
              </div>

              {/* Floating Badge 2 */}
              <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Envíos a Domicilio</p>
                  <p className="text-[10px] text-slate-500">Coordinación directa</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 3 Pillars Feature Grid */}
        <div className="mt-12 lg:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/70 shadow-xs flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">Envíos Seguros</h4>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">Entregas directas a tu casa o punto de entrega.</p>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/70 shadow-xs flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">Pago Fácil y Confiable</h4>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">Aceptamos Yape, Plin y Transferencias bancarias.</p>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/70 shadow-xs flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">Atención Personalizada</h4>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">Te asesoramos con fotos y videos por WhatsApp.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}