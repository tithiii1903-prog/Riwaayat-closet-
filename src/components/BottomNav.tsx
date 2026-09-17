import React from 'react';
import { BookOpen, Layers, Gem, ShieldCheck } from 'lucide-react';
import { NavTab } from '../types';

interface BottomNavProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  savedCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  savedCount,
}) => {
  const tabs: { id: NavTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'catalogue', label: 'Catalogue', icon: BookOpen },
    { id: 'categories', label: 'Categories', icon: Layers },
    { id: 'curations', label: 'Curations', icon: Gem },
    { id: 'admin', label: 'Admin', icon: ShieldCheck },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-50 pb-safe bg-[#fdf9f3]/92 backdrop-blur-xl border-t border-[#3b2219]/10 shadow-[0_-1px_12px_rgba(40,23,17,0.06)]">
      <div className="max-w-md mx-auto flex justify-around items-center h-16 px-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] px-2 transition-colors duration-200 cursor-pointer bg-transparent border-none relative ${
                isActive
                  ? 'text-[#4b0013] font-semibold'
                  : 'text-[#554243] hover:text-[#1c1c18]'
              }`}
            >
              <div className="relative">
                <Icon className={`w-[22px] h-[22px] ${isActive ? 'stroke-[2.2]' : 'stroke-[1.6]'}`} />
                {tab.id === 'curations' && savedCount > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 w-4 h-4 rounded-full bg-[#4b0013] text-white text-[9px] font-bold flex items-center justify-center font-sans">
                    {savedCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] uppercase tracking-wider mt-1 font-sans">
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-[#4b0013] mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
