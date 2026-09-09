'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Truck, Clock, MessageCircle, Sparkles, Star } from 'lucide-react';
import { getWhatsAppNumber } from '@/lib/whatsapp';

export function HeroBanner() {
  const phone = getWhatsAppNumber();

  return (
    <section className="bg-white py-12 md:py-16 border-b border-slate-100 relative overflow-hidden">
      <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-linear-to-r from-amber-100 via-rose-100 to-indigo-100 border border-rose-200 text-rose-700 text-xs font-black shadow-xs">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>¡La Magia de Jugar y Aprender!</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Los mejores juguetes para{' '}
              <span className="bg-linear-to-r from-rose-500 via-amber-500 to-indigo-600 bg-clip-text text-transparent">
                sonreír en grande.
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
              Descubre peluches abrazables, didácticos interactivos, pistas veloces y muñecas. Pide fácil y rápido por WhatsApp con delivery a domicilio.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-1">
              <Link
                href="/catalogo"
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-linear-to-r from-rose-500 via-rose-600 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-black text-sm shadow-lg shadow-rose-200 hover:shadow-xl transition-all hover:scale-103 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <span>Explorar Catálogo Completo</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={`https://wa.me/${phone}?text=${encodeURIComponent('¡Hola! Me gustaría consultar por los juguetes y promociones disponibles 🧸')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-extrabold text-sm border-2 border-emerald-200 shadow-2xs hover:shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 text-emerald-600 fill-emerald-600" />
                <span>Pedir por WhatsApp</span>
              </a>
            </div>

            {/* Trust Stat Pills */}
            <div className="pt-6 border-t border-slate-100 grid grid-cols-3 gap-3 sm:gap-4 text-center lg:text-left">
              <div className="bg-amber-50/70 p-3 rounded-2xl border border-amber-200/70">
                <p className="text-xl sm:text-2xl font-black text-amber-700">+500</p>
                <p className="text-[11px] sm:text-xs text-amber-800 font-semibold">Juguetes Entregados</p>
              </div>
              <div className="bg-rose-50/70 p-3 rounded-2xl border border-rose-200/70">
                <p className="text-xl sm:text-2xl font-black text-rose-600">100%</p>
                <p className="text-[11px] sm:text-xs text-rose-800 font-semibold">Garantía y Calidad</p>
              </div>
              <div className="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-200/70">
                <p className="text-xl sm:text-2xl font-black text-emerald-600">Rápido</p>
                <p className="text-[11px] sm:text-xs text-emerald-800 font-semibold">Respuesta WhatsApp</p>
              </div>
            </div>
          </div>

          {/* Right Column: Colorful Showcase Image */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md aspect-4/3 sm:aspect-square rounded-3xl overflow-hidden border-4 border-amber-100 bg-linear-to-tr from-amber-100 via-rose-100 to-indigo-100 p-2 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=1000&auto=format&fit=crop&q=80"
                alt="Juguetes y Peluches"
                className="w-full h-full object-cover rounded-2xl shadow-inner"
              />

              {/* Colorful Sticker 1 */}
              <div className="absolute top-5 left-5 bg-white/95 px-3.5 py-2 rounded-2xl shadow-lg border-2 border-rose-200 flex items-center gap-2 transform -rotate-2">
                <span className="text-xl">⭐</span>
                <div>
                  <p className="text-[10px] text-rose-500 font-black uppercase">¡Los Favoritos!</p>
                  <p className="text-xs font-extrabold text-slate-800">Para Todas las Edades</p>
                </div>
              </div>

              {/* Colorful Sticker 2 */}
              <div className="absolute bottom-5 right-5 bg-white/95 px-4 py-2.5 rounded-2xl shadow-lg border-2 border-emerald-200 flex items-center gap-2.5 transform rotate-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-900">Envíos a Domicilio</p>
                  <p className="text-[10px] text-emerald-600 font-bold">Rápido y Seguro</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 3 Colorful Pillars Feature Cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-amber-50/80 p-5 rounded-3xl border-2 border-amber-200 flex items-center gap-4 transition-transform hover:scale-102">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-white flex items-center justify-center shrink-0 shadow-md shadow-amber-200">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-black text-amber-950">Envíos Seguros</h4>
              <p className="text-xs text-amber-800/80 mt-0.5 font-medium">Entregas coordinadas directo a tu puerta.</p>
            </div>
          </div>

          <div className="bg-rose-50/80 p-5 rounded-3xl border-2 border-rose-200 flex items-center gap-4 transition-transform hover:scale-102">
            <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-rose-200">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-black text-rose-950">Pagos con Yape y Plin</h4>
              <p className="text-xs text-rose-800/80 mt-0.5 font-medium">Fácil, confiable y con confirmación inmediata.</p>
            </div>
          </div>

          <div className="bg-indigo-50/80 p-5 rounded-3xl border-2 border-indigo-200 flex items-center gap-4 transition-transform hover:scale-102">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-indigo-200">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-black text-indigo-950">Atención Personalizada</h4>
              <p className="text-xs text-indigo-800/80 mt-0.5 font-medium">Te enviamos fotos y videos reales por WhatsApp.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}