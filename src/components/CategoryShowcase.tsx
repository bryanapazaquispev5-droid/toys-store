'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

const CATEGORY_CARDS = [
  {
    name: 'Peluches',
    emoji: '🧸',
    desc: 'Suaves, tiernos y abrazables',
    bg: 'from-amber-500/10 to-rose-500/10 hover:from-amber-500/20 hover:to-rose-500/20',
    border: 'border-amber-200/70',
    textAccent: 'text-amber-700',
  },
  {
    name: 'Didácticos',
    emoji: '🧩',
    desc: 'Estimulación, bloques y lógica',
    bg: 'from-blue-500/10 to-indigo-500/10 hover:from-blue-500/20 hover:to-indigo-500/20',
    border: 'border-blue-200/70',
    textAccent: 'text-blue-700',
  },
  {
    name: 'Figuras de Acción',
    emoji: '🦸‍♂️',
    desc: 'Héroes, robots y personajes',
    bg: 'from-red-500/10 to-orange-500/10 hover:from-red-500/20 hover:to-orange-500/20',
    border: 'border-red-200/70',
    textAccent: 'text-red-700',
  },
  {
    name: 'Juegos de Mesa',
    emoji: '🎲',
    desc: 'Diversión familiar y estrategia',
    bg: 'from-emerald-500/10 to-teal-500/10 hover:from-emerald-500/20 hover:to-teal-500/20',
    border: 'border-emerald-200/70',
    textAccent: 'text-emerald-700',
  },
  {
    name: 'Vehículos y Pistas',
    emoji: '🏎️',
    desc: 'Carros a control y circuitos',
    bg: 'from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20',
    border: 'border-purple-200/70',
    textAccent: 'text-purple-700',
  },
  {
    name: 'Bebés',
    emoji: '🍼',
    desc: 'Mordederas, sonajeros y primera edad',
    bg: 'from-cyan-500/10 to-sky-500/10 hover:from-cyan-500/20 hover:to-sky-500/20',
    border: 'border-cyan-200/70',
    textAccent: 'text-cyan-700',
  },
];

export function CategoryShowcase() {
  return (
    <section className="py-12 sm:py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-rose-500 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explora por Categoría</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              Encuentra el regalo perfecto
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

        {/* 6 Category Bento Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {CATEGORY_CARDS.map((cat) => (
            <Link
              key={cat.name}
              href={`/catalogo?categoria=${encodeURIComponent(cat.name)}`}
              className={`p-4 sm:p-5 rounded-3xl bg-linear-to-b ${cat.bg} border ${cat.border} transition-all duration-300 hover:scale-103 hover:shadow-lg flex flex-col justify-between group cursor-pointer text-center sm:text-left`}
            >
              <div className="text-3xl sm:text-4xl mb-3 transform group-hover:scale-110 transition-transform">
                {cat.emoji}
              </div>
              <div>
                <h3 className={`font-bold text-sm sm:text-base text-slate-900 group-hover:${cat.textAccent} transition-colors`}>
                  {cat.name}
                </h3>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-1 hidden sm:block">
                  {cat.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
