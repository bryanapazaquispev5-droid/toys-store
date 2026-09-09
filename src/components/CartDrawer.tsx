'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { X, Trash2, Plus, Minus, MessageCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import { generateCartWhatsAppUrl, getCurrency } from '@/lib/whatsapp';

export function CartDrawer() {
  const { items, isCartOpen, closeCart, updateQuantity, removeFromCart, clearCart, totalPrice, totalItems } = useCart();
  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const currency = getCurrency();

  if (!isCartOpen) return null;

  const handleSendWhatsApp = () => {
    if (items.length === 0) return;
    const url = generateCartWhatsAppUrl(items, customerName, address, note);
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-rose-500 text-white flex items-center justify-center shadow-xs">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-800">Mi Pedido</h2>
                <p className="text-xs text-slate-500">{totalItems} {totalItems === 1 ? 'juguete' : 'juguetes'} en lista</p>
              </div>
            </div>

            <button
              onClick={closeCart}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center text-4xl mb-4">
                  🧸
                </div>
                <h3 className="text-base font-bold text-slate-800">Tu carrito está vacío</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">
                  Explora nuestro catálogo y agrega los juguetes que más te gusten.
                </p>
                <button
                  onClick={closeCart}
                  className="mt-5 px-5 py-2.5 rounded-xl bg-rose-500 text-white text-xs font-bold hover:bg-rose-600 shadow-xs transition-colors cursor-pointer"
                >
                  Ver Catálogo
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {items.map(({ product, quantity }) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-3 p-3 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                    >
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                          {product.name}
                        </h4>
                        <p className="text-xs font-semibold text-slate-900 mt-0.5">
                          {currency} {product.price.toFixed(2)}
                        </p>

                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center border border-slate-200 bg-white rounded-lg overflow-hidden shadow-2xs">
                            <button
                              onClick={() => updateQuantity(product.id, quantity - 1)}
                              className="p-1 text-slate-500 hover:text-rose-600 hover:bg-slate-100 transition-colors cursor-pointer"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-2 text-xs font-bold text-slate-700">
                              {quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(product.id, quantity + 1)}
                              className="p-1 text-slate-500 hover:text-emerald-600 hover:bg-slate-100 transition-colors cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(product.id)}
                            className="p-1 text-slate-400 hover:text-rose-600 transition-colors ml-auto cursor-pointer"
                            title="Eliminar"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Datos para tu Pedido (Opcional)
                  </h4>
                  
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 mb-1 block">
                      Tu Nombre:
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. Juan Pérez"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full text-xs px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:border-rose-400 outline-hidden transition-all text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 mb-1 block">
                      Dirección o Ciudad:
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. Av. Principal 123"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full text-xs px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:border-rose-400 outline-hidden transition-all text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 mb-1 block">
                      Nota o consulta adicional:
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. ¿Tienen empaque de regalo?"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="w-full text-xs px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:border-rose-400 outline-hidden transition-all text-slate-800"
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 space-y-3">
              <div className="flex items-center justify-between text-slate-900">
                <span className="text-sm font-semibold">Total a pagar:</span>
                <span className="text-2xl font-black text-slate-900">
                  {currency} {totalPrice.toFixed(2)}
                </span>
              </div>

              <button
                onClick={handleSendWhatsApp}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-600/25 transition-all hover:scale-101 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Enviar Pedido por WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span>Al enviar, se abrirá tu WhatsApp</span>
                <button
                  onClick={clearCart}
                  className="hover:text-rose-500 underline transition-colors cursor-pointer"
                >
                  Vaciar carrito
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}