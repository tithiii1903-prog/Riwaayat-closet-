import React from 'react';
import { ProductCategory, CategoryItem } from '../types';

interface FilterChipsBarProps {
  categories: CategoryItem[];
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  count: number;
}

export const FilterChipsBar: React.FC<FilterChipsBarProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  count,
}) => {
  const chips: { id: ProductCategory; label: string }[] = [
    { id: 'all', label: 'All Pieces' },
    ...categories.map((c) => ({ id: c.slug, label: c.name })),
  ];

  return (
    <section className="pt-4 px-5 bg-[#fdf9f3]" id="catalogue-section">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-serif text-[20px] text-[#1c1c18] font-normal">
          Recent Curations
        </h3>
        <span className="text-[10px] text-[#554243] uppercase tracking-wider font-semibold font-sans">
          {count} {count === 1 ? 'Artwork' : 'Artworks'} Displayed
        </span>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {chips.map((chip) => {
          const isSelected = selectedCategory === chip.id;
          return (
            <button
              key={chip.id}
              onClick={() => onSelectCategory(chip.id)}
              className={`filter-chip px-3.5 py-1.5 text-[11px] uppercase tracking-wider font-medium flex-shrink-0 cursor-pointer transition-all border-none ${
                isSelected
                  ? 'bg-[#1c1c18] text-white shadow-sm'
                  : 'bg-[#f1ede7] text-[#554243] hover:bg-[#e6e2dc]'
              }`}
            >
              {chip.label}
            </button>
          );
        })}
      </div>
    </section>
  );
};
