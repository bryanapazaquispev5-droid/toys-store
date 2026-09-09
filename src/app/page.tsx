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
  Flame,
  ArrowRight,
  Sparkles,
  MessageCircle,
  Gift,
  Star,
  CheckCircle2,
  PackageCheck
} from 'lucide-react';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const phone = getWhatsAppNumber();

  useEffect(() => {
    async function loadFeatured() {
      setLoading(true);
      const all = await fetchProducts();
      // Pick top 4-6 featured products for a clean, non-overwhelming showcase
      const featured = all.filter((p) => p.featured || p.badge).slice(0, 4);
      setFeaturedProducts(featured.length > 0 ? featured : all.slice(0, 4));
      setLoading(false);
    }
    loadFeatured();
  }, []);

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50/50">
      <Navbar />

      {/* Hero Banner with CTA */}
      <HeroBanner />

      {/* Category Visual Showcase (Bento Cards) */}
      <CategoryShowcase />

      {/* Featured Top Picks Section (Only 4 curated cards) */}
      <section id="destacados" className="py-14 sm:py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-bold mb-2">
                <Flame className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                <span>Los Favoritos de la Semana</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                Juguetes Más Populares
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Una pequeña selección de nuestros juguetes más pedidos.
              </p>
            </div>

            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-all hover:scale-102 shadow-xs group cursor-pointer"
            >
              <span>Ver Catálogo Completo</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-slate-50 rounded-3xl p-4 border border-slate-100 animate-pulse">
                  <div className="aspect-square bg-slate-200 rounded-2xl mb-4" />
                  <div className="h-4 bg-slate-200 rounded-full w-2/3 mb-2" />
                  <div className="h-3 bg-slate-100 rounded-full w-full mb-4" />
                  <div className="h-8 bg-slate-200 rounded-xl" />
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

          {/* Banner inside featured to jump to full list */}
          <div className="mt-12 text-center">
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-3xl bg-linear-to-r from-rose-500 via-amber-500 to-indigo-600 hover:from-rose-600 hover:to-indigo-700 text-white font-black text-sm sm:text-base shadow-xl shadow-rose-200 hover:shadow-2xl transition-all hover:scale-103 cursor-pointer"
            >
              <PackageCheck className="w-5 h-5" />
              <span>Explorar Todos los Juguetes con Búsqueda en Vivo</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* WhatsApp Personal Shopper Banner */}
      <section className="py-12 sm:py-16 bg-linear-to-r from-emerald-500 via-teal-600 to-cyan-600 text-white relative overflow-hidden">
        <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center lg:text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold">
                <Gift className="w-3.5 h-3.5" />
                <span>¿Buscas un regalo para cumpleaños o fecha especial?</span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-snug">
                ¡Te asesoramos en tiempo real con fotos y videos por WhatsApp!
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100 font-normal">
                Dinos la edad del niño o niña y tu presupuesto, y te enviaremos opciones ideales disponibles en stock de inmediato.
              </p>
            </div>

            <a
              href={`https://wa.me/${phone}?text=${encodeURIComponent('¡Hola! 👋 Quisiera que me asesoren para elegir un regalo según la edad.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-2xl bg-white hover:bg-emerald-50 text-emerald-800 font-black text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all hover:scale-103 flex items-center gap-3 shrink-0 cursor-pointer"
            >
              <MessageCircle className="w-6 h-6 fill-emerald-600 text-emerald-600" />
              <span>Escribir al WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* How it works: 3 Simple Steps */}
      <section className="py-14 sm:py-18 bg-white border-b border-slate-100">
        <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 text-rose-500 font-bold text-xs uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Simple y Rápido</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              ¿Cómo comprar en 3 simples pasos?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 text-left space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 font-black text-xl flex items-center justify-center">
                1
              </div>
              <h4 className="font-bold text-slate-900 text-base">Explora el Catálogo</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Elige los juguetes que te gusten o usa el carrito para juntar varios en un solo pedido.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 text-left space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 font-black text-xl flex items-center justify-center">
                2
              </div>
              <h4 className="font-bold text-slate-900 text-base">Envía tu Pedido a WhatsApp</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Presiona el botón de compra y se redactará automáticamente tu pedido con todos los detalles.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 text-left space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 font-black text-xl flex items-center justify-center">
                3
              </div>
              <h4 className="font-bold text-slate-900 text-base">Paga y Recibe en Casa</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Paga con Yape, Plin o Transferencia y coordinamos el delivery directo a tu puerta.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}