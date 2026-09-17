import React from 'react';
import { CategoryItem } from '../types';

interface CategoriesCarouselProps {
  categories: CategoryItem[];
  selectedCategory: string;
  onSelectCategory: (slug: string) => void;
  onViewAllClick: () => void;
}

export const CategoriesCarousel: React.FC<CategoriesCarouselProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  onViewAllClick,
}) => {
  return (
    <section className="py-4 bg-[#fdf9f3]">
      {/* Header */}
      <div className="px-5 flex items-baseline justify-between mb-3">
        <div>
          <span className="text-[10px] text-[#77574c] uppercase tracking-widest font-semibold font-sans block">
            Aesthetic Archives
          </span>
          <h3 className="font-serif text-[24px] text-[#1c1c18] font-normal">
            Categories
          </h3>
        </div>
        <button
          onClick={onViewAllClick}
          className="text-[11px] text-[#4b0013] uppercase tracking-wider font-semibold hover:underline cursor-pointer bg-transparent border-none p-0"
        >
          View All
        </button>
      </div>

      {/* Horizontal Category Scroll */}
      <div className="flex overflow-x-auto gap-3 px-5 pb-3 no-scrollbar scroll-smooth">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.slug;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className="flex-shrink-0 w-28 flex flex-col items-center group cursor-pointer text-left bg-transparent border-none p-0 focus:outline-none"
            >
              <div
                className={`w-28 h-36 bg-[#f1ede7] overflow-hidden relative shadow-sm border transition-all ${
                  isSelected
                    ? 'border-[#4b0013] ring-1 ring-[#4b0013]'
                    : 'border-[#3b2219]/10 group-hover:border-[#bf9b54]'
                }`}
              >
                <img
                  src={cat.image}
                  alt={cat.altText}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                {isSelected && (
                  <div className="absolute inset-0 bg-[#4b0013]/20 flex items-end justify-center pb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ffdea5]" />
                  </div>
                )}
              </div>
              <span
                className={`text-[11px] uppercase tracking-wider mt-2 font-medium transition-colors ${
                  isSelected ? 'text-[#4b0013] font-bold' : 'text-[#1c1c18] group-hover:text-[#4b0013]'
                }`}
              >
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
