'use client';

import React from 'react';
import { MessageCircle, Mail, Clock } from 'lucide-react';
import { getWhatsAppNumber, getStoreName } from '@/lib/whatsapp';

export function Footer() {
  const phone = getWhatsAppNumber();
  const storeName = getStoreName();

  return (
    <footer className="bg-slate-950 text-slate-400 py-6 sm:py-7 border-t border-slate-800">
      <div className="w-full max-w-[2200px] 3xl:max-w-[2500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16 space-y-4">
        
        {/* Main compact row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 pb-3 sm:pb-4 border-b border-slate-800/80">
          
          {/* Brand */}
          <div className="flex items-center gap-2">
            <span className="text-sm sm:text-base font-black text-white">{storeName}</span>
          </div>

          {/* Contact Details (Horario, WhatsApp, Email) */}
          <div className="flex items-center gap-3 sm:gap-6 flex-wrap justify-center text-[11px] sm:text-xs">
            <div className="flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Lun - Sáb: 9:00 AM - 8:00 PM</span>
            </div>

            <a
              href={`https://wa.me/${phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-semibold"
            >
              <MessageCircle className="w-3.5 h-3.5 shrink-0" />
              <span>WhatsApp: +{phone}</span>
            </a>

            <div className="flex items-center gap-1.5 text-slate-300">
              <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>contacto@jugueteriamagica.com</span>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="flex items-center gap-1.5 text-[10px] flex-wrap justify-center">
            <span className="text-[11px] text-slate-500 font-semibold mr-0.5">Pagos:</span>
            <span className="px-2 py-0.5 rounded-md bg-slate-900 text-purple-300 border border-slate-800 font-bold">Yape</span>
            <span className="px-2 py-0.5 rounded-md bg-slate-900 text-cyan-300 border border-slate-800 font-bold">Plin</span>
            <span className="px-2 py-0.5 rounded-md bg-slate-900 text-emerald-300 border border-slate-800 font-bold">Transferencia</span>
            <span className="px-2 py-0.5 rounded-md bg-slate-900 text-amber-300 border border-slate-800 font-bold">Efectivo</span>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-1.5 text-[11px] text-slate-500 text-center sm:text-left">
          <p>© {new Date().getFullYear()} {storeName}. Todos los derechos reservados.</p>
          <p className="text-slate-500">Venta directa y delivery a domicilio por WhatsApp</p>
        </div>
      </div>
    </footer>
  );
}