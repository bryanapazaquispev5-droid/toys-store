'use client';

import React from 'react';
import { Product } from '@/types/toy';
import { MessageCircle, ShoppingBag, Eye, AlertCircle } from 'lucide-react';
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
      className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xs hover:shadow-xl hover:border-rose-100 transition-all duration-300 flex flex-col cursor-pointer relative"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=800&auto=format&fit=crop&q=80';
          }}
        />

        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {!product.in_stock ? (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-900/80 text-white backdrop-blur-xs flex items-center gap-1 shadow-xs">
              <AlertCircle className="w-3 h-3 text-rose-400" /> Agotado
            </span>
          ) : product.badge ? (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-linear-to-r from-amber-500 to-rose-500 text-white shadow-xs">
              {product.badge}
            </span>
          ) : null}

          {discountPercent && product.in_stock && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-600 text-white shadow-xs">
              -{discountPercent}%
            </span>
          )}
        </div>

        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <span className="px-3.5 py-1.5 rounded-full bg-white/95 text-slate-800 text-xs font-bold shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5 text-rose-500" /> Ver Detalles
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-[11px] font-semibold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-md">
              {product.category}
            </span>
            <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
              👶 {product.age_range}
            </span>
          </div>

          <h3 className="font-bold text-slate-800 text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-rose-600 transition-colors">
            {product.name}
          </h3>

          <p className="mt-1.5 text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-xl sm:text-2xl font-black text-slate-900">
              {currency} {product.price.toFixed(2)}
            </span>
            {product.original_price && product.original_price > product.price && (
              <span className="text-xs text-slate-400 line-through">
                {currency} {product.original_price.toFixed(2)}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleWhatsAppBuy}
              title="Comprar directo por WhatsApp"
              className="w-full flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Pedir Ya</span>
            </button>

            <button
              onClick={handleAddToCart}
              disabled={!product.in_stock}
              title={product.in_stock ? 'Agregar a mi pedido' : 'Producto agotado'}
              className={`w-full flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl font-bold text-xs transition-colors cursor-pointer ${
                product.in_stock
                  ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
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