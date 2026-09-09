'use client';

import React, { useEffect, useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { ProductCard } from '@/components/ProductCard';
import { Footer } from '@/components/Footer';
import { Product, CATEGORIES, Category, AGE_RANGES } from '@/types/toy';
import { fetchProducts } from '@/lib/supabase';
import { generateSingleProductWhatsAppUrl, getCurrency } from '@/lib/whatsapp';
import { useCart } from '@/context/CartContext';
import {
  Search,
  Filter,
  SlidersHorizontal,
  RefreshCw,
  LayoutGrid,
  List as ListIcon,
  MessageCircle,
  ShoppingBag,
  AlertCircle,
  Sparkles,
  X
} from 'lucide-react';
import Link from 'next/link';

type GenderFilter = 'todos' | 'niños' | 'niñas';

function CatalogContent() {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get('categoria') as Category | null;
  const initialGender = searchParams.get('genero') as GenderFilter | null;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedGender, setSelectedGender] = useState<GenderFilter>(
    initialGender && ['todos', 'niños', 'niñas'].includes(initialGender) ? initialGender : 'todos'
  );
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    initialCat && CATEGORIES.includes(initialCat) ? initialCat : 'Todos'
  );
  const [selectedAge, setSelectedAge] = useState<string>('Todas las edades');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const { addToCart } = useCart();
  const currency = getCurrency();

  const loadData = async () => {
    setLoading(true);
    const data = await fetchProducts();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (initialCat && CATEGORIES.includes(initialCat)) {
      setSelectedCategory(initialCat);
    }
  }, [initialCat]);

  // Real-time live filtering including gender, category, search, and age
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Gender filter: if niños -> include 'niños' & 'unisex'; if niñas -> include 'niñas' & 'unisex'
        if (selectedGender === 'niños') {
          if (product.gender === 'niñas') return false;
        } else if (selectedGender === 'niñas') {
          if (product.gender === 'niños') return false;
        }

        if (search.trim()) {
          const q = search.toLowerCase();
          const matchName = product.name.toLowerCase().includes(q);
          const matchDesc = product.description.toLowerCase().includes(q);
          const matchCat = product.category.toLowerCase().includes(q);
          const matchAge = product.age_range.toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchCat && !matchAge) return false;
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
  }, [products, search, selectedGender, selectedCategory, selectedAge, onlyInStock, sortBy]);

  const activeFiltersCount =
    (selectedGender !== 'todos' ? 1 : 0) +
    (selectedCategory !== 'Todos' ? 1 : 0) +
    (selectedAge !== 'Todas las edades' ? 1 : 0) +
    (onlyInStock ? 1 : 0) +
    (search.trim() ? 1 : 0);

  const resetAllFilters = () => {
    setSearch('');
    setSelectedGender('todos');
    setSelectedCategory('Todos');
    setSelectedAge('Todas las edades');
    setOnlyInStock(false);
    setSortBy('featured');
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-white">
      <Navbar searchTerm={search} onSearchChange={setSearch} />

      {/* Header section in rich pastel sky */}
      <div className="bg-sky-100/90 border-b border-sky-200 py-8">
        <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-200 text-sky-950 font-black text-xs mb-2 border border-sky-300">
                <Sparkles className="w-3.5 h-3.5 text-sky-700" />
                <span>Catálogo Completo</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-sky-950 tracking-tight">
                Catálogo de Juguetes
              </h1>
              <p className="text-xs sm:text-sm text-sky-800 mt-1 font-medium">
                Elige juguetes para niños, niñas o para todos, filtra por edad y pide directo a WhatsApp.
              </p>
            </div>

            {/* Live Search Input Box */}
            <div className="w-full md:w-80 lg:w-96 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-600" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por nombre, tipo o edad..."
                className="w-full pl-10 pr-9 py-2.5 text-xs font-semibold bg-white rounded-full border-2 border-sky-300 focus:border-sky-600 outline-hidden transition-colors text-slate-900 placeholder-sky-400 shadow-2xs"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* PROMINENT GENDER SEPARATOR (Niños / Niñas / Todos) */}
          <div className="mt-6 pt-5 border-t border-sky-200/80">
            <p className="text-xs font-black text-sky-900 mb-2 uppercase tracking-wide">
              ¿Para quién es el juguete?
            </p>
            <div className="grid grid-cols-3 gap-2.5 sm:gap-4 max-w-xl">
              
              {/* Boys Button */}
              <button
                onClick={() => setSelectedGender('niños')}
                className={`py-3 px-3 sm:px-5 rounded-full font-black text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer border-2 ${
                  selectedGender === 'niños'
                    ? 'bg-sky-500 text-white border-sky-600 shadow-md scale-102'
                    : 'bg-white hover:bg-sky-50 text-sky-900 border-sky-200 shadow-2xs'
                }`}
              >
                <span className="text-base sm:text-lg">👦</span>
                <span>Para Niños</span>
              </button>

              {/* Girls Button */}
              <button
                onClick={() => setSelectedGender('niñas')}
                className={`py-3 px-3 sm:px-5 rounded-full font-black text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer border-2 ${
                  selectedGender === 'niñas'
                    ? 'bg-pink-500 text-white border-pink-600 shadow-md scale-102'
                    : 'bg-white hover:bg-pink-50 text-pink-900 border-pink-200 shadow-2xs'
                }`}
              >
                <span className="text-base sm:text-lg">👧</span>
                <span>Para Niñas</span>
              </button>

              {/* All / Unisex Button */}
              <button
                onClick={() => setSelectedGender('todos')}
                className={`py-3 px-3 sm:px-5 rounded-full font-black text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer border-2 ${
                  selectedGender === 'todos'
                    ? 'bg-amber-400 text-amber-950 border-amber-500 shadow-md scale-102'
                    : 'bg-white hover:bg-amber-50 text-amber-950 border-amber-200 shadow-2xs'
                }`}
              >
                <span className="text-base sm:text-lg">🌟</span>
                <span>Para Todos</span>
              </button>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-5 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'bg-white hover:bg-sky-200/80 text-sky-950 border border-sky-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Control Bar: Filters in rich pastel amber */}
      <main className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-amber-100/70 p-3.5 rounded-lg border-2 border-amber-300 shadow-2xs">
          
          <div className="flex items-center gap-3 flex-wrap">
            {/* Age Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-amber-950 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-amber-700" /> Edad:
              </span>
              <select
                value={selectedAge}
                onChange={(e) => setSelectedAge(e.target.value)}
                className="text-xs font-bold bg-white border border-amber-300 rounded-md px-2.5 py-1.5 text-amber-950 outline-hidden focus:border-amber-500 transition-colors cursor-pointer"
              >
                {AGE_RANGES.map((age) => (
                  <option key={age} value={age}>
                    {age}
                  </option>
                ))}
              </select>
            </div>

            {/* In stock toggle */}
            <label className="flex items-center gap-2 text-xs font-black text-amber-950 bg-white border border-amber-300 px-3 py-1.5 rounded-md cursor-pointer hover:bg-amber-50 transition-colors">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="w-3.5 h-3.5 text-amber-600 rounded-md focus:ring-amber-400"
              />
              <span>Solo en Stock</span>
            </label>

            {activeFiltersCount > 0 && (
              <button
                onClick={resetAllFilters}
                className="text-xs font-black text-rose-600 hover:text-rose-700 underline px-1 py-1"
              >
                Limpiar ({activeFiltersCount})
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 justify-between sm:justify-end">
            {/* Sorting */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-amber-950 flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5 text-amber-700" /> Ordenar:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs font-bold bg-white border border-amber-300 rounded-md px-2.5 py-1.5 text-amber-950 outline-hidden focus:border-amber-500 transition-colors cursor-pointer"
              >
                <option value="featured">Destacados</option>
                <option value="price-asc">Precio: Menor a Mayor</option>
                <option value="price-desc">Precio: Mayor a Menor</option>
                <option value="name">Nombre (A-Z)</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-white p-0.5 rounded-md border border-amber-300">
              <button
                onClick={() => setViewMode('grid')}
                title="Vista Cuadrícula"
                className={`p-1.5 rounded-sm transition-colors cursor-pointer ${
                  viewMode === 'grid' ? 'bg-amber-400 text-amber-950 font-bold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                title="Vista Lista"
                className={`p-1.5 rounded-sm transition-colors cursor-pointer ${
                  viewMode === 'list' ? 'bg-amber-400 text-amber-950 font-bold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <ListIcon className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Refresh */}
            <button
              onClick={loadData}
              title="Actualizar catálogo"
              className="p-1.5 bg-white hover:bg-amber-50 text-amber-950 rounded-md border border-amber-300 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-amber-700' : ''}`} />
            </button>
          </div>
        </div>

        {/* Results Counter */}
        <div className="mt-4 mb-5 flex items-center justify-between">
          <p className="text-xs sm:text-sm text-slate-700 font-bold">
            Mostrando <span className="text-sky-700 font-black">{filteredProducts.length}</span> juguetes encontrados
            {selectedGender !== 'todos' && (
              <span className="text-pink-600 font-black"> ({selectedGender === 'niños' ? 'Para Niños 👦' : 'Para Niñas 👧'})</span>
            )}
            {search && <span> para &ldquo;{search}&rdquo;</span>}
          </p>
        </div>

        {/* Products Display */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-slate-50 rounded-lg p-4 border border-slate-200 shadow-2xs animate-pulse">
                <div className="aspect-square bg-slate-200 rounded-md mb-3" />
                <div className="h-4 bg-slate-200 rounded w-2/3 mb-2" />
                <div className="h-3 bg-slate-100 rounded w-full mb-3" />
                <div className="h-8 bg-slate-200 rounded-full" />
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="bg-sky-50 rounded-lg p-10 text-center border-2 border-sky-200 max-w-md mx-auto my-10">
            <h3 className="text-base font-bold text-sky-950">No encontramos juguetes</h3>
            <p className="text-xs text-sky-800 mt-1 max-w-xs mx-auto">
              No hay productos con los filtros seleccionados o la búsqueda realizada.
            </p>
            <button
              onClick={resetAllFilters}
              className="mt-4 px-5 py-2 rounded-full bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              Restablecer Filtros
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* List Mode */
          <div className="flex flex-col gap-3">
            {filteredProducts.map((product) => {
              const handleWhatsAppBuy = (e: React.MouseEvent) => {
                e.stopPropagation();
                const url = generateSingleProductWhatsAppUrl(product);
                window.open(url, '_blank');
              };

              const handleAddToCart = (e: React.MouseEvent) => {
                e.stopPropagation();
                if (!product.in_stock) return;
                addToCart(product, 1);
              };

              return (
                <Link
                  key={product.id}
                  href={`/producto/${product.id}`}
                  className="bg-slate-50 hover:bg-pink-50/40 p-4 rounded-lg border-2 border-slate-200 hover:border-pink-300 shadow-2xs hover:shadow-xs transition-all flex flex-col sm:flex-row items-center gap-4 cursor-pointer group"
                >
                  <div className="w-full sm:w-36 aspect-square rounded-md overflow-hidden bg-white shrink-0 border border-slate-200">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-200"
                    />
                  </div>

                  <div className="flex-1 w-full space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-bold text-pink-900 bg-pink-200 border border-pink-300 px-2.5 py-0.5 rounded-md">
                        {product.category}
                      </span>
                      <span className="text-[11px] font-bold text-sky-900 bg-sky-200 border border-sky-300 px-2.5 py-0.5 rounded-md">
                        {product.age_range}
                      </span>
                      {product.gender && product.gender !== 'unisex' && (
                        <span className="text-[11px] font-bold text-indigo-900 bg-indigo-100 border border-indigo-200 px-2 py-0.5 rounded-md">
                          {product.gender === 'niños' ? '👦 Para Niños' : '👧 Para Niñas'}
                        </span>
                      )}
                      {!product.in_stock ? (
                        <span className="text-[10px] font-bold text-rose-600 bg-rose-100 px-2 py-0.5 rounded-md flex items-center gap-1 border border-rose-200">
                          <AlertCircle className="w-3 h-3" /> Agotado
                        </span>
                      ) : product.badge ? (
                        <span className="text-[10px] font-black text-amber-950 bg-amber-200 px-2.5 py-0.5 rounded-md border border-amber-300">
                          {product.badge}
                        </span>
                      ) : null}
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-pink-600 transition-colors">
                      {product.name}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex items-baseline gap-2 pt-1">
                      <span className="text-xl font-bold text-slate-900">
                        {currency} {product.price.toFixed(2)}
                      </span>
                      {product.original_price && product.original_price > product.price && (
                        <span className="text-xs text-slate-400 line-through">
                          {currency} {product.original_price.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="w-full sm:w-44 flex flex-col gap-2 shrink-0">
                    <button
                      onClick={handleWhatsAppBuy}
                      className="w-full py-2 px-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-white" />
                      <span>Pedir por WhatsApp</span>
                    </button>

                    <button
                      onClick={handleAddToCart}
                      disabled={!product.in_stock}
                      className={`w-full py-2 px-3 rounded-full font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                        product.in_stock
                          ? 'bg-pink-500 hover:bg-pink-600 text-white shadow-2xs'
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>{product.in_stock ? '+ Agregar al Pedido' : 'Agotado'}</span>
                    </button>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function CatalogoPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500 text-xs font-bold">Cargando catálogo...</div>}>
      <CatalogContent />
    </Suspense>
  );
}
