'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface CustomSelectProps {
  options: (SelectOption | string)[];
  value: string;
  onChange: (val: string) => void;
  labelPrefix?: string;
  icon?: React.ReactNode;
  variant?: 'amber' | 'sky' | 'pink' | 'emerald';
  className?: string;
  buttonClassName?: string;
}

export function CustomSelect({
  options,
  value,
  onChange,
  labelPrefix,
  icon,
  variant = 'amber',
  className = '',
  buttonClassName = '',
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Normalize options
  const normalizedOptions: SelectOption[] = options.map((opt) =>
    typeof opt === 'string' ? { value: opt, label: opt } : opt
  );

  const selectedOption = normalizedOptions.find((opt) => opt.value === value) || normalizedOptions[0];

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Theme variant styles
  const variantStyles = {
    amber: {
      button: 'bg-white border-2 border-amber-300 hover:border-amber-400 text-amber-950 focus:border-amber-500',
      icon: 'text-amber-700',
      chevron: 'text-amber-700',
      menu: 'bg-white border-2 border-amber-300 shadow-xl',
      activeItem: 'bg-amber-100 font-black text-amber-950',
      hoverItem: 'hover:bg-amber-50 text-slate-800',
      checkIcon: 'text-amber-800',
    },
    sky: {
      button: 'bg-white border-2 border-sky-300 hover:border-sky-400 text-sky-950 focus:border-sky-500',
      icon: 'text-sky-700',
      chevron: 'text-sky-700',
      menu: 'bg-white border-2 border-sky-300 shadow-xl',
      activeItem: 'bg-sky-100 font-black text-sky-950',
      hoverItem: 'hover:bg-sky-50 text-slate-800',
      checkIcon: 'text-sky-800',
    },
    pink: {
      button: 'bg-white border-2 border-pink-300 hover:border-pink-400 text-pink-950 focus:border-pink-500',
      icon: 'text-pink-700',
      chevron: 'text-pink-700',
      menu: 'bg-white border-2 border-pink-300 shadow-xl',
      activeItem: 'bg-pink-100 font-black text-pink-950',
      hoverItem: 'hover:bg-pink-50 text-slate-800',
      checkIcon: 'text-pink-800',
    },
    emerald: {
      button: 'bg-white border-2 border-emerald-300 hover:border-emerald-400 text-emerald-950 focus:border-emerald-500',
      icon: 'text-emerald-700',
      chevron: 'text-emerald-700',
      menu: 'bg-white border-2 border-emerald-300 shadow-xl',
      activeItem: 'bg-emerald-100 font-black text-emerald-950',
      hoverItem: 'hover:bg-emerald-50 text-slate-800',
      checkIcon: 'text-emerald-800',
    },
  }[variant];

  return (
    <div ref={containerRef} className={`relative inline-block text-left ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer shadow-2xs ${variantStyles.button} ${buttonClassName}`}
      >
        <span className="flex items-center gap-1.5">
          {icon && <span className={variantStyles.icon}>{icon}</span>}
          {labelPrefix && <span className="text-slate-500 font-semibold">{labelPrefix}</span>}
          {selectedOption?.icon && <span>{selectedOption.icon}</span>}
          <span className="truncate">{selectedOption?.label || value}</span>
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ${variantStyles.chevron} ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div
          className={`absolute left-0 mt-1.5 w-auto min-w-[200px] max-h-60 overflow-y-auto rounded-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150 scrollbar-thin ${variantStyles.menu}`}
        >
          {normalizedOptions.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between gap-3 px-3 py-2 text-xs rounded-xl transition-colors text-left cursor-pointer ${
                  isSelected ? variantStyles.activeItem : variantStyles.hoverItem
                }`}
              >
                <span className="flex items-center gap-2 truncate">
                  {option.icon && <span>{option.icon}</span>}
                  <span>{option.label}</span>
                </span>
                {isSelected && <Check className={`w-3.5 h-3.5 shrink-0 ${variantStyles.checkIcon}`} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
