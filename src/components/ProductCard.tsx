'use client';

import React from 'react';
import { Product } from '@/types/toy';
import { MessageCircle, ShoppingBag, Eye, AlertCircle, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { generateSingleProductWhatsAppUrl, getCurrency } from '@/lib/whatsapp';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, setSelectedProductForModal } = useCart();
  const currency = getCurrency();

  const handleWhatsAppBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = generateSingleProductWhatsAppUrl(product);
    window.open(url, '_blank');
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product.in_stock) return;
    addToCart(product, 1);
  };

  const discountPercent = product.original_price && product.original_price > product.price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : null;

  return (
    <div
      onClick={() => setSelectedProductForModal(product)}
      className="group bg-white rounded-3xl overflow-hidden border-2 border-slate-100 hover:border-rose-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-500 ease-out"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=800&auto=format&fit=crop&q=80';
          }}
        />

        {/* Colorful Stickers */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {!product.in_stock ? (
            <span className="px-2.5 py-1 rounded-xl text-[11px] font-black bg-slate-900 text-white flex items-center gap-1 shadow-md">
              <AlertCircle className="w-3.5 h-3.5 text-rose-400" /> Agotado
            </span>
          ) : product.badge ? (
            <span className="px-3 py-1 rounded-xl text-[11px] font-black bg-linear-to-r from-amber-400 to-amber-500 text-amber-950 shadow-md flex items-center gap-1 border border-amber-300">
              <Sparkles className="w-3 h-3 text-amber-950" /> {product.badge}
            </span>
          ) : null}

          {discountPercent && product.in_stock && (
            <span className="px-2 py-0.5 rounded-lg text-[10px] font-black bg-rose-600 text-white shadow-md">
              -{discountPercent}% DCTO
            </span>
          )}
        </div>

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <span className="px-4 py-2 rounded-2xl bg-white text-slate-900 text-xs font-black shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-4 h-4 text-rose-600" /> Ver Detalles
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-[11px] font-extrabold text-rose-700 bg-rose-100/80 border border-rose-200 px-2.5 py-0.5 rounded-lg">
              {product.category}
            </span>
            <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-lg">
              {product.age_range}
            </span>
          </div>

          <h3 className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-rose-600 transition-colors">
            {product.name}
          </h3>

          <p className="mt-1.5 text-xs text-slate-500 line-clamp-2 leading-relaxed font-normal">
            {product.description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-xl sm:text-2xl font-black text-slate-900">
              {currency} {product.price.toFixed(2)}
            </span>
            {product.original_price && product.original_price > product.price && (
              <span className="text-xs text-slate-400 line-through font-semibold">
                {currency} {product.original_price.toFixed(2)}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleWhatsAppBuy}
              title="Comprar directo por WhatsApp"
              className="w-full flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs shadow-md shadow-emerald-200 hover:shadow-lg transition-all hover:scale-102 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Pedir Ya</span>
            </button>

            <button
              onClick={handleAddToCart}
              disabled={!product.in_stock}
              title={product.in_stock ? 'Agregar a mi pedido' : 'Producto agotado'}
              className={`w-full flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-2xl font-extrabold text-xs transition-all hover:scale-102 cursor-pointer ${
                product.in_stock
                  ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-2 border-rose-300 shadow-2xs'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{product.in_stock ? '+ Carrito' : 'Agotado'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}