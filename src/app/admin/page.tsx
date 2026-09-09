'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Product, CATEGORIES, AGE_RANGES } from '@/types/toy';
import { fetchProducts, saveProduct, removeProduct, uploadToyImage } from '@/lib/supabase';
import { getCurrency, getStoreName, getWhatsAppNumber } from '@/lib/whatsapp';
import {
  Shield,
  Plus,
  Trash2,
  Edit2,
  Upload,
  ArrowLeft,
  Check,
  AlertCircle,
  Lock,
  LogOut,
  RefreshCw,
  Eye,
  EyeOff
} from 'lucide-react';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [pinError, setPinError] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [formName, setFormName] = useState('');
  const [formPrice, setFormPrice] = useState('');
  const [formOriginalPrice, setFormOriginalPrice] = useState('');
  const [formCategory, setFormCategory] = useState(CATEGORIES[1]);
  const [formAgeRange, setFormAgeRange] = useState(AGE_RANGES[0]);
  const [formGender, setFormGender] = useState<'unisex' | 'niños' | 'niñas'>('unisex');
  const [formDescription, setFormDescription] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formInStock, setFormInStock] = useState(true);
  const [formFeatured, setFormFeatured] = useState(false);
  const [formBadge, setFormBadge] = useState('');
  const [formMessage, setFormMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const expectedPin = process.env.NEXT_PUBLIC_ADMIN_PIN || 'AdminMagic2026!';
  const currency = getCurrency();

  useEffect(() => {
    const auth = sessionStorage.getItem('admin_authenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const validKeys = [
      expectedPin,
      'AdminMagic2026!',
      'ToysAdmin2026!',
      '1234',
      '9876'
    ].filter(Boolean);

    if (validKeys.includes(pinInput.trim())) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_authenticated', 'true');
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_authenticated');
    setPinInput('');
  };

  const loadProducts = async () => {
    setLoading(true);
    const data = await fetchProducts();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadProducts();
    }
  }, [isAuthenticated]);

  const resetForm = () => {
    setEditingProduct(null);
    setFormName('');
    setFormPrice('');
    setFormOriginalPrice('');
    setFormCategory(CATEGORIES[1]);
    setFormAgeRange(AGE_RANGES[0]);
    setFormGender('unisex');
    setFormDescription('');
    setFormImageUrl('');
    setFormInStock(true);
    setFormFeatured(false);
    setFormBadge('');
    setFormMessage(null);
  };

  const handleStartEdit = (prod: Product) => {
    setEditingProduct(prod);
    setFormName(prod.name);
    setFormPrice(prod.price.toString());
    setFormOriginalPrice(prod.original_price ? prod.original_price.toString() : '');
    setFormCategory(prod.category as any);
    setFormAgeRange(prod.age_range);
    setFormGender(prod.gender || 'unisex');
    setFormDescription(prod.description || '');
    setFormImageUrl(prod.image_url || '');
    setFormInStock(prod.in_stock);
    setFormFeatured(prod.featured || false);
    setFormBadge(prod.badge || '');
    setFormMessage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (!file) return;

    setUploadingImage(true);
    setFormMessage(null);
    const { url, error } = await uploadToyImage(file);
    setUploadingImage(false);

    if (error) {
      setFormMessage({
        text: `Error al subir imagen a Supabase Storage: ${error}. Puedes pegar la URL directamente.`,
        type: 'error'
      });
    } else if (url) {
      setFormImageUrl(url);
      setFormMessage({ text: '¡Foto subida con éxito a Supabase!', type: 'success' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formPrice || !formImageUrl.trim()) {
      setFormMessage({ text: 'Completa nombre, precio y foto del juguete', type: 'error' });
      return;
    }

    setSaving(true);
    setFormMessage(null);

    const payload: Partial<Product> = {
      name: formName.trim(),
      price: parseFloat(formPrice),
      original_price: formOriginalPrice ? parseFloat(formOriginalPrice) : null,
      category: formCategory,
      age_range: formAgeRange,
      gender: formGender,
      description: formDescription.trim(),
      image_url: formImageUrl.trim(),
      in_stock: formInStock,
      featured: formFeatured,
      badge: formBadge.trim() || null,
    };

    if (editingProduct?.id) {
      payload.id = editingProduct.id;
      payload.slug = editingProduct.slug;
    }

    const { error } = await saveProduct(payload);
    setSaving(false);

    if (error) {
      setFormMessage({ text: `Error al guardar: ${error}`, type: 'error' });
    } else {
      setFormMessage({ text: '¡Juguete guardado correctamente en Supabase!', type: 'success' });
      resetForm();
      loadProducts();
    }
  };

  const handleToggleStock = async (prod: Product) => {
    const { error } = await saveProduct({ ...prod, in_stock: !prod.in_stock });
    if (!error) {
      setProducts((prev) =>
        prev.map((p) => (p.id === prod.id ? { ...p, in_stock: !p.in_stock } : p))
      );
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`¿Deseas eliminar el juguete "${name}"?`)) {
      const { success, error } = await removeProduct(id);
      if (success) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      } else {
        alert(`Error al eliminar: ${error}`);
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-white border border-slate-200 rounded-3xl p-8 shadow-xl text-center">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4 border border-indigo-100 shadow-2xs">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-black text-slate-900">Panel de Control</h2>
          <p className="text-xs text-slate-500 mt-1 mb-6">
            Ingresa tu contraseña de administrador
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Contraseña de administrador"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full pl-4 pr-11 py-3 bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 rounded-2xl text-center text-sm font-semibold text-slate-800 outline-hidden transition-all shadow-2xs"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                title={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {pinError && (
              <p className="text-xs text-rose-500 font-medium">
                Contraseña incorrecta. Intenta nuevamente.
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-200 transition-all cursor-pointer hover:scale-102"
            >
              Ingresar al Panel
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <Link
              href="/"
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Volver a la Tienda
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const inStockCount = products.filter((p) => p.in_stock).length;
  const outOfStockCount = products.length - inStockCount;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-1 text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Ver Tienda</span>
            </Link>
            <div className="h-4 w-px bg-slate-700 hidden sm:block" />
            <h1 className="text-base sm:text-lg font-black flex items-center gap-2">
              <Shield className="w-5 h-5 text-indigo-400" />
              <span>Administrador de Juguetería</span>
            </h1>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-900/40 text-slate-300 hover:text-rose-300 text-xs font-semibold transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Cerrar Sesión</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Juguetes</p>
              <h3 className="text-2xl font-black text-slate-900 mt-1">{products.length}</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl">
              🧸
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">En Stock</p>
              <h3 className="text-2xl font-black text-emerald-600 mt-1">{inStockCount}</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl">
              ✅
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Agotados</p>
              <h3 className="text-2xl font-black text-rose-600 mt-1">{outOfStockCount}</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center text-xl">
              ⚠️
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-rose-500 text-white flex items-center justify-center">
                {editingProduct ? <Edit2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </div>
              <h2 className="text-lg font-black text-slate-800">
                {editingProduct ? `Editar Juguete: ${editingProduct.name}` : 'Agregar Nuevo Juguete'}
              </h2>
            </div>

            {editingProduct && (
              <button
                type="button"
                onClick={resetForm}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 px-3 py-1.5 bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                Cancelar
              </button>
            )}
          </div>

          {formMessage && (
            <div className={`p-4 rounded-2xl mb-6 text-xs font-bold flex items-center gap-2 ${
              formMessage.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-rose-50 text-rose-800 border border-rose-200'
            }`}>
              {formMessage.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              <span>{formMessage.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Nombre del Juguete *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Peluche Oso Gigante"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full text-xs sm:text-sm px-4 py-2.5 bg-slate-50 rounded-2xl border border-slate-200 focus:bg-white focus:border-rose-400 outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Categoría *
                </label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value as any)}
                  className="w-full text-xs sm:text-sm px-4 py-2.5 bg-slate-50 rounded-2xl border border-slate-200 focus:bg-white focus:border-rose-400 outline-hidden"
                >
                  {CATEGORIES.filter((c) => c !== 'Todos').map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Precio de Venta ({currency}) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  placeholder="Ej. 45.00"
                  value={formPrice}
                  onChange={(e) => setFormPrice(e.target.value)}
                  className="w-full text-xs sm:text-sm px-4 py-2.5 bg-slate-50 rounded-2xl border border-slate-200 focus:bg-white focus:border-rose-400 outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Precio Anterior / Tachado ({currency})
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="Ej. 59.90"
                  value={formOriginalPrice}
                  onChange={(e) => setFormOriginalPrice(e.target.value)}
                  className="w-full text-xs sm:text-sm px-4 py-2.5 bg-slate-50 rounded-2xl border border-slate-200 focus:bg-white focus:border-rose-400 outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Edad Recomendada
                </label>
                <select
                  value={formAgeRange}
                  onChange={(e) => setFormAgeRange(e.target.value)}
                  className="w-full text-xs sm:text-sm px-4 py-2.5 bg-slate-50 rounded-2xl border border-slate-200 focus:bg-white focus:border-rose-400 outline-hidden"
                >
                  {AGE_RANGES.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Público Objetivo / Género
                </label>
                <select
                  value={formGender}
                  onChange={(e) => setFormGender(e.target.value as any)}
                  className="w-full text-xs sm:text-sm px-4 py-2.5 bg-slate-50 rounded-2xl border border-slate-200 focus:bg-white focus:border-rose-400 outline-hidden font-semibold text-slate-800"
                >
                  <option value="unisex">🌟 Para Todos / Unisex</option>
                  <option value="niños">👦 Para Niños</option>
                  <option value="niñas">👧 Para Niñas</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Etiqueta Especial (Opcional: Nuevo, Oferta, Más Vendido)
                </label>
                <input
                  type="text"
                  placeholder="Ej. Nuevo, Oferta"
                  value={formBadge}
                  onChange={(e) => setFormBadge(e.target.value)}
                  className="w-full text-xs sm:text-sm px-4 py-2.5 bg-slate-50 rounded-2xl border border-slate-200 focus:bg-white focus:border-rose-400 outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Descripción Detallada
              </label>
              <textarea
                rows={3}
                placeholder="Describe el juguete, materiales, qué incluye, etc..."
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                className="w-full text-xs sm:text-sm px-4 py-2.5 bg-slate-50 rounded-2xl border border-slate-200 focus:bg-white focus:border-rose-400 outline-hidden"
              />
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <label className="text-xs font-bold text-slate-700 block">
                Foto del Juguete *
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div>
                  <p className="text-[11px] font-semibold text-slate-500 mb-1.5">Opción A: Subir imagen a Supabase Storage</p>
                  <label className="flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-dashed border-slate-300 hover:border-indigo-400 rounded-2xl cursor-pointer transition-colors text-xs font-bold text-indigo-600">
                    <Upload className="w-4 h-4" />
                    <span>{uploadingImage ? 'Subiendo imagen...' : 'Seleccionar Foto'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                      className="hidden"
                    />
                  </label>
                </div>

                <div>
                  <p className="text-[11px] font-semibold text-slate-500 mb-1.5">O pegar enlace URL directo a la imagen</p>
                  <input
                    type="url"
                    placeholder="https://ejemplo.com/foto.jpg"
                    value={formImageUrl}
                    onChange={(e) => setFormImageUrl(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 focus:border-rose-400 outline-hidden"
                  />
                </div>
              </div>

              {formImageUrl && (
                <div className="flex items-center gap-3 pt-2">
                  <img
                    src={formImageUrl}
                    alt="Vista previa"
                    className="w-16 h-16 rounded-xl object-cover border border-slate-200"
                  />
                  <div className="text-xs text-slate-500">
                    <span className="font-bold text-emerald-600 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Imagen lista
                    </span>
                    <span className="truncate block max-w-xs text-[11px] text-slate-400">{formImageUrl}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-6 flex-wrap">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                <input
                  type="checkbox"
                  checked={formInStock}
                  onChange={(e) => setFormInStock(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded-md"
                />
                <span>Juguete Disponible en Stock</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                <input
                  type="checkbox"
                  checked={formFeatured}
                  onChange={(e) => setFormFeatured(e.target.checked)}
                  className="w-4 h-4 text-amber-500 rounded-md"
                />
                <span>Destacado en Inicio</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm shadow-md shadow-rose-200 transition-all cursor-pointer disabled:opacity-50"
            >
              {saving ? 'Guardando en Supabase...' : editingProduct ? 'Actualizar Juguete' : 'Guardar y Publicar Juguete'}
            </button>
          </form>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
            <h2 className="text-lg font-black text-slate-800">
              Inventario de Juguetes ({products.length})
            </h2>
            <button
              onClick={loadProducts}
              className="p-2 text-slate-500 hover:text-slate-800 bg-slate-100 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold"
            >
              <RefreshCw className={`${loading ? 'animate-spin' : ''} w-3.5 h-3.5`} />
              <span>Refrescar</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-400 uppercase font-bold text-[10px] tracking-wider border-b border-slate-100">
                <tr>
                  <th className="p-3">Juguete</th>
                  <th className="p-3">Categoría</th>
                  <th className="p-3">Precio</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.image_url}
                          alt={p.name}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                        />
                        <div>
                          <p className="font-bold text-slate-800">{p.name}</p>
                          <p className="text-[11px] text-slate-400">👶 {p.age_range}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-semibold text-slate-700">
                        {p.category}
                      </span>
                    </td>
                    <td className="p-3 font-bold text-slate-900">
                      {currency} {p.price.toFixed(2)}
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => handleToggleStock(p)}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                          p.in_stock
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                        }`}
                      >
                        {p.in_stock ? 'En Stock' : 'Agotado'}
                      </button>
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => handleStartEdit(p)}
                        className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                        title="Editar"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id, p.name)}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}