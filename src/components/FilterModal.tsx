import React from 'react';
import { X, Check } from 'lucide-react';
import { ProductCategory, ProductStatus, CategoryItem } from '../types';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: CategoryItem[];
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  statusFilter: 'all' | 'available' | 'archive';
  onStatusFilterChange: (status: 'all' | 'available' | 'archive') => void;
  maxPrice: number;
  onMaxPriceChange: (price: number) => void;
  onResetFilters: () => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  categories,
  selectedCategory,
  onSelectCategory,
  statusFilter,
  onStatusFilterChange,
  maxPrice,
  onMaxPriceChange,
  onResetFilters,
}) => {
  if (!isOpen) return null;

  const categoryOptions: { id: ProductCategory; label: string }[] = [
    { id: 'all', label: 'All Silhouettes' },
    ...categories.map((c) => ({ id: c.slug, label: c.name })),
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[#1c1c18]/70 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-[#fdf9f3] p-6 shadow-2xl border border-[#3b2219]/20 font-sans max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#3b2219]/10 mb-4">
          <h3 className="font-serif text-[20px] text-[#1c1c18] font-normal">
            Refine Atelier Catalogue
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-[#554243] hover:text-[#1c1c18] border-none bg-transparent cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category selection */}
        <div className="mb-5">
          <label className="block text-[11px] uppercase tracking-wider text-[#554243] mb-2 font-semibold">
            Category
          </label>
          <div className="grid grid-cols-1 gap-1.5">
            {categoryOptions.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`py-2 px-3 text-[13px] text-left flex items-center justify-between transition-colors border cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'border-[#4b0013] bg-[#f1ede7] text-[#4b0013] font-semibold'
                    : 'border-[#3b2219]/10 bg-white text-[#1c1c18] hover:bg-[#f7f3ed]'
                }`}
              >
                <span>{cat.label}</span>
                {selectedCategory === cat.id && <Check className="w-4 h-4 text-[#4b0013]" />}
              </button>
            ))}
          </div>
        </div>

        {/* Availability status */}
        <div className="mb-5">
          <label className="block text-[11px] uppercase tracking-wider text-[#554243] mb-2 font-semibold">
            Availability Status
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'all', label: 'All Status' },
              { id: 'available', label: 'Available' },
              { id: 'archive', label: 'Archive / Sold' },
            ].map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => onStatusFilterChange(s.id as any)}
                className={`py-2 px-2 text-[11px] uppercase tracking-wider text-center border cursor-pointer ${
                  statusFilter === s.id
                    ? 'border-[#4b0013] bg-[#4b0013] text-white font-semibold'
                    : 'border-[#3b2219]/10 bg-white text-[#1c1c18] hover:bg-[#f1ede7]'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <div className="flex justify-between items-baseline mb-1">
            <label className="text-[11px] uppercase tracking-wider text-[#554243] font-semibold">
              Maximum Atelier Value
            </label>
            <span className="text-[13px] text-[#4b0013] font-bold">
              ₹{maxPrice.toLocaleString('en-IN')}
            </span>
          </div>
          <input
            type="range"
            min={15000}
            max={200000}
            step={5000}
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(Number(e.target.value))}
            className="w-full accent-[#4b0013] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-[#554243] mt-1">
            <span>₹15,000</span>
            <span>₹2,00,000+</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2 border-t border-[#3b2219]/10">
          <button
            type="button"
            onClick={onResetFilters}
            className="py-2.5 px-4 bg-[#f1ede7] text-[#554243] text-[11px] uppercase tracking-wider font-semibold hover:bg-[#e6e2dc] border-none cursor-pointer"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 bg-[#4b0013] text-white text-[11px] uppercase tracking-widest font-semibold hover:bg-[#6b1426] border-none cursor-pointer"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};
