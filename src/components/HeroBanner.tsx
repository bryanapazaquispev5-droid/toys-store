'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Truck, Clock, MessageCircle, Sparkles } from 'lucide-react';
import { getWhatsAppNumber } from '@/lib/whatsapp';

export function HeroBanner() {
  const phone = getWhatsAppNumber();

  return (
    <section className="bg-white py-10 md:py-14 border-b border-slate-200">
      <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-100 border border-pink-200 text-pink-800 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-pink-600" />
              <span>Juguetería Mágica • Colección 2026</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Los mejores juguetes para jugar, aprender y sonreír.
            </h1>

            <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
              Peluches, juegos didácticos, pistas y figuras para todas las edades. Pide fácil por WhatsApp con delivery a domicilio.
            </p>

            {/* Action Buttons (Rounded buttons only) */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-1">
              <Link
                href="/catalogo"
                className="w-full sm:w-auto px-7 py-3 rounded-full bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Ver Catálogo Completo</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={`https://wa.me/${phone}?text=${encodeURIComponent('¡Hola! Me gustaría consultar por los juguetes disponibles 🧸')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-sm border border-emerald-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                <span>Pedir por WhatsApp</span>
              </a>
            </div>

            {/* Trust Stat Pills in Soft Pastels */}
            <div className="pt-5 border-t border-slate-100 grid grid-cols-3 gap-3 text-center lg:text-left">
              <div className="bg-sky-50 p-3 rounded-lg border border-sky-100">
                <p className="text-lg sm:text-xl font-black text-sky-900">+500</p>
                <p className="text-[11px] text-sky-700 font-semibold">Juguetes Entregados</p>
              </div>
              <div className="bg-pink-50 p-3 rounded-lg border border-pink-100">
                <p className="text-lg sm:text-xl font-black text-pink-900">100%</p>
                <p className="text-[11px] text-pink-700 font-semibold">Garantía de Calidad</p>
              </div>
              <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                <p className="text-lg sm:text-xl font-black text-emerald-900">Rápido</p>
                <p className="text-[11px] text-emerald-700 font-semibold">Atención por WhatsApp</p>
              </div>
            </div>
          </div>

          {/* Right Column: Showcase Image */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md aspect-4/3 sm:aspect-square rounded-lg overflow-hidden border border-slate-200 bg-slate-50 p-2 shadow-xs">
              <img
                src="https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=1000&auto=format&fit=crop&q=80"
                alt="Juguetes y Peluches"
                className="w-full h-full object-cover rounded-md"
              />

              {/* Pastel stickers */}
              <div className="absolute top-4 left-4 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-pink-200 flex items-center gap-2">
                <span className="text-pink-500 font-bold text-sm">⭐</span>
                <div>
                  <p className="text-[10px] text-pink-700 font-bold uppercase">Favoritos</p>
                  <p className="text-xs font-bold text-slate-800">Todas las Edades</p>
                </div>
              </div>

              <div className="absolute bottom-4 right-4 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-sky-200 flex items-center gap-2">
                <Truck className="w-4 h-4 text-sky-600" />
                <div>
                  <p className="text-xs font-bold text-slate-900">Envíos a Domicilio</p>
                  <p className="text-[10px] text-sky-700 font-bold">Rápido y Seguro</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 3 Pastel Pillars Feature Cards (Clean rectangular corners) */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-sky-50 p-4 rounded-lg border border-sky-200 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-sky-200 text-sky-800 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-sky-950">Envíos Seguros</h4>
              <p className="text-[11px] text-sky-800/90 mt-0.5">Entregas directas a tu casa.</p>
            </div>
          </div>

          <div className="bg-pink-50 p-4 rounded-lg border border-pink-200 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-pink-200 text-pink-800 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-pink-950">Pagos Fáciles</h4>
              <p className="text-[11px] text-pink-800/90 mt-0.5">Aceptamos Yape, Plin y Transferencia.</p>
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-200 text-purple-800 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-purple-950">Atención WhatsApp</h4>
              <p className="text-[11px] text-purple-800/90 mt-0.5">Te asesoramos con fotos y videos.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}