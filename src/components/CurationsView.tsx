import React from 'react';
import { Heart, Trash2, ArrowRight, Sparkles, BookOpen, Eye } from 'lucide-react';
import { GarmentItem } from '../types';

interface CurationsViewProps {
  savedItems: GarmentItem[];
  onRemoveItem: (id: string) => void;
  onQuickView: (item: GarmentItem) => void;
  onBrowseCatalogue: () => void;
}

export const CurationsView: React.FC<CurationsViewProps> = ({
  savedItems,
  onRemoveItem,
  onQuickView,
  onBrowseCatalogue,
}) => {
  const totalValue = savedItems.reduce((acc, item) => acc + item.price, 0);

  const formattedTotal = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(totalValue);

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto px-5 py-6">
      {/* Header */}
      <div className="mb-6 text-center">
        <div className="inline-flex items-center gap-2 mb-1">
          <span className="h-px w-6 bg-[#e9c176]" />
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#bf9b54] font-semibold font-sans">
            Personal Bridal Portfolio
          </span>
          <span className="h-px w-6 bg-[#e9c176]" />
        </div>
        <h2 className="font-serif text-[30px] sm:text-[36px] font-normal text-[#1c1c18]">
          Curated Heirlooms
        </h2>
        <p className="text-[13px] text-[#554243] max-w-md mx-auto mt-1 font-sans">
          Your private selection of bespoke lehengas, sarees, and royal silhouettes for upcoming ceremonies.
        </p>
      </div>

      {savedItems.length === 0 ? (
        <div className="bg-white border border-[#3b2219]/10 p-10 text-center flex flex-col items-center justify-center my-6">
          <div className="w-16 h-16 rounded-full bg-[#f1ede7] text-[#bf9b54] flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 stroke-[1.5]" />
          </div>
          <h3 className="font-serif text-[22px] text-[#1c1c18] font-normal mb-2">
            Your Private Curations Are Empty
          </h3>
          <p className="text-[13px] text-[#554243] max-w-xs mb-6 font-sans leading-relaxed">
            Tap the heart emblem on any couture garment in our catalogue to build your bespoke bridal trousseau.
          </p>
          <button
            onClick={onBrowseCatalogue}
            className="py-3 px-6 bg-[#4b0013] text-white hover:bg-[#6b1426] text-[12px] uppercase tracking-widest font-semibold transition-all shadow-sm border-none cursor-pointer inline-flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            <span>Browse Heritage Catalogue</span>
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Portfolio Summary Card */}
          <div className="p-5 bg-[#77574c] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm border border-[#3b2219]/20">
            <div>
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-[#ffdbcf] font-semibold font-sans mb-0.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Trousseau Summary ({savedItems.length} {savedItems.length === 1 ? 'Piece' : 'Pieces'})</span>
              </div>
              <div className="text-[12px] text-[#e7bdaf] font-sans">
                Estimated Atelier Valuation: <strong className="text-white text-[16px]">{formattedTotal}</strong>
              </div>
            </div>

            <button
              onClick={onBrowseCatalogue}
              className="py-2.5 px-5 bg-[#fdf9f3] text-[#77574c] hover:bg-white text-[11px] uppercase tracking-widest font-semibold shadow-xs transition-all border-none cursor-pointer flex items-center gap-2 flex-shrink-0"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore More Silhouettes</span>
            </button>
          </div>

          {/* Item Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {savedItems.map((item) => {
              const formattedPrice = new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                maximumFractionDigits: 0,
              }).format(item.price);

              return (
                <div
                  key={item.id}
                  className="bg-white border border-[#3b2219]/10 shadow-xs flex flex-col justify-between overflow-hidden"
                >
                  <div
                    onClick={() => onQuickView(item)}
                    className="relative aspect-[4/3] bg-[#f1ede7] cursor-pointer group overflow-hidden"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-[#ffdea5] text-[#261900] text-[9px] uppercase tracking-widest px-2 py-0.5 font-semibold font-sans">
                      {item.status}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveItem(item.id);
                      }}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 text-[#ba1a1a] hover:bg-white flex items-center justify-center transition-colors shadow-xs"
                      title="Remove from Curations"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-4 flex flex-col justify-between flex-grow">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#bf9b54] font-medium font-sans">
                        {item.categoryLabel}
                      </span>
                      <h4
                        onClick={() => onQuickView(item)}
                        className="font-serif text-[18px] text-[#1c1c18] font-normal leading-snug cursor-pointer hover:text-[#4b0013] transition-colors mt-0.5"
                      >
                        {item.title}
                      </h4>
                      <div className="text-[14px] text-[#4b0013] font-semibold font-sans mt-1">
                        {formattedPrice}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#3b2219]/10 flex gap-2">
                      <button
                        onClick={() => onQuickView(item)}
                        className="flex-1 py-2 bg-[#4b0013] text-white text-[10px] uppercase tracking-widest font-semibold hover:bg-[#6b1426] transition-all border-none cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Couture Details</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
