'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/types/toy';
import { MessageCircle, ShoppingBag, AlertCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { generateSingleProductWhatsAppUrl, getCurrency } from '@/lib/whatsapp';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const router = useRouter();
  const currency = getCurrency();

  const handleCardClick = () => {
    router.push(`/producto/${product.id}`);
  };

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
      onClick={handleCardClick}
      className="group bg-slate-50 hover:bg-pink-50/40 rounded-lg overflow-hidden border-2 border-slate-200 hover:border-pink-300 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col cursor-pointer"
    >
      {/* Image container with subtle corner */}
      <div className="relative aspect-square w-full overflow-hidden bg-white border-b border-slate-200">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=800&auto=format&fit=crop&q=80';
          }}
        />

        {/* Pastel Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {!product.in_stock ? (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-900 text-white flex items-center gap-1 shadow-xs">
              <AlertCircle className="w-3 h-3 text-rose-400" /> Agotado
            </span>
          ) : product.badge ? (
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black bg-amber-200 text-amber-950 border border-amber-400 shadow-2xs">
              {product.badge}
            </span>
          ) : null}

          {discountPercent && product.in_stock && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-pink-200 text-pink-900 border border-pink-400 shadow-2xs">
              -{discountPercent}% DCTO
            </span>
          )}
        </div>
      </div>

      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Age in solid pastels */}
          <div className="flex items-center gap-1 sm:gap-1.5 mb-1.5 sm:mb-2 flex-wrap">
            <span className="text-[10px] sm:text-[11px] font-bold text-pink-900 bg-pink-200 border border-pink-300 px-2 sm:px-2.5 py-0.5 rounded-md">
              {product.category}
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold text-sky-900 bg-sky-200 border border-sky-300 px-2 sm:px-2.5 py-0.5 rounded-md">
              {product.age_range}
            </span>
          </div>

          <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm leading-snug line-clamp-2 group-hover:text-pink-600 transition-colors">
            {product.name}
          </h3>

          <p className="mt-1 text-[11px] sm:text-xs text-slate-600 line-clamp-2 leading-relaxed hidden sm:block">
            {product.description}
          </p>
        </div>

        <div className="mt-2.5 sm:mt-3 pt-2.5 sm:pt-3 border-t border-slate-200">
          <div className="flex items-baseline gap-1.5 sm:gap-2 mb-2 sm:mb-3">
            <span className="text-base sm:text-lg font-black text-slate-900">
              {currency} {product.price.toFixed(2)}
            </span>
            {product.original_price && product.original_price > product.price && (
              <span className="text-[10px] sm:text-xs text-slate-400 line-through">
                {currency} {product.original_price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Rounded buttons only */}
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
            <button
              onClick={handleWhatsAppBuy}
              title="Pedir por WhatsApp"
              className="w-full flex items-center justify-center gap-1 py-1.5 sm:py-2 px-1 sm:px-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] sm:text-xs transition-colors cursor-pointer shadow-2xs"
            >
              <MessageCircle className="w-3 sm:w-3.5 h-3 sm:h-3.5 fill-white shrink-0" />
              <span>Pedir</span>
            </button>

            <button
              onClick={handleAddToCart}
              disabled={!product.in_stock}
              title={product.in_stock ? 'Agregar al pedido' : 'Agotado'}
              className={`w-full flex items-center justify-center gap-1 py-1.5 sm:py-2 px-1 sm:px-2 rounded-full font-bold text-[11px] sm:text-xs transition-colors cursor-pointer ${
                product.in_stock
                  ? 'bg-pink-500 hover:bg-pink-600 text-white shadow-2xs'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <ShoppingBag className="w-3 sm:w-3.5 h-3 sm:h-3.5 shrink-0" />
              <span>{product.in_stock ? '+ Carrito' : 'Agotado'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}