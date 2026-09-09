'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, MessageCircle, ArrowLeft, Store, Clock } from 'lucide-react';
import { getStoreName } from '@/lib/whatsapp';

function MensajeEnviadoContent() {
  const searchParams = useSearchParams();
  const rawText = searchParams.get('text') || '¡Hola! Quisiera consultar por los juguetes disponibles.';
  const storeName = getStoreName();

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 sm:p-6 text-slate-100">
      <div className="w-full max-w-lg bg-slate-800/90 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
        
        {/* WhatsApp Mock Header */}
        <div className="flex items-center gap-3 pb-5 border-b border-slate-700">
          <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/30">
            <MessageCircle className="w-6 h-6 fill-white" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span>{storeName}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
            </h2>
            <p className="text-xs text-emerald-400 font-medium flex items-center gap-1">
              <span>En línea • WhatsApp Oficial</span>
            </p>
          </div>
        </div>

        {/* Success Alert */}
        <div className="my-6 p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 flex items-start gap-3.5">
          <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-bold text-emerald-300">¡Mensaje Enviado con Éxito!</h3>
            <p className="text-xs text-emerald-200/90 mt-0.5 leading-relaxed">
              Tu mensaje y pedido han sido registrados. Nuestro equipo se pondrá en contacto contigo a la brevedad.
            </p>
          </div>
        </div>

        {/* Message Bubble Preview */}
        <div className="bg-slate-900/80 rounded-2xl p-4 border border-slate-700/60 space-y-2 mb-6">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> Mensaje transmitido:
          </p>
          <div className="text-xs text-slate-300 font-mono whitespace-pre-wrap bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 leading-relaxed max-h-48 overflow-y-auto">
            {decodeURIComponent(rawText)}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          <Link
            href="/"
            className="w-full py-3.5 px-6 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs sm:text-sm text-center shadow-lg shadow-sky-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Store className="w-4 h-4" />
            <span>Volver a la Tienda</span>
          </Link>
          <Link
            href="/catalogo"
            className="w-full py-3.5 px-6 rounded-2xl bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold text-xs sm:text-sm text-center transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Ver Más Juguetes</span>
          </Link>
        </div>

      </div>
    </div>
  );
}

export default function MensajeEnviadoPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-slate-300 text-sm">
        Cargando confirmación...
      </div>
    }>
      <MensajeEnviadoContent />
    </Suspense>
  );
}
