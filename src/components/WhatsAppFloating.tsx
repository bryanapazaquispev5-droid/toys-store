'use client';
import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { getWhatsAppNumber, getStoreName } from '@/lib/whatsapp';

export function WhatsAppFloating() {
  const [showTooltip, setShowTooltip] = useState(true);
  const phone = getWhatsAppNumber();
  const storeName = getStoreName();

  const handleOpenWhatsApp = () => {
    const text = encodeURIComponent(`¡Hola ${storeName}! 👋 Quisiera hacer una consulta.`);
    window.open(`/mensaje-enviado?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
      {showTooltip && (
        <div className="relative bg-white text-slate-800 px-3.5 py-2 rounded-2xl shadow-xl border border-emerald-100 text-xs font-semibold flex items-center gap-2 animate-bounce">
          <span>¿Deseas ayuda con tu compra? 👌</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      <button
        onClick={handleOpenWhatsApp}
        aria-label="Contactar por WhatsApp"
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-xl shadow-emerald-500/40 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
      >
        <MessageCircle className="w-7 h-7 fill-white" />
      </button>
    </div>
  );
}