import React from 'react';
import { Gem } from 'lucide-react';

export const HeritageBanner: React.FC = () => {
  return (
    <section className="py-6 px-5 bg-[#f7f3ed] text-center flex flex-col items-center border-y border-[#3b2219]/5">
      <Gem className="w-6 h-6 text-[#bf9b54] mb-2 opacity-90 stroke-[1.5]" />
      <p className="font-serif text-[20px] text-[#1c1c18] font-normal leading-snug max-w-xs sm:max-w-md">
        “Handcrafted heritage weaves and regal couture inspired by timeless Indian royalty.”
      </p>
      <div className="w-12 h-0.5 bg-[#493300] mt-3 opacity-30" />
    </section>
  );
};
