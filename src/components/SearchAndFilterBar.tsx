import React from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';

interface SearchAndFilterBarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  onOpenFilterModal: () => void;
  hasActiveFilters: boolean;
}

export const SearchAndFilterBar: React.FC<SearchAndFilterBarProps> = ({
  searchQuery,
  onSearchChange,
  onOpenFilterModal,
  hasActiveFilters,
}) => {
  return (
    <div className="px-5 py-2 bg-[#fdf9f3]">
      <div className="relative flex items-center w-full bg-[#f1ede7] rounded-none px-3.5 py-2.5 border border-[#3b2219]/10 focus-within:border-[#4b0013] transition-colors">
        <Search className="w-5 h-5 text-[#554243] mr-2.5 flex-shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search lehengas, sarees, bridal wear..."
          className="w-full bg-transparent border-none outline-none text-[13px] text-[#1c1c18] placeholder:text-[#554243]/70 tracking-wide font-sans"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="p-1 text-[#554243] hover:text-[#1c1c18] mr-1"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <button
          onClick={onOpenFilterModal}
          aria-label="Filter catalogue"
          className={`flex items-center justify-center p-1 transition-colors relative ${
            hasActiveFilters ? 'text-[#4b0013]' : 'text-[#554243] hover:text-[#1c1c18]'
          }`}
          title="Filter by Price & Availability"
        >
          <SlidersHorizontal className="w-4 h-4" />
          {hasActiveFilters && (
            <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-[#4b0013]" />
          )}
        </button>
      </div>
    </div>
  );
};
