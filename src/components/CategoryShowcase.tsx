'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Heart, Brain, Gamepad2, Car, Baby, Shapes } from 'lucide-react';

const CATEGORY_CARDS = [
  {
    name: 'Peluches',
    icon: Heart,
    desc: 'Suaves y tiernos',
    cardBg: 'bg-pink-50 hover:bg-pink-100/70 border-pink-200',
    iconBg: 'bg-pink-200 text-pink-800',
    titleColor: 'text-pink-950',
  },
  {
    name: 'Didácticos',
    icon: Brain,
    desc: 'Estimulación y lógica',
    cardBg: 'bg-sky-50 hover:bg-sky-100/70 border-sky-200',
    iconBg: 'bg-sky-200 text-sky-800',
    titleColor: 'text-sky-950',
  },
  {
    name: 'Figuras de Acción',
    icon: Shapes,
    desc: 'Héroes y aventuras',
    cardBg: 'bg-amber-50 hover:bg-amber-100/70 border-amber-200',
    iconBg: 'bg-amber-200 text-amber-800',
    titleColor: 'text-amber-950',
  },
  {
    name: 'Juegos de Mesa',
    icon: Gamepad2,
    desc: 'Diversión familiar',
    cardBg: 'bg-emerald-50 hover:bg-emerald-100/70 border-emerald-200',
    iconBg: 'bg-emerald-200 text-emerald-800',
    titleColor: 'text-emerald-950',
  },
  {
    name: 'Vehículos y Pistas',
    icon: Car,
    desc: 'Autos y circuitos',
    cardBg: 'bg-purple-50 hover:bg-purple-100/70 border-purple-200',
    iconBg: 'bg-purple-200 text-purple-800',
    titleColor: 'text-purple-950',
  },
  {
    name: 'Bebés',
    icon: Baby,
    desc: 'Primera infancia',
    cardBg: 'bg-teal-50 hover:bg-teal-100/70 border-teal-200',
    iconBg: 'bg-teal-200 text-teal-800',
    titleColor: 'text-teal-950',
  },
];

export function CategoryShowcase() {
  return (
    <section className="py-10 sm:py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 font-bold text-xs mb-1">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span>Categorías</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              Explora por Tipo de Juguete
            </h2>
          </div>

          <Link
            href="/catalogo"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-100 hover:bg-pink-50 text-slate-800 hover:text-pink-700 text-xs sm:text-sm font-bold border border-slate-200 transition-colors group cursor-pointer"
          >
            <span>Ver todo el catálogo</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 6 Category Cards in soft pastels */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {CATEGORY_CARDS.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.name}
                href={`/catalogo?categoria=${encodeURIComponent(cat.name)}`}
                className={`p-4 rounded-lg border ${cat.cardBg} transition-all duration-200 hover:shadow-sm flex flex-col justify-between group cursor-pointer`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${cat.iconBg}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`font-bold text-sm ${cat.titleColor} leading-tight`}>
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5 line-clamp-1">
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
