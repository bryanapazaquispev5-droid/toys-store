'use client';

import React, { useEffect, useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { ProductCard } from '@/components/ProductCard';
import { Footer } from '@/components/Footer';
import { CustomSelect } from '@/components/CustomSelect';
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
  Shapes,
  X
} from 'lucide-react';
import Link from 'next/link';

type GenderFilter = 'todos' | 'niños' | 'niñas';

const CATEGORY_OPTIONS = [
  { value: 'Todos', label: 'Todos los tipos', icon: '🎁' },
  { value: 'Peluches', label: 'Peluches', icon: '🧸' },
  { value: 'Didácticos', label: 'Didácticos', icon: '🧩' },
  { value: 'Figuras de Acción', label: 'Figuras de Acción', icon: '🦸' },
  { value: 'Juegos de Mesa', label: 'Juegos de Mesa', icon: '🎲' },
  { value: 'Vehículos y Pistas', label: 'Vehículos y Pistas', icon: '🚗' },
  { value: 'Bebés', label: 'Bebés', icon: '👶' },
];

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

        return true;
      })
      .sort((a, b) => {
        // 1. In-stock products always appear first, out-of-stock pushed to the very bottom
        if (a.in_stock !== b.in_stock) {
          return a.in_stock ? -1 : 1;
        }

        // 2. Secondary sort criteria chosen by user
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
  }, [products, search, selectedGender, selectedCategory, selectedAge, sortBy]);

  const activeFiltersCount =
    (selectedGender !== 'todos' ? 1 : 0) +
    (selectedCategory !== 'Todos' ? 1 : 0) +
    (selectedAge !== 'Todas las edades' ? 1 : 0) +
    (search.trim() ? 1 : 0);

  const resetAllFilters = () => {
    setSearch('');
    setSelectedGender('todos');
    setSelectedCategory('Todos');
    setSelectedAge('Todas las edades');
    setSortBy('featured');
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-white">
      <Navbar />

      {/* Header section in rich pastel sky */}
      <div className="bg-sky-100/90 border-b border-sky-200 py-8 2xl:py-10">
        <div className="w-full max-w-[2200px] 3xl:max-w-[2500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-200 text-sky-950 font-black text-xs mb-2 border border-sky-300">
              <Sparkles className="w-3.5 h-3.5 text-sky-700" />
              <span>Catálogo Completo</span>
            </div>
            <h1 className="text-2xl sm:text-3xl 2xl:text-4xl font-black text-sky-950 tracking-tight">
              Catálogo de Juguetes
            </h1>
            <p className="text-xs sm:text-sm 2xl:text-base text-sky-800 mt-1 font-medium">
              Elige juguetes para niños, niñas o para todos, filtra por tipo y edad, y pide directo a WhatsApp.
            </p>
          </div>

          {/* PROMINENT GENDER SEPARATOR (Niños / Niñas / Todos) */}
          <div className="mt-6 pt-5 border-t border-sky-200/80">
            <p className="text-xs font-black text-sky-900 mb-2 uppercase tracking-wide">
              ¿Para quién es el juguete?
            </p>
            <div className="grid grid-cols-3 gap-2.5 sm:gap-4 max-w-2xl lg:max-w-3xl xl:max-w-4xl">
              
              {/* Boys Button */}
              <button
                onClick={() => setSelectedGender('niños')}
                className={`py-3 sm:py-3.5 px-3 sm:px-6 rounded-full font-black text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer border-2 ${
                  selectedGender === 'niños'
                    ? 'bg-sky-500 text-white border-sky-600 shadow-md scale-102'
                    : 'bg-white hover:bg-sky-50 text-sky-900 border-sky-200 shadow-2xs'
                }`}
              >
                <span className="text-base sm:text-xl">👦</span>
                <span>Para Niños</span>
              </button>

              {/* Girls Button */}
              <button
                onClick={() => setSelectedGender('niñas')}
                className={`py-3 sm:py-3.5 px-3 sm:px-6 rounded-full font-black text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer border-2 ${
                  selectedGender === 'niñas'
                    ? 'bg-pink-500 text-white border-pink-600 shadow-md scale-102'
                    : 'bg-white hover:bg-pink-50 text-pink-900 border-pink-200 shadow-2xs'
                }`}
              >
                <span className="text-base sm:text-xl">👧</span>
                <span>Para Niñas</span>
              </button>

              {/* All / Unisex Button */}
              <button
                onClick={() => setSelectedGender('todos')}
                className={`py-3 sm:py-3.5 px-3 sm:px-6 rounded-full font-black text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer border-2 ${
                  selectedGender === 'todos'
                    ? 'bg-amber-400 text-amber-950 border-amber-500 shadow-md scale-102'
                    : 'bg-white hover:bg-amber-50 text-amber-950 border-amber-200 shadow-2xs'
                }`}
              >
                <span className="text-base sm:text-xl">🌟</span>
                <span>Para Todos</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Catalog View */}
      <main className="w-full max-w-[2200px] 3xl:max-w-[2500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16 py-6 sm:py-8 w-full flex-1">
        
        {/* PROMINENT REAL-TIME SEARCH BAR - Directly above the filter controls */}
        <div className="mb-4 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sky-600 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre, tipo o edad en tiempo real..."
            className="w-full pl-12 pr-12 py-3.5 sm:py-4 text-xs sm:text-sm font-bold bg-white rounded-2xl border-2 border-sky-300 focus:border-sky-500 outline-hidden transition-all text-slate-900 placeholder-sky-400 shadow-2xs focus:shadow-md"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-sky-100 hover:bg-sky-200 text-sky-800 transition-colors cursor-pointer"
              title="Borrar búsqueda"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* UNIFIED SINGLE CONTROL BAR: All filters cleanly organized in one place */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-amber-100/70 p-3.5 rounded-2xl border-2 border-amber-300 shadow-2xs">
          
          <div className="flex items-center gap-3 flex-wrap">
            {/* 1. Tipo / Categoría de Juguete (First on the left) */}
            <CustomSelect
              variant="amber"
              icon={<Shapes className="w-3.5 h-3.5" />}
              labelPrefix="Tipo:"
              value={selectedCategory}
              onChange={(val) => setSelectedCategory(val as Category)}
              options={CATEGORY_OPTIONS}
            />

            {/* 2. Edad (Second) */}
            <CustomSelect
              variant="amber"
              icon={<Filter className="w-3.5 h-3.5" />}
              labelPrefix="Edad:"
              value={selectedAge}
              onChange={setSelectedAge}
              options={AGE_RANGES}
            />

            {activeFiltersCount > 0 && (
              <button
                onClick={resetAllFilters}
                className="text-xs font-black text-rose-600 hover:text-rose-700 underline px-2 py-1 cursor-pointer"
              >
                Limpiar ({activeFiltersCount})
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 justify-between sm:justify-end">
            {/* 3. Ordenar */}
            <CustomSelect
              variant="amber"
              icon={<SlidersHorizontal className="w-3.5 h-3.5" />}
              labelPrefix="Ordenar:"
              value={sortBy}
              onChange={(val) => setSortBy(val as any)}
              options={[
                { value: 'featured', label: 'Destacados', icon: '⭐' },
                { value: 'price-asc', label: 'Precio: Menor a Mayor', icon: '💵' },
                { value: 'price-desc', label: 'Precio: Mayor a Menor', icon: '💎' },
                { value: 'name', label: 'Nombre (A-Z)', icon: '🔤' },
              ]}
            />

            {/* View Mode Toggle */}
            <div className="flex items-center bg-white p-0.5 rounded-full border-2 border-amber-300">
              <button
                onClick={() => setViewMode('grid')}
                title="Vista Cuadrícula"
                className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                  viewMode === 'grid' ? 'bg-amber-400 text-amber-950 font-bold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                title="Vista Lista"
                className={`p-1.5 rounded-full transition-colors cursor-pointer ${
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
              className="p-1.5 bg-white hover:bg-amber-50 text-amber-950 rounded-full border-2 border-amber-300 transition-colors cursor-pointer"
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
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 min-[2100px]:grid-cols-7 min-[2500px]:grid-cols-8 gap-4 sm:gap-5 lg:gap-6">
            {[...Array(12)].map((_, i) => (
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
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 min-[2100px]:grid-cols-7 min-[2500px]:grid-cols-8 gap-4 sm:gap-5 lg:gap-6">
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
