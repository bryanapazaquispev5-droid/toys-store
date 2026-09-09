'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Product } from '@/types/toy';
import { fetchProductById } from '@/lib/supabase';
import { generateSingleProductWhatsAppUrl, getCurrency, getStoreName, getWhatsAppNumber } from '@/lib/whatsapp';
import { useCart } from '@/context/CartContext';
import {
  ArrowLeft,
  MessageCircle,
  ShoppingBag,
  Check,
  AlertCircle,
  Truck,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const { addToCart } = useCart();
  const currency = getCurrency();
  const storeName = getStoreName();
  const phone = getWhatsAppNumber();

  useEffect(() => {
    async function load() {
      if (!id) return;
      setLoading(true);
      const data = await fetchProductById(id);
      setProduct(data);
      setLoading(false);
    }
    load();
  }, [id]);

  const handleAddToCart = () => {
    if (!product || !product.in_stock) return;
    addToCart(product, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  const handleWhatsAppBuy = () => {
    if (!product) return;
    const url = generateSingleProductWhatsAppUrl(product);
    window.open(url, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 py-16 flex-1 w-full animate-pulse">
          <div className="h-6 w-36 bg-sky-100 rounded-md mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="aspect-square bg-sky-50 rounded-lg border-2 border-sky-100" />
            <div className="space-y-4">
              <div className="h-4 w-24 bg-pink-100 rounded" />
              <div className="h-8 w-3/4 bg-slate-100 rounded" />
              <div className="h-6 w-32 bg-amber-100 rounded" />
              <div className="h-24 bg-sky-50 rounded" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <main className="max-w-xl mx-auto px-4 py-20 text-center flex-1">
          <div className="bg-sky-50 p-8 rounded-lg border-2 border-sky-200">
            <h2 className="text-2xl font-black text-slate-800">Juguete no encontrado</h2>
            <p className="text-sm text-slate-600 mt-2 mb-6">
              El producto que buscas ya no está disponible o el enlace no es correcto.
            </p>
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sky-500 text-white font-bold text-sm hover:bg-sky-600 transition-colors shadow-xs cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver al Catálogo</span>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const discountPercent = product.original_price && product.original_price > product.price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : null;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex-1 w-full">
        {/* Back navigation */}
        <div className="mb-6">
          <Link
            href="/catalogo"
            className="inline-flex items-center gap-2 text-xs font-black text-sky-900 hover:text-sky-950 transition-colors px-4 py-2 rounded-full bg-sky-100 hover:bg-sky-200 border border-sky-300"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver al Catálogo</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* Product Image Box in Soft Pastel Frame */}
          <div className="bg-pink-50/70 border-2 border-pink-200 rounded-lg p-3 sm:p-4 relative">
            <div className="aspect-square w-full rounded-md overflow-hidden bg-white border border-pink-100">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Badges */}
            <div className="absolute top-6 left-6 flex flex-col gap-1.5">
              {!product.in_stock ? (
                <span className="px-3 py-1 rounded-md text-xs font-bold bg-slate-900 text-white flex items-center gap-1 shadow-xs">
                  <AlertCircle className="w-3.5 h-3.5 text-rose-400" /> Agotado
                </span>
              ) : product.badge ? (
                <span className="px-3 py-1 rounded-md text-xs font-black bg-amber-200 text-amber-950 border border-amber-400 shadow-2xs">
                  {product.badge}
                </span>
              ) : null}

              {discountPercent && product.in_stock && (
                <span className="px-2 py-0.5 rounded-md text-xs font-black bg-pink-200 text-pink-900 border border-pink-400">
                  -{discountPercent}% DCTO
                </span>
              )}
            </div>
          </div>

          {/* Product Info Box in Soft Pastel Card */}
          <div className="bg-sky-50/60 p-6 rounded-lg border-2 border-sky-200 space-y-6">
            
            <div>
              {/* Category and age pills in solid pastels */}
              <div className="flex items-center gap-2 flex-wrap mb-3">
                <span className="text-xs font-bold text-pink-900 bg-pink-200 border border-pink-300 px-3 py-1 rounded-md">
                  {product.category}
                </span>
                <span className="text-xs font-bold text-sky-900 bg-sky-200 border border-sky-300 px-3 py-1 rounded-md">
                  Edad: {product.age_range}
                </span>
                {product.in_stock ? (
                  <span className="text-xs font-bold text-emerald-950 bg-emerald-200 border border-emerald-300 px-3 py-1 rounded-md flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> En Stock
                  </span>
                ) : (
                  <span className="text-xs font-bold text-slate-700 bg-slate-200 px-3 py-1 rounded-md">
                    Sin Stock
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
                {product.name}
              </h1>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-black text-slate-900">
                  {currency} {product.price.toFixed(2)}
                </span>
                {product.original_price && product.original_price > product.price && (
                  <span className="text-base text-slate-400 line-through font-semibold">
                    {currency} {product.original_price.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            {/* Description box */}
            <div className="bg-white/80 p-4 rounded-md border border-sky-100">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Descripción del Juguete
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                {product.description}
              </p>
            </div>

            {/* Quantity Selector */}
            {product.in_stock && (
              <div className="flex items-center gap-4 pt-1">
                <span className="text-xs font-black text-slate-800">Cantidad:</span>
                <div className="flex items-center border border-slate-300 rounded-full bg-white p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-full bg-slate-100 text-slate-800 hover:bg-slate-200 flex items-center justify-center font-bold text-sm shadow-2xs cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-sm font-black text-slate-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-full bg-slate-100 text-slate-800 hover:bg-slate-200 flex items-center justify-center font-bold text-sm shadow-2xs cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons: WhatsApp & Cart (Rounded for buttons) */}
            <div className="space-y-3 pt-1">
              <button
                onClick={handleWhatsAppBuy}
                className="w-full py-3.5 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-xs transition-colors flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Pedir este Juguete por WhatsApp</span>
              </button>

              <button
                onClick={handleAddToCart}
                disabled={!product.in_stock}
                className={`w-full py-3 px-6 rounded-full font-bold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                  product.in_stock
                    ? 'bg-pink-500 hover:bg-pink-600 text-white shadow-xs'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{addedAnimation ? '¡Agregado al Carrito! ✓' : '+ Agregar a Mi Pedido'}</span>
              </button>
            </div>

            {/* Pastel assurance blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-lg bg-sky-100 border border-sky-300 flex items-center gap-3">
                <Truck className="w-5 h-5 text-sky-700 shrink-0" />
                <div>
                  <h5 className="text-xs font-black text-sky-950">Envíos Rápidos</h5>
                  <p className="text-[11px] text-sky-800">Coordinación directa a tu casa</p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-emerald-100 border border-emerald-300 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
                <div>
                  <h5 className="text-xs font-black text-emerald-950">Pagos Seguros</h5>
                  <p className="text-[11px] text-emerald-800">Aceptamos Yape, Plin y BCP</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
