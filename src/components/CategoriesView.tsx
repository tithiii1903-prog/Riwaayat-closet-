import React from 'react';
import { ArrowRight, Sparkles, MapPin } from 'lucide-react';
import { CategoryItem, ProductCategory } from '../types';

interface CategoriesViewProps {
  categories: CategoryItem[];
  onSelectCategory: (categorySlug: ProductCategory) => void;
}

export const CategoriesView: React.FC<CategoriesViewProps> = ({
  categories,
  onSelectCategory,
}) => {
  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto px-5 py-6">
      {/* Header */}
      <div className="mb-6 text-center">
        <div className="inline-flex items-center gap-2 mb-1">
          <span className="h-px w-6 bg-[#e9c176]" />
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#bf9b54] font-semibold font-sans">
            Ancestral Weaving Traditions
          </span>
          <span className="h-px w-6 bg-[#e9c176]" />
        </div>
        <h2 className="font-serif text-[30px] sm:text-[36px] font-normal text-[#1c1c18]">
          Aesthetic Archives
        </h2>
        <p className="text-[13px] text-[#554243] max-w-md mx-auto mt-1 font-sans">
          Explore generational techniques, royal provenance, and hand-embroidered textiles across five imperial categories.
        </p>
      </div>

      {/* Category List Cards */}
      <div className="space-y-6">
        {categories.map((cat, idx) => (
          <div
            key={cat.id}
            className="bg-white border border-[#3b2219]/10 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row group"
          >
            <div className="md:w-1/3 aspect-[4/3] md:aspect-auto relative overflow-hidden bg-[#f1ede7]">
              <img
                src={cat.image}
                alt={cat.altText}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-[#4b0013] text-white text-[10px] uppercase tracking-widest px-2.5 py-1 font-semibold font-sans">
                Archive 0{idx + 1}
              </div>
            </div>

            <div className="p-5 md:w-2/3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest text-[#bf9b54] font-semibold font-sans">
                    Imperial Wardrobe
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-[#554243] font-sans">
                    <MapPin className="w-3.5 h-3.5 text-[#4b0013]" />
                    <span>{cat.karigarOrigin}</span>
                  </div>
                </div>

                <h3 className="font-serif text-[24px] text-[#1c1c18] font-normal mt-1 mb-2">
                  {cat.name}
                </h3>

                <p className="text-[13px] text-[#554243] leading-relaxed mb-4 font-sans">
                  {cat.description}
                </p>

                <div className="p-2.5 bg-[#f7f3ed] border border-[#3b2219]/10 text-[12px] text-[#1c1c18] font-sans mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#bf9b54] flex-shrink-0" />
                  <span>
                    <strong>Signature Technique:</strong> {cat.signatureTechnique}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#3b2219]/10 flex items-center justify-between">
                <button
                  onClick={() => onSelectCategory(cat.slug)}
                  className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest font-semibold text-[#4b0013] hover:text-[#6b1426] group-hover:underline cursor-pointer border-none bg-transparent p-0"
                >
                  <span>Explore {cat.name} Curations</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
