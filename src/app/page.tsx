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
  PackageCheck,
  ShoppingBag,
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
      // Pick top 4 products for clean showcase
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

      {/* Category Visual Showcase */}
      <CategoryShowcase />

      {/* Featured Top Picks Section (4 Curated Cards with Colorful Accents) */}
      <section id="destacados" className="py-14 sm:py-20 bg-rose-50/40 border-b border-rose-100">
        <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-black mb-2 border border-rose-200">
                <Flame className="w-4 h-4 text-rose-500 fill-rose-500 animate-bounce" />
                <span>¡Los Más Pedidos de la Semana!</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                Juguetes Estrella & Más Populares
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
                Una selección especial de los juguetes favoritos por los niños.
              </p>
            </div>

            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs sm:text-sm transition-all hover:scale-103 shadow-md group cursor-pointer"
            >
              <span>Ver Catálogo Completo</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-3xl p-4 border border-rose-100 shadow-sm animate-pulse">
                  <div className="aspect-square bg-rose-100/50 rounded-2xl mb-4" />
                  <div className="h-4 bg-rose-100 rounded-full w-2/3 mb-2" />
                  <div className="h-3 bg-rose-50 rounded-full w-full mb-4" />
                  <div className="h-8 bg-rose-100 rounded-xl" />
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

          {/* Banner Button to explore full catalog */}
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

      {/* WhatsApp Personal Shopper Banner (Vibrant Emerald & Teal) */}
      <section className="py-14 bg-linear-to-r from-emerald-500 via-teal-500 to-cyan-600 text-white relative overflow-hidden shadow-inner">
        <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center lg:text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/25 backdrop-blur-xs text-white text-xs font-black shadow-xs">
                <Gift className="w-4 h-4 text-amber-300" />
                <span>¿Buscas un regalo para cumpleaños o fecha especial?</span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-snug">
                ¡Te asesoramos en tiempo real con fotos y videos por WhatsApp!
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100 font-medium">
                Dinos la edad del niño o niña y tu presupuesto, y te enviaremos opciones ideales disponibles en stock de inmediato.
              </p>
            </div>

            <a
              href={`https://wa.me/${phone}?text=${encodeURIComponent('¡Hola! 👋 Quisiera que me asesoren para elegir un regalo según la edad.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-2xl bg-white hover:bg-emerald-50 text-emerald-800 font-black text-sm sm:text-base shadow-2xl transition-all hover:scale-104 flex items-center gap-3 shrink-0 cursor-pointer"
            >
              <MessageCircle className="w-6 h-6 fill-emerald-600 text-emerald-600" />
              <span>Escribir al WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* 3 Simple Steps with Colorful Number Badges */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 font-black text-xs mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Fácil, Rápido y Seguro</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              ¿Cómo comprar tus juguetes favoritos?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-6 rounded-3xl bg-amber-50/70 border-2 border-amber-200 transition-all hover:shadow-lg">
              <div className="w-12 h-12 rounded-2xl bg-amber-400 text-white font-black text-xl flex items-center justify-center mb-4 shadow-md shadow-amber-200">
                1
              </div>
              <h4 className="font-black text-slate-900 text-base">Elige tus juguetes</h4>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-medium">
                Explora el catálogo, filtra por edades y agrega tus productos favoritos a tu carrito de compras.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-rose-50/70 border-2 border-rose-200 transition-all hover:shadow-lg">
              <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white font-black text-xl flex items-center justify-center mb-4 shadow-md shadow-rose-200">
                2
              </div>
              <h4 className="font-black text-slate-900 text-base">Envía tu pedido a WhatsApp</h4>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-medium">
                Con un solo clic se redacta el detalle exacto de tu pedido con precios y datos de entrega.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-indigo-50/70 border-2 border-indigo-200 transition-all hover:shadow-lg">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500 text-white font-black text-xl flex items-center justify-center mb-4 shadow-md shadow-indigo-200">
                3
              </div>
              <h4 className="font-black text-slate-900 text-base">Paga con Yape/Plin y Recibe</h4>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-medium">
                Paga fácil con Yape, Plin o Transferencia bancaria y enviamos tu paquete con delivery seguro.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}