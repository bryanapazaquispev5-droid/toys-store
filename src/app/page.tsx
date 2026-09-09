'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { HeroBanner } from '@/components/HeroBanner';
import { CategoryShowcase } from '@/components/CategoryShowcase';
import { FeaturedCarousel } from '@/components/FeaturedCarousel';
import { Footer } from '@/components/Footer';
import { Product } from '@/types/toy';
import { fetchProducts } from '@/lib/supabase';
import { getWhatsAppNumber } from '@/lib/whatsapp';
import {
  ArrowRight,
  MessageCircle,
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
      // Select top 8 products for wide showcase and mobile carousel
      const featured = all.filter((p) => p.featured || p.badge).slice(0, 8);
      setFeaturedProducts(featured.length > 0 ? featured : all.slice(0, 8));
      setLoading(false);
    }
    loadFeatured();
  }, []);

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-white">
      <Navbar />

      {/* Hero Banner with Pastel Highlights */}
      <HeroBanner />

      {/* Categories in Soft Pastels */}
      <CategoryShowcase />

      {/* Featured Products in Soft Pastel Pink Section */}
      <section id="destacados" className="py-10 sm:py-16 2xl:py-20 bg-pink-50/70 border-b border-pink-200">
        <div className="w-full max-w-[2200px] 3xl:max-w-[2500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-200 text-pink-900 text-xs font-bold mb-1 border border-pink-300">
                <span>Más Populares</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Juguetes Destacados
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5 font-medium">
                Los juguetes favoritos de esta temporada.
              </p>
            </div>

            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs sm:text-sm transition-colors shadow-xs group cursor-pointer self-start sm:self-auto"
            >
              <span>Ver Catálogo Completo</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <FeaturedCarousel products={featuredProducts} loading={loading} />

          {/* Clean CTA to full catalog */}
          <div className="mt-10 text-center">
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm shadow-xs transition-colors cursor-pointer"
            >
              <PackageCheck className="w-4 h-4" />
              <span>Explorar Todos los Juguetes en el Catálogo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* WhatsApp Consultation Banner in Soft Pastel Mint */}
      <section className="py-12 sm:py-16 bg-emerald-100 border-b border-emerald-300 text-emerald-950">
        <div className="w-full max-w-[2200px] 3xl:max-w-[2500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center lg:text-left max-w-3xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-200 text-emerald-950 text-xs font-bold border border-emerald-300">
                <span>Asesoría Personalizada</span>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight">
                ¿Buscas un regalo y necesitas recomendaciones?
              </h3>
              <p className="text-xs sm:text-sm text-emerald-900 font-medium">
                Escríbenos por WhatsApp indicando la edad y tu presupuesto para enviarte opciones con fotos reales al instante.
              </p>
            </div>

            <a
              href={`/mensaje-enviado?text=${encodeURIComponent('¡Hola! Quisiera que me asesoren para elegir un regalo según la edad 🧸')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-xs transition-colors flex items-center gap-2.5 shrink-0 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>Escribir por WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* 3 Steps Guide in Soft Pastel Sky Section */}
      <section className="py-12 sm:py-16 2xl:py-20 bg-sky-50 border-b border-sky-200">
        <div className="w-full max-w-[2200px] 3xl:max-w-[2500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16 text-center">
          <div className="max-w-md mx-auto mb-10">
            <h2 className="text-2xl font-black text-sky-950 tracking-tight">
              ¿Cómo hacer tu pedido?
            </h2>
            <p className="text-xs text-sky-800 mt-1 font-medium">
              3 pasos sencillos para recibir tus juguetes en casa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
            <div className="p-5 rounded-lg bg-sky-100 border border-sky-300">
              <div className="w-9 h-9 rounded-full bg-sky-300 text-sky-950 font-bold text-sm flex items-center justify-center mb-3">
                1
              </div>
              <h4 className="font-bold text-sky-950 text-sm">Explora el Catálogo</h4>
              <p className="text-xs text-sky-900 mt-1 leading-relaxed">
                Revisa los productos, haz clic para ver fotos y agrega los juguetes a tu pedido.
              </p>
            </div>

            <div className="p-5 rounded-lg bg-pink-100 border border-pink-300">
              <div className="w-9 h-9 rounded-full bg-pink-300 text-pink-950 font-bold text-sm flex items-center justify-center mb-3">
                2
              </div>
              <h4 className="font-bold text-pink-950 text-sm">Envía a WhatsApp</h4>
              <p className="text-xs text-pink-900 mt-1 leading-relaxed">
                Toca el botón y se enviará tu pedido formateado con precios y datos de entrega.
              </p>
            </div>

            <div className="p-5 rounded-lg bg-amber-100 border border-amber-300">
              <div className="w-9 h-9 rounded-full bg-amber-300 text-amber-950 font-bold text-sm flex items-center justify-center mb-3">
                3
              </div>
              <h4 className="font-bold text-amber-950 text-sm">Paga y Recibe</h4>
              <p className="text-xs text-amber-900 mt-1 leading-relaxed">
                Paga fácil con Yape, Plin o Transferencia y coordinamos el delivery a tu casa.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}