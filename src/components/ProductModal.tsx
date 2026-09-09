'use client';
import React from 'react';
import { useCart } from '@/context/CartContext';
import { X, MessageCircle, ShoppingBag, ShieldCheck } from 'lucide-react';
import { generateSingleProductWhatsAppUrl, getCurrency } from '@/lib/whatsapp';

export function ProductModal() {
  const { selectedProductForModal, setSelectedProductForModal, addToCart } = useCart();
  const currency = getCurrency();

  if (!selectedProductForModal) return null;
  const product = selectedProductForModal;

  const handleClose = () => {
    setSelectedProductForModal(null);
  };

  const handleWhatsAppBuy = () => {
    const url = generateSingleProductWhatsAppUrl(product);
    window.open(url, '_blank');
  };

  const handleAddToCart = () => {
    if (!product.in_stock) return;
    addToCart(product, 1);
  };

  const discountPercent = product.original_price && product.original_price > product.price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-slate-100 relative max-h-[y0vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-slate-100 text-slate-700 flex items-center justify-center shadow-md transition-all hover:scale-105 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="md:w-1/2 bg-slate-50 relative aspect-square md:aspect-auto flex items-center justify-center overflow-hidden">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover object-center"
          />
          {product.badge && (
            <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-extrabold bg-linear-to-r from-amber-500 to-rose-500 text-white shadow-md">
              {product.badge}
            </span>
          )}
        </div>

        <div className="md:w-1/2 p-6 sm:p-7 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-lg">
                {product.category}
              </span>
              <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                🐶 {product.age_range}
              </span>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${product.in_stock ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                {product.in_stock ? '● En Stock' : '✕ Agotado'}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-slate-800 leading-tight">
              {product.name}
            </h2>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-3xl font-black text-slate-900">
                {currency} {product.price.toFixed(2)}
              </span>
              {product.original_price && product.original_price > product.price && (
                <>
                  <span className="text-base text-slate-400 line-through">
                    {currency} {product.original_price.toFixed(2)}
                  </span>
                  <span className="text-xs font-bold text-rose-600 bg-rose-100 px-2 py-0.5 rounded-full">
                    Ahorras -{discountPercent}%
                  </span>
                </>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Descripción
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="mt-5 space-y-2 bg-amber-50/60 p-3 rounded-2xl border border-amber-100 text-xs text-amber-900">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Juguete 100% original, seguro y nuevo</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Atención inmediata por WhatsApp</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 space-y-2.5">
            <button
              onClick={handleWhatsAppBuy}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all hover:scale-101 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>Pedir ahora por WhatsApp</span>
            </button>

            <button
              onClick={handleAddToCart}
              disabled={!product.in_stock}
              className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-bold text-sm transition-all cursor-pointer ${
                product.in_stock
                  ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{product.in_stock ? 'Agregar a mi Pedido' : 'No disponible'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}