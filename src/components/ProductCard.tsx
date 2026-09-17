import React from 'react';
import { Heart } from 'lucide-react';
import { GarmentItem } from '../types';

interface ProductCardProps {
  item: GarmentItem;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onQuickView: (item: GarmentItem) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  item,
  isSaved,
  onToggleSave,
  onQuickView,
}) => {
  const isArchive = item.status === 'ARCHIVE • SOLD PIECE';

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(item.price);

  return (
    <article className="product-item flex flex-col bg-white shadow-sm border border-[#3b2219]/10 transition-all hover:shadow-md">
      {/* 3:4 Aspect Ratio Image Showcase */}
      <div
        onClick={() => onQuickView(item)}
        className="relative w-full aspect-[3/4] bg-[#f1ede7] overflow-hidden cursor-pointer group"
      >
        <img
          src={item.image}
          alt={item.altText}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
            isArchive ? 'opacity-85' : ''
          }`}
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Status Badge */}
        {!isArchive && (
          <div className="absolute top-3 left-3 bg-[#ffdea5] text-[#261900] text-[10px] uppercase tracking-widest px-2.5 py-1 shadow-sm font-semibold font-sans">
            {item.status}
          </div>
        )}

        {/* Sold Out / Archive Scrim Overlay */}
        {isArchive && (
          <div className="absolute inset-0 bg-[#1c1c18]/40 flex items-center justify-center pointer-events-none">
            <div className="bg-[#fdf9f3] text-[#ba1a1a] text-[11px] uppercase tracking-[0.2em] px-4 py-1.5 shadow-md font-bold font-sans">
              ARCHIVE • SOLD PIECE
            </div>
          </div>
        )}

        {/* Floating Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(item.id);
          }}
          aria-label={isSaved ? 'Remove from curations' : 'Save to curated list'}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${
            isSaved
              ? 'bg-[#4b0013] text-white'
              : 'bg-[#fdf9f3]/85 text-[#1c1c18] hover:text-[#4b0013]'
          }`}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-white text-white' : ''}`} />
        </button>
      </div>

      {/* Card Information */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <span
            className={`text-[10px] uppercase tracking-widest font-medium font-sans ${
              isArchive ? 'text-[#554243]' : 'text-[#bf9b54]'
            }`}
          >
            {item.categoryLabel} • {item.editionLabel}
          </span>

          <h4
            onClick={() => onQuickView(item)}
            className={`font-serif text-[20px] font-normal mt-1 mb-2 leading-snug cursor-pointer hover:text-[#4b0013] transition-colors ${
              isArchive ? 'text-[#1c1c18]/80' : 'text-[#1c1c18]'
            }`}
          >
            {item.title}
          </h4>
        </div>

        <div>
          {/* Atelier Price Block */}
          <div className="flex items-baseline justify-between mt-1 pt-1 bg-[#f7f3ed] px-3 py-1.5 border-t border-[#3b2219]/5">
            <span className="text-[11px] text-[#554243] uppercase tracking-wider font-sans">
              {item.priceLabel}
            </span>
            <span
              className={`text-[15px] font-sans ${
                isArchive
                  ? 'text-[#554243] line-through font-normal'
                  : 'text-[#4b0013] font-semibold'
              }`}
            >
              {formattedPrice}
            </span>
          </div>

          {/* Action CTA Button */}
          <button
            onClick={() => onQuickView(item)}
            className={`mt-3 w-full py-2.5 text-[11px] uppercase tracking-widest font-semibold transition-all cursor-pointer border-none ${
              isArchive
                ? 'bg-[#e6e2dc] text-[#554243] hover:bg-[#dddad4] active:opacity-90'
                : 'bg-[#4b0013] text-white hover:bg-[#6b1426] active:opacity-90 shadow-sm'
            }`}
          >
            {item.ctaText || 'View Couture Details'}
          </button>
        </div>
      </div>
    </article>
  );
};
