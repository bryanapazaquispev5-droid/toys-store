'use client';

import React from 'react';
import Link from 'next/link';
import { MessageCircle, Heart, Clock } from 'lucide-react';
import { getWhatsAppNumber, getStoreName } from '@/lib/whatsapp';

export function Footer() {
  const phone = getWhatsAppNumber();
  const storeName = getStoreName();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-xl bg-rose-600 flex items-center justify-center text-white text-lg">
                🧸
              </div>
              <span className="text-xl font-black text-white">{storeName}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Tu tienda de confianza con los juguetes más divertidos, educativos y seguros. Hacemos tus compras fáciles y rápidas con atención personalizada por WhatsApp.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
              ¿Cómo Comprar?
            </h4>
            <ul className="text-xs text-slate-400 space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-rose-400 font-bold">1.</span>
                <span>Explora el catálogo y elige tus favoritos.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-amber-400 font-bold">2.</span>
                <span>Toca el botón <strong>&quot;Pedir por WhatsApp&quot;</strong>.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">3.</span>
                <span>Coordinamos el pago y la entrega 100% seguro.</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
              Atención & Métodos
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Lunes a Sábado: 9:00 AM - 8:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp: +{phone}</span>
              </div>
              <div className="pt-2">
                <p className="text-[11px] font-semibold text-slate-300 mb-1">Aceptamos:</p>
                <div className="flex items-center gap-2 flex-wrap text-[10px]">
                  <span className="px-2 py-0.5 rounded-md bg-slate-800 text-purple-300 border border-slate-700 font-bold">Yape</span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-800 text-cyan-300 border border-slate-700 font-bold">Plin</span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-800 text-emerald-300 border border-slate-700 font-bold">Transferencia</span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-800 text-amber-300 border border-slate-700 font-bold">Efectivo</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {storeName}. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="hover:text-slate-300 transition-colors">
              Panel Administrativo
            </Link>
            <span>•</span>
            <span className="flex items-center gap-1">
              Hecho con <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> para los más pequeños
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}