import React from 'react';
import { User, Sparkles, Heart } from 'lucide-react';
import { BRAND_LOGO_URL } from '../data/catalogueData';
import { NavTab } from '../types';

interface HeaderProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onSelectTab, savedCount }) => {
  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-[#fdf9f3]/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#3b2219]/10 transition-all">
      <div className="max-w-4xl mx-auto h-20 px-5 flex items-center justify-between">
        {/* Brand Logo & Editorial Title */}
        <button
          onClick={() => onSelectTab('catalogue')}
          className="flex items-center gap-3 text-left group focus:outline-none"
          aria-label="Riwaayat Home"
        >
          <img
            src={BRAND_LOGO_URL}
            alt="Riwaayat Closet Brand Logo"
            className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col">
            <span className="font-serif text-[20px] font-semibold text-[#4b0013] tracking-wide leading-none">
              Riwaayat
            </span>
            <span className="text-[10px] text-[#bf9b54] font-semibold uppercase tracking-widest mt-0.5 font-sans">
              Where Tradition Meets Elegance
            </span>
          </div>
        </button>

        {/* Quick Actions: Curations Count & Atelier Profile / Admin Portal */}
        <div className="flex items-center gap-3">
          {/* Wishlist Quick Badge */}
          <button
            onClick={() => onSelectTab('curations')}
            className={`relative p-2 rounded-full transition-colors ${
              activeTab === 'curations'
                ? 'text-[#4b0013] bg-[#ffd3c5]/30'
                : 'text-[#554243] hover:text-[#4b0013] hover:bg-[#f1ede7]'
            }`}
            title="View Curated Portfolio"
            aria-label="View Curated Portfolio"
          >
            <Heart className={`w-5 h-5 ${savedCount > 0 ? 'fill-[#4b0013] text-[#4b0013]' : ''}`} />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#4b0013] text-[#ffffff] text-[9px] font-bold flex items-center justify-center font-sans">
                {savedCount}
              </span>
            )}
          </button>

          {/* Staff / Client Profile Toggle */}
          <button
            onClick={() => onSelectTab(activeTab === 'admin' ? 'catalogue' : 'admin')}
            className="w-8 h-8 rounded-full bg-[#4b0013] flex items-center justify-center text-white hover:bg-[#6b1426] transition-all shadow-sm active:scale-95"
            title={activeTab === 'admin' ? 'Back to Catalogue' : 'Staff & Client Concierge'}
            aria-label="Staff and Client Concierge"
          >
            {activeTab === 'admin' ? (
              <Sparkles className="w-4 h-4 text-[#ffdea5]" />
            ) : (
              <User className="w-4 h-4 text-white" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
