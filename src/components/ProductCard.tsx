'use client';

import React from 'react';
import Link from 'next/link';
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
      className="group bg-white rounded-lg overflow-hidden border border-slate-200 hover:border-slate-300 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col cursor-pointer"
    >
      {/* Image container with subtle corner */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-50">
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
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs">
              {product.badge}
            </span>
          ) : null}

          {discountPercent && product.in_stock && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-pink-100 text-pink-700 border border-pink-300 shadow-2xs">
              -{discountPercent}%
            </span>
          )}
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Age in soft pastels */}
          <div className="flex items-center gap-1.5 mb-2 flex-wrap">
            <span className="text-[11px] font-bold text-pink-800 bg-pink-100 border border-pink-200 px-2 py-0.5 rounded-md">
              {product.category}
            </span>
            <span className="text-[11px] font-bold text-sky-800 bg-sky-100 border border-sky-200 px-2 py-0.5 rounded-md">
              {product.age_range}
            </span>
          </div>

          <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2 group-hover:text-pink-600 transition-colors">
            {product.name}
          </h3>

          <p className="mt-1 text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-100">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-lg font-black text-slate-900">
              {currency} {product.price.toFixed(2)}
            </span>
            {product.original_price && product.original_price > product.price && (
              <span className="text-xs text-slate-400 line-through">
                {currency} {product.original_price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Rounded buttons only */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleWhatsAppBuy}
              title="Pedir por WhatsApp"
              className="w-full flex items-center justify-center gap-1.5 py-2 px-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors cursor-pointer shadow-2xs"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>Pedir</span>
            </button>

            <button
              onClick={handleAddToCart}
              disabled={!product.in_stock}
              title={product.in_stock ? 'Agregar al pedido' : 'Agotado'}
              className={`w-full flex items-center justify-center gap-1.5 py-2 px-2 rounded-full font-bold text-xs transition-colors cursor-pointer ${
                product.in_stock
                  ? 'bg-pink-100 hover:bg-pink-200 text-pink-800 border border-pink-200'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{product.in_stock ? '+ Carrito' : 'Agotado'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}