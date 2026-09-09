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
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50/60">
      <Navbar searchTerm={search} onSearchChange={setSearch} />

      {/* Header section */}
      <div className="bg-white border-b border-slate-200 py-6">
        <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Catálogo de Productos
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Filtra por categoría o rango de edad y realiza tus pedidos directo por WhatsApp.
              </p>
            </div>

            {/* Live Search Input Box */}
            <div className="w-full md:w-80 lg:w-96 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por nombre, categoría o edad..."
                className="w-full pl-10 pr-9 py-2.5 text-xs font-medium bg-slate-100 hover:bg-slate-50 focus:bg-white rounded-xl border border-slate-200 focus:border-rose-500 outline-hidden transition-colors text-slate-900 placeholder-slate-400"
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

          {/* Category Filter Pills Bar */}
          <div className="mt-5 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
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
      <main className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
          
          <div className="flex items-center gap-3 flex-wrap">
            {/* Age Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-slate-400" /> Edad:
              </span>
              <select
                value={selectedAge}
                onChange={(e) => setSelectedAge(e.target.value)}
                className="text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 outline-hidden focus:border-rose-500 transition-colors cursor-pointer"
              >
                {AGE_RANGES.map((age) => (
                  <option key={age} value={age}>
                    {age}
                  </option>
                ))}
              </select>
            </div>

            {/* In stock toggle */}
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="w-3.5 h-3.5 text-rose-600 rounded-md focus:ring-rose-400"
              />
              <span>Solo en Stock</span>
            </label>

            {activeFiltersCount > 0 && (
              <button
                onClick={resetAllFilters}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 underline px-1 py-1"
              >
                Limpiar ({activeFiltersCount})
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 justify-between sm:justify-end">
            {/* Sorting */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" /> Ordenar:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 outline-hidden focus:border-rose-500 transition-colors cursor-pointer"
              >
                <option value="featured">Destacados</option>
                <option value="price-asc">Precio: Menor a Mayor</option>
                <option value="price-desc">Precio: Mayor a Menor</option>
                <option value="name">Nombre (A-Z)</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <button
                onClick={() => setViewMode('grid')}
                title="Vista Cuadrícula"
                className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                  viewMode === 'grid' ? 'bg-white text-rose-600 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                title="Vista Lista"
                className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                  viewMode === 'list' ? 'bg-white text-rose-600 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <ListIcon className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Refresh */}
            <button
              onClick={loadData}
              title="Actualizar catálogo"
              className="p-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-lg border border-slate-200 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-rose-600' : ''}`} />
            </button>
          </div>
        </div>

        {/* Results Counter */}
        <div className="mt-4 mb-5 flex items-center justify-between">
          <p className="text-xs sm:text-sm text-slate-600">
            Mostrando <span className="text-slate-900 font-bold">{filteredProducts.length}</span> productos
            {search && <span> para &ldquo;{search}&rdquo;</span>}
          </p>
        </div>

        {/* Products Display */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs animate-pulse">
                <div className="aspect-square bg-slate-200 rounded-xl mb-4" />
                <div className="h-4 bg-slate-200 rounded-md w-2/3 mb-2" />
                <div className="h-3 bg-slate-100 rounded-md w-full mb-4" />
                <div className="h-8 bg-slate-200 rounded-lg" />
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 max-w-md mx-auto my-10 shadow-2xs">
            <h3 className="text-base font-bold text-slate-900">No encontramos productos</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
              No hay productos con los filtros seleccionados o la búsqueda realizada.
            </p>
            <button
              onClick={resetAllFilters}
              className="mt-4 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold transition-colors cursor-pointer"
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
                <div
                  key={product.id}
                  onClick={() => setSelectedProductForModal(product)}
                  className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-slate-300 shadow-2xs hover:shadow-xs transition-all flex flex-col sm:flex-row items-center gap-4 cursor-pointer group"
                >
                  <div className="w-full sm:w-36 aspect-square rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-200"
                    />
                  </div>

                  <div className="flex-1 w-full space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                        {product.category}
                      </span>
                      <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                        {product.age_range}
                      </span>
                      {!product.in_stock ? (
                        <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> Agotado
                        </span>
                      ) : product.badge ? (
                        <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md">
                          {product.badge}
                        </span>
                      ) : null}
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                      {product.name}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-2">
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
                      className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 fill-white" />
                      <span>Pedir por WhatsApp</span>
                    </button>

                    <button
                      onClick={handleAddToCart}
                      disabled={!product.in_stock}
                      className={`w-full py-2 px-3 rounded-xl font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                        product.in_stock
                          ? 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                          : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>{product.in_stock ? 'Agregar al Pedido' : 'Agotado'}</span>
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
    <Suspense fallback={<div className="p-12 text-center text-slate-500 text-xs">Cargando catálogo...</div>}>
      <CatalogContent />
    </Suspense>
  );
}
