'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { HeroBanner } from '@/components/HeroBanner';
import { CategoryShowcase } from '@/components/CategoryShowcase';
import { ProductCard } from '@/components/ProductCard';
import { Footer } from '@/components/Footer';
import { Product } from '@/types/toy';
import { fetchProducts } from '@/lib/supabase';
import { getWhatsAppNumber } from '@/lib/whatsapp';
import {
  Sparkles,
  ArrowRight,
  MessageCircle,
  Gift,
  Package,
  CheckCircle2
} from 'lucide-react';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const phone = getWhatsAppNumber();

  useEffect(() => {
    async function loadFeatured() {
      setLoading(true);
      const all = await fetchProducts();
      // Select top 4 products for a clean, focused display
      const featured = all.filter((p) => p.featured || p.badge).slice(0, 4);
      setFeaturedProducts(featured.length > 0 ? featured : all.slice(0, 4));
      setLoading(false);
    }
    loadFeatured();
  }, []);

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-white">
      <Navbar />

      {/* Hero Banner */}
      <HeroBanner />

      {/* Categories Showcase */}
      <CategoryShowcase />

      {/* Featured Products Section (Clean, max 4 cards) */}
      <section id="destacados" className="py-14 sm:py-18 bg-slate-50/50 border-b border-slate-200">
        <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-600 text-xs font-semibold mb-1 border border-rose-100">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Destacados</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Juguetes Populares
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Una selección de los productos más pedidos esta semana.
              </p>
            </div>

            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-semibold text-xs sm:text-sm border border-slate-200 transition-colors shadow-2xs group"
            >
              <span>Ver todos los productos</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs animate-pulse">
                  <div className="aspect-square bg-slate-200 rounded-xl mb-4" />
                  <div className="h-4 bg-slate-200 rounded-md w-2/3 mb-2" />
                  <div className="h-3 bg-slate-100 rounded-md w-full mb-4" />
                  <div className="h-8 bg-slate-200 rounded-lg" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Clean CTA to full catalog */}
          <div className="mt-10 text-center">
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-xs transition-colors"
            >
              <Package className="w-4 h-4" />
              <span>Explorar Catálogo Completo con Búsqueda en Vivo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* WhatsApp Consultation Banner - Solid clean colors */}
      <section className="py-12 bg-emerald-600 text-white border-b border-emerald-700">
        <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center lg:text-left max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500 text-white text-xs font-medium">
                <Gift className="w-3.5 h-3.5" />
                <span>Asesoría personalizada</span>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight">
                ¿Buscas un regalo y necesitas recomendaciones?
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100">
                Escríbenos por WhatsApp indicando la edad y tu presupuesto para enviarte fotos y opciones disponibles en el momento.
              </p>
            </div>

            <a
              href={`https://wa.me/${phone}?text=${encodeURIComponent('¡Hola! Quisiera asesoría para elegir un juguete según la edad.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-white hover:bg-emerald-50 text-emerald-900 font-bold text-sm shadow-xs transition-colors flex items-center gap-2 shrink-0"
            >
              <MessageCircle className="w-5 h-5 fill-emerald-600 text-emerald-600" />
              <span>Escribir por WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* Simple 3-step guide */}
      <section className="py-14 bg-white border-b border-slate-200">
        <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-md mx-auto mb-8">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              ¿Cómo realizar tu pedido?
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Comprar en nuestra tienda es fácil, rápido y seguro.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 font-bold text-sm flex items-center justify-center mb-3">
                1
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Elige tus productos</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Revisa el catálogo y agrega al carrito los juguetes que deseas pedir.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 font-bold text-sm flex items-center justify-center mb-3">
                2
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Envía tu pedido a WhatsApp</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                El sistema redacta el detalle de tu compra automáticamente con precios y dirección.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 font-bold text-sm flex items-center justify-center mb-3">
                3
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Paga y recibe tu entrega</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Realiza el pago por Yape, Plin o Transferencia y enviamos tu paquete a domicilio.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}