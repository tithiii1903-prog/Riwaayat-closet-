import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { HeritageBanner } from './components/HeritageBanner';
import { CategoriesCarousel } from './components/CategoriesCarousel';
import { SearchAndFilterBar } from './components/SearchAndFilterBar';
import { FilterChipsBar } from './components/FilterChipsBar';
import { ProductCard } from './components/ProductCard';
import { Footer } from './components/Footer';
import { BottomNav } from './components/BottomNav';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CategoriesView } from './components/CategoriesView';
import { CurationsView } from './components/CurationsView';
import { AdminPortal } from './components/AdminPortal';
import { FilterModal } from './components/FilterModal';
import { INITIAL_GARMENTS, INITIAL_CATEGORIES } from './data/catalogueData';
import { GarmentItem, CategoryItem, NavTab, ProductCategory } from './types';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<NavTab>('catalogue');

  // Core Data State
  const [garments, setGarments] = useState<GarmentItem[]>(() => {
    const saved = localStorage.getItem('riwaayat_garments');
    return saved ? JSON.parse(saved) : INITIAL_GARMENTS;
  });

  const [categories, setCategories] = useState<CategoryItem[]>(() => {
    const saved = localStorage.getItem('riwaayat_categories');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  // Saved / Wishlist Items
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('riwaayat_curations');
    return saved ? JSON.parse(saved) : ['garment-1'];
  });

  // Filtering State
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'available' | 'archive'>('all');
  const [maxPrice, setMaxPrice] = useState(200000);

  // Modals
  const [quickViewItem, setQuickViewItem] = useState<GarmentItem | null>(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Toast notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2600);
  };

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('riwaayat_curations', JSON.stringify(savedIds));
  }, [savedIds]);

  useEffect(() => {
    localStorage.setItem('riwaayat_garments', JSON.stringify(garments));
  }, [garments]);

  useEffect(() => {
    localStorage.setItem('riwaayat_categories', JSON.stringify(categories));
  }, [categories]);

  // Clean up legacy keys from localStorage if present
  useEffect(() => {
    localStorage.removeItem('riwaayat_appointments');
    localStorage.removeItem('riwaayat_inquiries');
  }, []);

  // Wishlist toggle handler
  const handleToggleSave = (id: string) => {
    setSavedIds((prev) => {
      if (prev.includes(id)) {
        showToast('Removed piece from Curations');
        return prev.filter((item) => item !== id);
      } else {
        showToast('Piece preserved in Curated Portfolio');
        return [...prev, id];
      }
    });
  };

  // Admin Actions: Garment Status
  const handleToggleGarmentStatus = (id: string) => {
    setGarments((prev) =>
      prev.map((g) => {
        if (g.id !== id) return g;
        const newStatus =
          g.status === 'AVAILABLE' ? 'ARCHIVE • SOLD PIECE' : 'AVAILABLE';
        return {
          ...g,
          status: newStatus,
          priceLabel:
            newStatus === 'ARCHIVE • SOLD PIECE' ? 'Archived Value' : 'Atelier Value',
          ctaText:
            newStatus === 'ARCHIVE • SOLD PIECE'
              ? 'Explore Archival Silhouette'
              : 'Explore Atelier Silhouette',
        };
      })
    );
    showToast('Garment availability status updated');
  };

  const handleAddNewGarment = (newItem: GarmentItem) => {
    setGarments((prev) => [newItem, ...prev]);
    showToast('New heirloom piece published to catalogue');
  };

  const handleDeleteGarment = (id: string) => {
    setGarments((prev) => prev.filter((g) => g.id !== id));
    setSavedIds((prev) => prev.filter((itemId) => itemId !== id));
    showToast('Piece removed from catalogue');
  };

  // Admin Actions: Dynamic Categories Management (Add, Edit, Delete)
  const handleAddCategory = (newCat: CategoryItem) => {
    setCategories((prev) => [...prev, newCat]);
    showToast(`Category "${newCat.name}" added to Riwaayat Archives`);
  };

  const handleEditCategory = (updatedCat: CategoryItem) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === updatedCat.id ? updatedCat : c))
    );
    // Automatically update category labels on corresponding garments
    setGarments((prev) =>
      prev.map((g) => {
        if (g.category === updatedCat.slug) {
          return { ...g, categoryLabel: updatedCat.name };
        }
        return g;
      })
    );
    showToast(`Category "${updatedCat.name}" updated`);
  };

  const handleDeleteCategory = (categoryId: string) => {
    const catToDelete = categories.find((c) => c.id === categoryId);
    setCategories((prev) => prev.filter((c) => c.id !== categoryId));
    if (catToDelete && selectedCategory === catToDelete.slug) {
      setSelectedCategory('all');
    }
    showToast(`Category "${catToDelete?.name || ''}" removed from Archives`);
  };

  // Filtered Garment Items
  const filteredGarments = garments.filter((item) => {
    // Category match
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }

    // Availability status
    if (statusFilter === 'available' && item.status !== 'AVAILABLE') {
      return false;
    }
    if (statusFilter === 'archive' && item.status !== 'ARCHIVE • SOLD PIECE') {
      return false;
    }

    // Max price
    if (item.price > maxPrice) {
      return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchCategory = item.categoryLabel.toLowerCase().includes(q);
      const matchEdition = item.editionLabel.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchFabric = item.craftDetails.fabric.toLowerCase().includes(q);
      if (!matchTitle && !matchCategory && !matchEdition && !matchDesc && !matchFabric) {
        return false;
      }
    }

    return true;
  });

  const savedGarments = garments.filter((g) => savedIds.includes(g.id));

  const hasActiveFilters =
    statusFilter !== 'all' || maxPrice < 200000 || searchQuery !== '';

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setStatusFilter('all');
    setMaxPrice(200000);
    setSearchQuery('');
    setIsFilterModalOpen(false);
  };

  const scrollToCatalogue = () => {
    if (activeTab !== 'catalogue') {
      setActiveTab('catalogue');
      setTimeout(() => {
        const el = document.getElementById('catalogue-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('catalogue-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#fdf9f3] text-[#1c1c18] font-sans min-h-screen flex flex-col antialiased">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#4b0013] text-white px-5 py-2.5 shadow-xl text-[12px] uppercase tracking-widest font-semibold border border-[#ffdea5]/40 animate-fade-in">
          {toastMessage}
        </div>
      )}

      {/* Global Fixed Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        savedCount={savedIds.length}
      />

      {/* Main Content Area */}
      <main className="flex-grow pt-20 pb-20 bg-[#fdf9f3]">
        {activeTab === 'catalogue' && (
          <div className="flex flex-col w-full max-w-4xl mx-auto">
            {/* Search & Atelier Filter Bar */}
            <SearchAndFilterBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onOpenFilterModal={() => setIsFilterModalOpen(true)}
              hasActiveFilters={hasActiveFilters}
            />

            {/* Grand Editorial Hero Banner */}
            <HeroSection onExploreClick={scrollToCatalogue} />

            {/* Heritage Craftsmanship Diamond Quote */}
            <HeritageBanner />

            {/* Featured Categories Carousel */}
            <CategoriesCarousel
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={(slug) => {
                setSelectedCategory(slug as ProductCategory);
                scrollToCatalogue();
              }}
              onViewAllClick={() => {
                setActiveTab('categories');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Filter Chips Bar */}
            <FilterChipsBar
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              count={filteredGarments.length}
            />

            {/* Product Articles Grid */}
            <section className="px-5 py-4 bg-[#fdf9f3] flex flex-col gap-6">
              {filteredGarments.length === 0 ? (
                <div className="bg-white border border-[#3b2219]/10 p-10 text-center my-4">
                  <h4 className="font-serif text-[20px] text-[#1c1c18] mb-1">
                    No Artworks Found
                  </h4>
                  <p className="text-[13px] text-[#554243] mb-4">
                    No couture pieces match the selected category or filters.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="py-2 px-4 bg-[#4b0013] text-white text-[11px] uppercase tracking-wider font-semibold border-none cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                filteredGarments.map((item) => (
                  <ProductCard
                    key={item.id}
                    item={item}
                    isSaved={savedIds.includes(item.id)}
                    onToggleSave={handleToggleSave}
                    onQuickView={(clickedItem) => setQuickViewItem(clickedItem)}
                  />
                ))
              )}
            </section>

            {/* Refined Editorial Footer */}
            <Footer
              onSelectTab={(tab) => {
                setActiveTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {/* Categories Tab View */}
        {activeTab === 'categories' && (
          <div className="w-full">
            <CategoriesView
              categories={categories}
              onSelectCategory={(catSlug) => {
                setSelectedCategory(catSlug);
                setActiveTab('catalogue');
                setTimeout(() => {
                  const el = document.getElementById('catalogue-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
            />
            <Footer onSelectTab={setActiveTab} />
          </div>
        )}

        {/* Curations / Wishlist Tab View */}
        {activeTab === 'curations' && (
          <div className="w-full">
            <CurationsView
              savedItems={savedGarments}
              onRemoveItem={handleToggleSave}
              onQuickView={(item) => setQuickViewItem(item)}
              onBrowseCatalogue={() => {
                setActiveTab('catalogue');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
            <Footer onSelectTab={setActiveTab} />
          </div>
        )}

        {/* Staff / Admin Portal Tab View */}
        {activeTab === 'admin' && (
          <div className="w-full">
            <AdminPortal
              garments={garments}
              categories={categories}
              onToggleGarmentStatus={handleToggleGarmentStatus}
              onDeleteGarment={handleDeleteGarment}
              onAddNewGarment={handleAddNewGarment}
              onAddCategory={handleAddCategory}
              onEditCategory={handleEditCategory}
              onDeleteCategory={handleDeleteCategory}
            />
            <Footer onSelectTab={setActiveTab} />
          </div>
        )}
      </main>

      {/* Global Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        savedCount={savedIds.length}
      />

      {/* Modals & Dialogs */}
      <ProductDetailModal
        item={quickViewItem}
        isOpen={!!quickViewItem}
        onClose={() => setQuickViewItem(null)}
        isSaved={quickViewItem ? savedIds.includes(quickViewItem.id) : false}
        onToggleSave={handleToggleSave}
      />

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        maxPrice={maxPrice}
        onMaxPriceChange={setMaxPrice}
        onResetFilters={handleResetFilters}
      />
    </div>
  );
}
