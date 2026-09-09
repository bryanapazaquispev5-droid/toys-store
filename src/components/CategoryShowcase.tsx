'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Heart, Brain, Gamepad2, Car, Baby, Shapes } from 'lucide-react';

const CATEGORY_CARDS = [
  {
    name: 'Peluches',
    icon: Heart,
    desc: 'Suaves y tiernos',
    cardBg: 'bg-pink-100 hover:bg-pink-200/80 border-2 border-pink-300',
    iconBg: 'bg-pink-300 text-pink-950',
    titleColor: 'text-pink-950',
  },
  {
    name: 'Didácticos',
    icon: Brain,
    desc: 'Estimulación y bloques',
    cardBg: 'bg-sky-100 hover:bg-sky-200/80 border-2 border-sky-300',
    iconBg: 'bg-sky-300 text-sky-950',
    titleColor: 'text-sky-950',
  },
  {
    name: 'Figuras de Acción',
    icon: Shapes,
    desc: 'Héroes y aventuras',
    cardBg: 'bg-amber-100 hover:bg-amber-200/80 border-2 border-amber-300',
    iconBg: 'bg-amber-300 text-amber-950',
    titleColor: 'text-amber-950',
  },
  {
    name: 'Juegos de Mesa',
    icon: Gamepad2,
    desc: 'Diversión familiar',
    cardBg: 'bg-emerald-100 hover:bg-emerald-200/80 border-2 border-emerald-300',
    iconBg: 'bg-emerald-300 text-emerald-950',
    titleColor: 'text-emerald-950',
  },
  {
    name: 'Vehículos y Pistas',
    icon: Car,
    desc: 'Autos y circuitos',
    cardBg: 'bg-purple-100 hover:bg-purple-200/80 border-2 border-purple-300',
    iconBg: 'bg-purple-300 text-purple-950',
    titleColor: 'text-purple-950',
  },
  {
    name: 'Bebés',
    icon: Baby,
    desc: 'Primera infancia',
    cardBg: 'bg-teal-100 hover:bg-teal-200/80 border-2 border-teal-300',
    iconBg: 'bg-teal-300 text-teal-950',
    titleColor: 'text-teal-950',
  },
];

export function CategoryShowcase() {
  return (
    <section className="py-10 sm:py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-200 text-sky-900 font-bold text-xs mb-1">
              <Sparkles className="w-3.5 h-3.5 text-sky-700" />
              <span>Categorías</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              Explora por Tipo de Juguete
            </h2>
          </div>

          <Link
            href="/catalogo"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-sky-500 hover:bg-sky-600 text-white text-xs sm:text-sm font-bold shadow-xs transition-colors group cursor-pointer"
          >
            <span>Ver todo el catálogo</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 6 Category Cards in solid pastel colors */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {CATEGORY_CARDS.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.name}
                href={`/catalogo?categoria=${encodeURIComponent(cat.name)}`}
                className={`p-4 rounded-lg border-2 ${cat.cardBg} transition-all duration-200 hover:shadow-md flex flex-col justify-between group cursor-pointer`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${cat.iconBg} shadow-2xs`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`font-black text-sm ${cat.titleColor} leading-tight`}>
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-slate-600 font-semibold mt-0.5 line-clamp-1">
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
