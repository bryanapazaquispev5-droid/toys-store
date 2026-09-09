'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Truck, Clock, MessageCircle, Sparkles } from 'lucide-react';
import { getWhatsAppNumber } from '@/lib/whatsapp';

export function HeroBanner() {
  const phone = getWhatsAppNumber();

  return (
    <section className="bg-slate-50/70 py-12 md:py-16 border-b border-slate-200">
      <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-rose-600 text-xs font-semibold shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              <span>Catálogo 2026</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Los mejores juguetes para jugar, aprender y sonreír.
            </h1>

            <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Explora nuestra colección seleccionada de peluches, juegos didácticos, pistas y figuras. Haz tus pedidos directo a nuestro WhatsApp con atención personalizada y envíos rápidos.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-1">
              <Link
                href="/catalogo"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>Ver Catálogo Completo</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={`https://wa.me/${phone}?text=${encodeURIComponent('¡Hola! Me gustaría consultar por los juguetes disponibles en la tienda.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-semibold text-sm border border-slate-300 shadow-2xs transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Consultar por WhatsApp</span>
              </a>
            </div>

            {/* Trust highlights */}
            <div className="pt-6 border-t border-slate-200 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <p className="text-xl sm:text-2xl font-black text-slate-900">+500</p>
                <p className="text-xs text-slate-500">Pedidos Entregados</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-rose-600">100%</p>
                <p className="text-xs text-slate-500">Calidad y Garantía</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-emerald-600">Inmediata</p>
                <p className="text-xs text-slate-500">Atención WhatsApp</p>
              </div>
            </div>
          </div>

          {/* Right Column: Showcase Image */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md aspect-4/3 sm:aspect-square rounded-2xl overflow-hidden border border-slate-200 bg-white p-2 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=1000&auto=format&fit=crop&q=80"
                alt="Juguetes y Peluches"
                className="w-full h-full object-cover rounded-xl"
              />

              {/* Clean solid badge 1 */}
              <div className="absolute top-4 left-4 bg-white px-3 py-1.5 rounded-xl shadow-md border border-slate-200 flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-600" />
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Envíos</p>
                  <p className="text-xs font-bold text-slate-800">A todo el país</p>
                </div>
              </div>

              {/* Clean solid badge 2 */}
              <div className="absolute bottom-4 right-4 bg-white px-3 py-1.5 rounded-xl shadow-md border border-slate-200 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-rose-600" />
                <div>
                  <p className="text-xs font-bold text-slate-900">Compra Segura</p>
                  <p className="text-[10px] text-slate-500">Pago contra entrega / Transferencia</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 3 Pillars Clean Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5 text-rose-600" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">Envíos Rápidos</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Entregas directas a domicilio coordinadas al instante.</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">Pagos Seguros</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Aceptamos Yape, Plin y Transferencias bancarias.</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">Asesoría Directa</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Te ayudamos a elegir el mejor juguete por WhatsApp.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}