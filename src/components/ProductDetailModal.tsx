import React from 'react';
import { X, Heart, Sparkles, Clock, MapPin, Shield, Scissors } from 'lucide-react';
import { GarmentItem } from '../types';

interface ProductDetailModalProps {
  item: GarmentItem | null;
  isOpen: boolean;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  item,
  isOpen,
  onClose,
  isSaved,
  onToggleSave,
}) => {
  if (!isOpen || !item) return null;

  const isArchive = item.status === 'ARCHIVE • SOLD PIECE';
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(item.price);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1c1c18]/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#fdf9f3] my-8 shadow-2xl border border-[#3b2219]/20 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-[#fdf9f3]/90 text-[#1c1c18] flex items-center justify-center hover:bg-white hover:text-[#4b0013] transition-colors shadow-md border-none cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Image Display */}
        <div className="relative w-full aspect-[4/4] bg-[#f1ede7] overflow-hidden">
          <img
            src={item.image}
            alt={item.altText}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          {/* Status Badge */}
          <div className="absolute bottom-3 left-4">
            <span
              className={`text-[11px] uppercase tracking-widest px-3 py-1 font-semibold font-sans shadow-sm ${
                isArchive
                  ? 'bg-[#fdf9f3] text-[#ba1a1a]'
                  : 'bg-[#ffdea5] text-[#261900]'
              }`}
            >
              {item.status}
            </span>
          </div>

          {/* Wishlist toggle */}
          <button
            onClick={() => onToggleSave(item.id)}
            className={`absolute bottom-3 right-4 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-colors ${
              isSaved
                ? 'bg-[#4b0013] text-white'
                : 'bg-[#fdf9f3]/90 text-[#1c1c18] hover:text-[#4b0013]'
            }`}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-white text-white' : ''}`} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] uppercase tracking-widest text-[#bf9b54] font-semibold font-sans">
              {item.categoryLabel} • {item.editionLabel}
            </span>
          </div>

          <h3 className="font-serif text-[24px] text-[#1c1c18] font-normal leading-snug">
            {item.title}
          </h3>

          <div className="flex items-baseline justify-between mt-3 mb-4 p-3 bg-[#f7f3ed] border border-[#3b2219]/10">
            <span className="text-[12px] text-[#554243] uppercase tracking-wider font-sans">
              {item.priceLabel}
            </span>
            <span
              className={`text-[18px] font-sans ${
                isArchive ? 'text-[#554243] line-through' : 'text-[#4b0013] font-bold'
              }`}
            >
              {formattedPrice}
            </span>
          </div>

          <p className="text-[14px] text-[#554243] leading-relaxed mb-6 font-sans">
            {item.description}
          </p>

          {/* Swatches if available */}
          {item.swatches && item.swatches.length > 0 && (
            <div className="mb-6">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#1c1c18] block mb-2 font-sans">
                Atelier Raw Silk & Velvet Swatches
              </span>
              <div className="flex gap-2">
                {item.swatches.map((color, idx) => (
                  <div
                    key={idx}
                    className="w-7 h-7 rounded-none border border-[#3b2219]/20 shadow-xs hover:ring-2 hover:ring-[#bf9b54] transition-all cursor-pointer"
                    style={{ backgroundColor: color }}
                    title={`Fabric Shade ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Karigar Craftsmanship Breakdown */}
          <div className="border-t border-[#3b2219]/10 pt-4 mb-6">
            <h5 className="font-serif text-[16px] text-[#4b0013] mb-3 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#bf9b54]" />
              Generational Craftsmanship Dossier
            </h5>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[13px] font-sans">
              <div className="flex items-start gap-2 bg-[#f7f3ed] p-2.5">
                <Scissors className="w-4 h-4 text-[#4b0013] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#1c1c18] block">Fabric Composition</span>
                  <span className="text-[#554243]">{item.craftDetails.fabric}</span>
                </div>
              </div>

              <div className="flex items-start gap-2 bg-[#f7f3ed] p-2.5">
                <Sparkles className="w-4 h-4 text-[#4b0013] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#1c1c18] block">Zari & Embellishment</span>
                  <span className="text-[#554243]">{item.craftDetails.zariWork}</span>
                </div>
              </div>

              <div className="flex items-start gap-2 bg-[#f7f3ed] p-2.5">
                <Clock className="w-4 h-4 text-[#4b0013] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#1c1c18] block">Artisan Investment</span>
                  <span className="text-[#554243]">{item.craftDetails.karigarHours} Karigar Hours</span>
                </div>
              </div>

              <div className="flex items-start gap-2 bg-[#f7f3ed] p-2.5">
                <MapPin className="w-4 h-4 text-[#4b0013] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#1c1c18] block">Regional Origin</span>
                  <span className="text-[#554243]">{item.craftDetails.origin}</span>
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-start gap-2 bg-[#f1ede7] p-2.5 text-[12px] text-[#554243]">
              <Shield className="w-4 h-4 text-[#bf9b54] flex-shrink-0 mt-0.5" />
              <span>
                <strong>Archival Preservation:</strong> {item.craftDetails.careGuide}
              </span>
            </div>
          </div>

          {/* Action CTA */}
          <div className="flex gap-3">
            <button
              onClick={() => onToggleSave(item.id)}
              className={`flex-1 py-3 text-[12px] uppercase tracking-widest font-semibold transition-all shadow-sm active:scale-98 border-none cursor-pointer flex items-center justify-center gap-2 ${
                isSaved
                  ? 'bg-[#1c1c18] text-white hover:bg-[#3b2219]'
                  : 'bg-[#4b0013] text-white hover:bg-[#6b1426]'
              }`}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-white text-white' : ''}`} />
              <span>{isSaved ? 'Preserved in Curations' : 'Save To Curated Trousseau'}</span>
            </button>
            <button
              onClick={onClose}
              className="py-3 px-5 bg-[#f1ede7] text-[#1c1c18] hover:bg-[#e6e2dc] text-[12px] uppercase tracking-widest font-semibold transition-all border-none cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
