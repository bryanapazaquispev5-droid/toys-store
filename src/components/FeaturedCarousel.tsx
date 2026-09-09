'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Product } from '@/types/toy';
import { ProductCard } from '@/components/ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FeaturedCarouselProps {
  products: Product[];
  loading?: boolean;
}

export function FeaturedCarousel({ products, loading = false }: FeaturedCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef<number | null>(null);

  // Group products into pairs of 2 for mobile slides
  const productPairs = useMemo(() => {
    const pairs: Product[][] = [];
    for (let i = 0; i < products.length; i += 2) {
      pairs.push(products.slice(i, i + 2));
    }
    return pairs;
  }, [products]);

  const totalSlides = productPairs.length;

  // Auto-play interval: advances every 2.5 seconds when not paused
  useEffect(() => {
    if (totalSlides <= 1 || isPaused || loading) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 2500);

    return () => clearInterval(interval);
  }, [totalSlides, isPaused, loading]);

  const nextSlide = () => {
    if (totalSlides <= 1) return;
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    if (totalSlides <= 1) return;
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Touch handlers for mobile swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;

    if (diff > 40) {
      // Swiped left -> next
      nextSlide();
    } else if (diff < -40) {
      // Swiped right -> prev
      prevSlide();
    }

    touchStartXRef.current = null;
    setTimeout(() => setIsPaused(false), 2000);
  };

  if (loading) {
    return (
      <>
        {/* Mobile Loading Skeleton (2 cards) */}
        <div className="md:hidden grid grid-cols-2 gap-3">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="bg-pink-100/60 rounded-xl p-3 border border-pink-200 animate-pulse">
              <div className="aspect-square bg-pink-200/70 rounded-lg mb-2" />
              <div className="h-3.5 bg-pink-200 rounded w-3/4 mb-1.5" />
              <div className="h-3 bg-pink-200 rounded w-1/2 mb-2" />
              <div className="h-7 bg-pink-200 rounded-full" />
            </div>
          ))}
        </div>

        {/* Desktop Loading Skeleton */}
        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-pink-100/60 rounded-lg p-4 border border-pink-200 shadow-2xs animate-pulse">
              <div className="aspect-square bg-pink-200/70 rounded-md mb-3" />
              <div className="h-4 bg-pink-200 rounded w-2/3 mb-2" />
              <div className="h-3 bg-pink-200 rounded w-full mb-3" />
              <div className="h-8 bg-pink-200 rounded-full" />
            </div>
          ))}
        </div>
      </>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div>
      {/* MOBILE ONLY: 2-Product Auto-Playing Carousel (< md) */}
      <div
        className="md:hidden relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="overflow-hidden rounded-2xl">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {productPairs.map((pair, slideIdx) => (
              <div
                key={slideIdx}
                className="w-full shrink-0 grid grid-cols-2 gap-2.5 px-0.5"
              >
                {pair.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
                {/* Placeholder if pair has only 1 product */}
                {pair.length === 1 && (
                  <div className="opacity-0 pointer-events-none" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Navigation Controls on Mobile */}
        {totalSlides > 1 && (
          <div className="flex items-center justify-between mt-4 px-1">
            {/* Prev Button */}
            <button
              onClick={prevSlide}
              aria-label="Anterior"
              className="p-1.5 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-xs border border-pink-200 transition-all cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Pagination Dots with Active Indicator */}
            <div className="flex items-center gap-1.5">
              {productPairs.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Ir a página ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentSlide === idx
                      ? 'w-6 bg-pink-600'
                      : 'w-2 bg-pink-200 hover:bg-pink-300'
                  }`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              aria-label="Siguiente"
              className="p-1.5 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-xs border border-pink-200 transition-all cursor-pointer active:scale-95"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* DESKTOP ONLY: Full Grid (>= md) */}
      <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
