import React from 'react';
import { BookOpen, ShieldCheck } from 'lucide-react';
import { NavTab } from '../types';

interface FooterProps {
  onSelectTab: (tab: NavTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="mt-8 px-5 pt-10 pb-28 bg-[#ebe8e2] flex flex-col items-center text-center border-t border-[#3b2219]/10">
      {/* Editorial Crest Icon */}
      <div className="w-10 h-10 rounded-full bg-[#4b0013] flex items-center justify-center text-white mb-2 shadow-sm">
        <BookOpen className="w-5 h-5" />
      </div>

      <h4 className="font-serif text-[20px] text-[#4b0013] font-normal tracking-wide">
        Riwaayat Closet
      </h4>
      <p className="text-[10px] uppercase tracking-[0.2em] text-[#bf9b54] font-semibold mt-1 font-sans">
        Preserving Imperial Craftsmanship
      </p>

      <p className="text-[13px] text-[#554243] max-w-xs mt-3 leading-relaxed font-sans">
        Each garment is hand-embellished across our atelier in Jaipur and Varanasi by master karigars upholding generational weaving traditions.
      </p>

      <div className="w-16 h-px bg-[#dbc0c1] my-4 opacity-50" />

      {/* Flagship Contacts */}
      <div className="flex flex-col gap-1 text-[#1c1c18] text-[13px] font-sans">
        <span className="font-semibold text-[#4b0013]">Flagship Atelier:</span>
        <span className="text-[#554243]">42 Royal Pavilion Road, Civil Lines, Jaipur</span>
        <span className="text-[#554243]">
          concierge@riwaayatcloset.com • +91 (141) 294-8890
        </span>
      </div>

      {/* Atelier Staff Portal Entry Link */}
      <div className="mt-8 pt-4 flex flex-col items-center">
        <button
          onClick={() => onSelectTab('admin')}
          className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-[#554243]/80 hover:text-[#4b0013] transition-colors py-1.5 px-3 bg-[#f1ede7] border border-[#3b2219]/10 cursor-pointer shadow-xs active:scale-95"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-[#4b0013]" />
          <span>Atelier Staff Portal</span>
        </button>
        <span className="text-[10px] text-[#554243]/50 mt-2 font-sans">
          © Riwaayat Heritage Couture. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};
