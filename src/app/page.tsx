'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroBanner } from '@/components/HeroBanner';
import { ProductCard } from '@/components/ProductCard';
import { Footer } from '@/components/Footer';
import { Product, CATEGORIES, Category, AGE_RANGES } from '@/types/toy';
import { fetchProducts } from '@/lib/supabase';
import { Filter, SlidersHorizontal, RefreshCw } from 'lucide-react';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('Todos');
  const [selectedAge, setSelectedAge] = useState<string>('Todas las edades');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');
  const [onlyInStock, setOnlyInStock] = useState(false);

  const loadData = async () => {
    setLoading(true);
    const data = await fetchProducts();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        if (search.trim()) {
          const q = search.toLowerCase();
          const matchName = product.name.toLowerCase().includes(q);
          const matchDesc = product.description.toLowerCase().includes(q);
          const matchCat = product.category.toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchCat) return false;
        }

        if (selectedCategory !== 'Todos' && product.category !== selectedCategory) {
          return false;
        }

        if (selectedAge !== 'Todas las edades' && product.age_range !== selectedAge) {
          return false;
        }

        if (onlyInStock && !product.in_stock) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'featured') {
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        }
        if (sortBy === 'price-asc') {
          return a.price - b.price;
        }
        if (sortBy === 'price-desc') {
          return b.price - a.price;
        }
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        }
        return 0;
      });
  }, [products, search, selectedCategory, selectedAge, onlyInStock, sortBy]);

  return (
    <div className="flex-1 flex flex-col">
      <Navbar searchTerm={search} onSearchChange={setSearch} />
      <HeroBanner />

      <main id="catalogo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🧸</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
                Catálogo de Juguetes
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
              Mostrando {filteredProducts.length} {filteredProducts.length === 1 ? 'producto' : 'productos'} disponibles
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-white border border-slate-200 px-3 py-2 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors shadow-2xs">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="w-4 h-4 text-rose-500 rounded-md focus:ring-rose-400"
              />
              <span>Solo en Stock</span>
            </label>

            <button
              onClick={loadData}
              title="Actualizar catálogo"
              className="p-2 bg-white hover:bg-slate-50 text-slate-600 rounded-xl border border-slate-200 shadow-2xs transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-rose-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2">
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-200 scale-103'
                    : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 shadow-2xs'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Filter bar */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Edad:
            </span>
            <select
              value={selectedAge}
              onChange={(e) => setSelectedAge(e.target.value)}
              className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-700 outline-hidden focus:border-rose-400 transition-colors"
            >
              {AGE_RANGES.map((age) => (
                <option key={age} value={age}>
                  {age}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Ordenar:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-700 outline-hidden focus:border-rose-400 transition-colors"
            >
              <option value="featured">Destacados</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
              <option value="name">Nombre (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        <div className="mt-8">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs animate-pulse">
                  <div className="aspect-square bg-slate-200 rounded-2xl mb-4" />
                  <div className="h-4 bg-slate-200 rounded-full w-2/3 mb-2" />
                  <div className="h-3 bg-slate-100 rounded-full w-full mb-4" />
                  <div className="h-8 bg-slate-200 rounded-xl" />
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs max-w-md mx-auto my-8">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-lg font-bold text-slate-800">No encontramos juguetes</h3>
              <p className="text-xs text-slate-500 mt-2">
                No hay productos que coincidan con la búsqueda. Intenta con otra categoría.
              </p>
              <button
                onClick={() => {
                  setSearch('');
                  setSelectedCategory('Todos');
                  setSelectedAge('Todas las edades');
                  setOnlyInStock(false);
                }}
                className="mt-5 px-4 py-2 rounded-xl bg-rose-500 text-white text-xs font-bold hover:bg-rose-600 transition-colors cursor-pointer"
              >
                Limpiar Filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}