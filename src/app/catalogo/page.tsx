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

function CatalogContent() {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get('categoria') as Category | null;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    initialCat && CATEGORIES.includes(initialCat) ? initialCat : 'Todos'
  );
  const [selectedAge, setSelectedAge] = useState<string>('Todas las edades');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const { addToCart, setSelectedProductForModal } = useCart();
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

  // Real-time live filtering
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
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
  }, [products, search, selectedCategory, selectedAge, onlyInStock, sortBy]);

  const activeFiltersCount =
    (selectedCategory !== 'Todos' ? 1 : 0) +
    (selectedAge !== 'Todas las edades' ? 1 : 0) +
    (onlyInStock ? 1 : 0) +
    (search.trim() ? 1 : 0);

  const resetAllFilters = () => {
    setSearch('');
    setSelectedCategory('Todos');
    setSelectedAge('Todas las edades');
    setOnlyInStock(false);
    setSortBy('featured');
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-white">
      <Navbar searchTerm={search} onSearchChange={setSearch} />

      {/* Header section with lively colorful banner */}
      <div className="bg-linear-to-b from-rose-50/70 to-white border-b border-rose-100 py-8">
        <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 font-black text-xs uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Catálogo Completo</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Todos Nuestros Juguetes
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
                Encuentra el regalo perfecto por edad o categoría y haz tu pedido por WhatsApp.
              </p>
            </div>

            {/* Live Search Input Box */}
            <div className="w-full md:w-80 lg:w-96 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por nombre o edad en vivo..."
                className="w-full pl-11 pr-10 py-3 text-xs sm:text-sm font-semibold bg-white hover:bg-rose-50/30 focus:bg-white rounded-2xl border-2 border-rose-200 focus:border-rose-500 outline-hidden transition-all text-slate-900 placeholder-slate-400 shadow-sm"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills Bar with colorful states */}
          <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-2xl text-xs font-black whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-linear-to-r from-rose-500 to-amber-500 text-white shadow-md shadow-rose-200 scale-103'
                      : 'bg-white hover:bg-amber-50 text-slate-700 border-2 border-slate-200 hover:border-amber-300'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Control Bar: Filters, Sort and View Mode */}
      <main className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-amber-50/50 p-4 rounded-3xl border-2 border-amber-200/80 shadow-xs">
          
          <div className="flex items-center gap-3 flex-wrap">
            {/* Age Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                <Filter className="w-4 h-4 text-amber-600" /> Edad:
              </span>
              <select
                value={selectedAge}
                onChange={(e) => setSelectedAge(e.target.value)}
                className="text-xs font-bold bg-white border-2 border-amber-200 rounded-xl px-3 py-2 text-slate-800 outline-hidden focus:border-rose-400 transition-colors cursor-pointer shadow-2xs"
              >
                {AGE_RANGES.map((age) => (
                  <option key={age} value={age}>
                    {age}
                  </option>
                ))}
              </select>
            </div>

            {/* In stock toggle */}
            <label className="flex items-center gap-2 text-xs font-black text-slate-700 bg-white border-2 border-amber-200 px-3 py-2 rounded-xl cursor-pointer hover:bg-amber-50 transition-colors shadow-2xs">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="w-4 h-4 text-rose-600 rounded-md focus:ring-rose-400"
              />
              <span>Solo en Stock</span>
            </label>

            {activeFiltersCount > 0 && (
              <button
                onClick={resetAllFilters}
                className="text-xs font-black text-rose-600 hover:text-rose-700 underline px-2 py-1"
              >
                Limpiar filtros ({activeFiltersCount})
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 justify-between sm:justify-end">
            {/* Sorting */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                <SlidersHorizontal className="w-4 h-4 text-indigo-600" /> Ordenar:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs font-bold bg-white border-2 border-indigo-200 rounded-xl px-3 py-2 text-slate-800 outline-hidden focus:border-rose-400 transition-colors cursor-pointer shadow-2xs"
              >
                <option value="featured">Destacados</option>
                <option value="price-asc">Precio: Menor a Mayor</option>
                <option value="price-desc">Precio: Mayor a Menor</option>
                <option value="name">Nombre (A-Z)</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-white p-1 rounded-2xl border-2 border-slate-200">
              <button
                onClick={() => setViewMode('grid')}
                title="Vista Cuadrícula"
                className={`p-1.5 rounded-xl transition-colors cursor-pointer ${
                  viewMode === 'grid' ? 'bg-rose-500 text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                title="Vista Lista"
                className={`p-1.5 rounded-xl transition-colors cursor-pointer ${
                  viewMode === 'list' ? 'bg-rose-500 text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <ListIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Refresh */}
            <button
              onClick={loadData}
              title="Actualizar catálogo"
              className="p-2 bg-white hover:bg-slate-50 text-slate-700 rounded-2xl border-2 border-slate-200 transition-colors cursor-pointer shadow-2xs"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-rose-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Results Counter */}
        <div className="mt-4 mb-6 flex items-center justify-between">
          <p className="text-xs sm:text-sm font-bold text-slate-700">
            Mostrando <span className="text-rose-600 font-black">{filteredProducts.length}</span> juguetes encontrados
            {search && <span> para &ldquo;{search}&rdquo;</span>}
          </p>
        </div>

        {/* Products Display */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl p-4 border-2 border-rose-100 shadow-sm animate-pulse">
                <div className="aspect-square bg-rose-100/50 rounded-2xl mb-4" />
                <div className="h-4 bg-rose-100 rounded-full w-2/3 mb-2" />
                <div className="h-3 bg-rose-50 rounded-full w-full mb-4" />
                <div className="h-8 bg-rose-100 rounded-xl" />
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="bg-amber-50/60 rounded-3xl p-12 text-center border-2 border-amber-200 max-w-lg mx-auto my-12 shadow-sm">
            <div className="text-5xl mb-3">🧸</div>
            <h3 className="text-xl font-black text-slate-900">No encontramos juguetes</h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-sm mx-auto font-medium">
              No hay productos con los filtros seleccionados o la búsqueda realizada.
            </p>
            <button
              onClick={resetAllFilters}
              className="mt-6 px-6 py-3 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-black transition-all shadow-md shadow-rose-200 cursor-pointer"
            >
              Restablecer Filtros
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* List Mode */
          <div className="flex flex-col gap-4">
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
                <div
                  key={product.id}
                  onClick={() => setSelectedProductForModal(product)}
                  className="bg-white p-4 sm:p-5 rounded-3xl border-2 border-slate-100 hover:border-rose-200 shadow-sm hover:shadow-lg transition-all flex flex-col sm:flex-row items-center gap-5 cursor-pointer group"
                >
                  <div className="w-full sm:w-40 aspect-square rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="flex-1 w-full space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-extrabold text-rose-700 bg-rose-100/80 border border-rose-200 px-2.5 py-0.5 rounded-lg">
                        {product.category}
                      </span>
                      <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-lg">
                        {product.age_range}
                      </span>
                      {!product.in_stock ? (
                        <span className="text-[10px] font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> Agotado
                        </span>
                      ) : product.badge ? (
                        <span className="text-[10px] font-black text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-md border border-amber-200">
                          {product.badge}
                        </span>
                      ) : null}
                    </div>

                    <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-rose-600 transition-colors">
                      {product.name}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-2 font-medium">
                      {product.description}
                    </p>

                    <div className="flex items-baseline gap-2 pt-1">
                      <span className="text-2xl font-black text-slate-900">
                        {currency} {product.price.toFixed(2)}
                      </span>
                      {product.original_price && product.original_price > product.price && (
                        <span className="text-xs text-slate-400 line-through font-semibold">
                          {currency} {product.original_price.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="w-full sm:w-48 flex flex-col gap-2 shrink-0">
                    <button
                      onClick={handleWhatsAppBuy}
                      className="w-full py-2.5 px-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs shadow-md shadow-emerald-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 fill-white" />
                      <span>Pedir por WhatsApp</span>
                    </button>

                    <button
                      onClick={handleAddToCart}
                      disabled={!product.in_stock}
                      className={`w-full py-2.5 px-3 rounded-2xl font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        product.in_stock
                          ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-2 border-rose-300 shadow-2xs'
                          : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>{product.in_stock ? '+ Agregar al Carrito' : 'Agotado'}</span>
                    </button>
                  </div>
                </div>
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
