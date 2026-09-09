'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Heart, Brain, Gamepad2, Car, Baby, Shapes } from 'lucide-react';

const CATEGORY_CARDS = [
  {
    name: 'Peluches',
    icon: Heart,
    desc: 'Suaves y abrazables',
    accent: 'text-rose-600 bg-rose-50 border-rose-100',
  },
  {
    name: 'Didácticos',
    icon: Brain,
    desc: 'Estimulación y lógica',
    accent: 'text-blue-600 bg-blue-50 border-blue-100',
  },
  {
    name: 'Figuras de Acción',
    icon: Shapes,
    desc: 'Héroes y personajes',
    accent: 'text-orange-600 bg-orange-50 border-orange-100',
  },
  {
    name: 'Juegos de Mesa',
    icon: Gamepad2,
    desc: 'Diversión familiar',
    accent: 'text-emerald-600 bg-emerald-50 border-emerald-100',
  },
  {
    name: 'Vehículos y Pistas',
    icon: Car,
    desc: 'Autos y circuitos',
    accent: 'text-purple-600 bg-purple-50 border-purple-100',
  },
  {
    name: 'Bebés',
    icon: Baby,
    desc: 'Mordederas y sonajeros',
    accent: 'text-cyan-600 bg-cyan-50 border-cyan-100',
  },
];

export function CategoryShowcase() {
  return (
    <section className="py-12 sm:py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-1.5 text-rose-600 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Categorías</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              Explora por Tipo de Juguete
            </h2>
          </div>

          <Link
            href="/catalogo"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-rose-600 hover:text-rose-700 transition-colors group"
          >
            <span>Ver todo el catálogo</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Crisp clean 6-column category cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {CATEGORY_CARDS.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.name}
                href={`/catalogo?categoria=${encodeURIComponent(cat.name)}`}
                className="p-4 sm:p-5 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 border ${cat.accent}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-rose-600 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                    {cat.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
