import React from 'react';
import { HERO_IMAGE_URL } from '../data/catalogueData';

interface HeroSectionProps {
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick }) => {
  return (
    <section className="relative w-full overflow-hidden bg-[#e6e2dc]">
      <div className="relative h-[480px] w-full">
        {/* Background Editorial Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${HERO_IMAGE_URL}')` }}
          role="img"
          aria-label="Editorial close up of an Indian bride in palatial courtyard wearing regal deep maroon velvet lehenga"
        />

        {/* Regal Deep Burgundy Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#4b0013] via-[#4b0013]/55 to-transparent" />

        {/* Content Container */}
        <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col items-center text-center text-white pb-8">
          {/* Filigree Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="h-px w-6 bg-[#e9c176]" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#ffdea5] font-semibold font-sans">
              Haute Heritage Couture
            </span>
            <span className="h-px w-6 bg-[#e9c176]" />
          </div>

          {/* Majestic Serif Headline */}
          <h2 className="font-serif text-[28px] sm:text-[34px] font-normal text-[#fdf9f3] leading-tight tracking-tight mb-2 max-w-md">
            Timeless Indian Elegance, Curated For You
          </h2>

          {/* Poetic Subtitle */}
          <p className="text-[13px] text-[#f7f3ed]/90 max-w-[320px] mb-5 italic font-sans leading-relaxed">
            Handcrafted royal weaves, bespoke velvet silken silhouettes, and ancestral grandeur crafted for lifetime ceremonies.
          </p>

          {/* Sharp Monographic CTA Button */}
          <button
            onClick={onExploreClick}
            className="w-full max-w-[260px] py-3.5 px-6 bg-[#fdf9f3] text-[#4b0013] text-center text-[13px] uppercase tracking-widest font-semibold shadow-md transition-all hover:bg-white hover:shadow-lg active:scale-95 border-none cursor-pointer"
          >
            Explore Collection
          </button>
        </div>
      </div>
    </section>
  );
};
