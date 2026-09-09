'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Heart, Brain, Gamepad2, Car, Baby, Shapes } from 'lucide-react';

const CATEGORY_CARDS = [
  {
    name: 'Peluches',
    icon: Heart,
    desc: 'Suaves y tiernos',
    cardBg: 'bg-amber-50 hover:bg-amber-100/80 border-amber-200 hover:border-amber-300',
    iconBg: 'bg-amber-500 text-white shadow-md shadow-amber-200',
    titleColor: 'text-amber-950',
  },
  {
    name: 'Didácticos',
    icon: Brain,
    desc: 'Estimulación y bloques',
    cardBg: 'bg-blue-50 hover:bg-blue-100/80 border-blue-200 hover:border-blue-300',
    iconBg: 'bg-blue-500 text-white shadow-md shadow-blue-200',
    titleColor: 'text-blue-950',
  },
  {
    name: 'Figuras de Acción',
    icon: Shapes,
    desc: 'Héroes y aventuras',
    cardBg: 'bg-rose-50 hover:bg-rose-100/80 border-rose-200 hover:border-rose-300',
    iconBg: 'bg-rose-500 text-white shadow-md shadow-rose-200',
    titleColor: 'text-rose-950',
  },
  {
    name: 'Juegos de Mesa',
    icon: Gamepad2,
    desc: 'Diversión familiar',
    cardBg: 'bg-emerald-50 hover:bg-emerald-100/80 border-emerald-200 hover:border-emerald-300',
    iconBg: 'bg-emerald-500 text-white shadow-md shadow-emerald-200',
    titleColor: 'text-emerald-950',
  },
  {
    name: 'Vehículos y Pistas',
    icon: Car,
    desc: 'Autos y circuitos',
    cardBg: 'bg-purple-50 hover:bg-purple-100/80 border-purple-200 hover:border-purple-300',
    iconBg: 'bg-purple-500 text-white shadow-md shadow-purple-200',
    titleColor: 'text-purple-950',
  },
  {
    name: 'Bebés',
    icon: Baby,
    desc: 'Primera infancia',
    cardBg: 'bg-teal-50 hover:bg-teal-100/80 border-teal-200 hover:border-teal-300',
    iconBg: 'bg-teal-500 text-white shadow-md shadow-teal-200',
    titleColor: 'text-teal-950',
  },
];

export function CategoryShowcase() {
  return (
    <section className="py-12 sm:py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 font-extrabold text-xs mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Explora por Categoría</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              ¿Qué tipo de juguete buscas hoy?
            </h2>
          </div>

          <Link
            href="/catalogo"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs sm:text-sm font-black transition-all shadow-md shadow-amber-200 hover:scale-102 group cursor-pointer"
          >
            <span>Ver todo el catálogo</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 6 Vibrant Category Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
          {CATEGORY_CARDS.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.name}
                href={`/catalogo?categoria=${encodeURIComponent(cat.name)}`}
                className={`p-4 sm:p-5 rounded-3xl border-2 ${cat.cardBg} transition-all duration-300 hover:scale-104 hover:shadow-lg flex flex-col justify-between group cursor-pointer`}
              >
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-3.5 ${cat.iconBg} transform group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className={`font-black text-sm sm:text-base ${cat.titleColor} leading-tight`}>
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-slate-600 font-medium mt-1">
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
