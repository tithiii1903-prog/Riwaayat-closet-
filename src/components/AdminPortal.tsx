import React, { useState } from 'react';
import {
  ShieldCheck,
  Plus,
  CheckCircle2,
  Trash2,
  Edit3,
  Layers,
  Sparkles,
  MapPin,
  RefreshCw,
  X,
  AlertTriangle,
  FolderPlus,
} from 'lucide-react';
import { GarmentItem, CategoryItem, ProductStatus } from '../types';

interface AdminPortalProps {
  garments: GarmentItem[];
  categories: CategoryItem[];
  onToggleGarmentStatus: (id: string) => void;
  onAddNewGarment: (garment: GarmentItem) => void;
  onDeleteGarment?: (id: string) => void;
  onAddCategory: (category: CategoryItem) => void;
  onEditCategory: (category: CategoryItem) => void;
  onDeleteCategory: (categoryId: string) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  garments,
  categories,
  onToggleGarmentStatus,
  onAddNewGarment,
  onDeleteGarment,
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
}) => {
  const [activeSection, setActiveSection] = useState<'categories' | 'inventory' | 'new-piece'>('categories');

  // Category State
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);
  const [categoryFormName, setCategoryFormName] = useState('');
  const [categoryFormSlug, setCategoryFormSlug] = useState('');
  const [categoryFormImage, setCategoryFormImage] = useState('');
  const [categoryFormDesc, setCategoryFormDesc] = useState('');
  const [categoryFormOrigin, setCategoryFormOrigin] = useState('');
  const [categoryFormTechnique, setCategoryFormTechnique] = useState('');
  const [categoryDeleteCandidate, setCategoryDeleteCandidate] = useState<CategoryItem | null>(null);
  const [categoryFeedback, setCategoryFeedback] = useState<string | null>(null);

  // New Piece Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<string>(categories[0]?.slug || 'bridal');
  const [newEdition, setNewEdition] = useState('Imperial Archive');
  const [newPrice, setNewPrice] = useState(95000);
  const [newStatus, setNewStatus] = useState<ProductStatus>('AVAILABLE');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [fabricDesc, setFabricDesc] = useState('Pure Raw Silk & Zardozi');
  const [karigarHours, setKarigarHours] = useState(300);
  const [createdSuccess, setCreatedSuccess] = useState(false);

  // Open Category Create Form
  const handleOpenCreateCategory = () => {
    setEditingCategory(null);
    setCategoryFormName('');
    setCategoryFormSlug('');
    setCategoryFormImage('');
    setCategoryFormDesc('');
    setCategoryFormOrigin('Jaipur Atelier & Amber Fort Karigars');
    setCategoryFormTechnique('Handcrafted Zardozi & Resham Work');
    setIsCategoryModalOpen(true);
  };

  // Open Category Edit Form
  const handleOpenEditCategory = (cat: CategoryItem) => {
    setEditingCategory(cat);
    setCategoryFormName(cat.name);
    setCategoryFormSlug(cat.slug);
    setCategoryFormImage(cat.image);
    setCategoryFormDesc(cat.description);
    setCategoryFormOrigin(cat.karigarOrigin);
    setCategoryFormTechnique(cat.signatureTechnique);
    setIsCategoryModalOpen(true);
  };

  // Auto-generate slug when name changes during creation
  const handleCategoryNameChange = (name: string) => {
    setCategoryFormName(name);
    if (!editingCategory) {
      const generatedSlug = name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-');
      setCategoryFormSlug(generatedSlug);
    }
  };

  // Save Category (Create or Edit)
  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryFormName.trim() || !categoryFormSlug.trim() || !categoryFormImage.trim()) {
      return;
    }

    if (editingCategory) {
      const updatedCategory: CategoryItem = {
        ...editingCategory,
        name: categoryFormName.trim(),
        slug: categoryFormSlug.trim(),
        image: categoryFormImage.trim(),
        altText: `${categoryFormName.trim()} Heritage Textile Archive`,
        description: categoryFormDesc.trim() || 'Ancestral handcrafted silhouettes and royal weaves.',
        karigarOrigin: categoryFormOrigin.trim() || 'Heritage Artisan Cluster',
        signatureTechnique: categoryFormTechnique.trim() || 'Ancestral Hand-Loom Weaving',
      };
      onEditCategory(updatedCategory);
      setCategoryFeedback(`Category "${updatedCategory.name}" updated successfully`);
    } else {
      const newCat: CategoryItem = {
        id: `cat-${Date.now()}`,
        name: categoryFormName.trim(),
        slug: categoryFormSlug.trim(),
        image: categoryFormImage.trim(),
        altText: `${categoryFormName.trim()} Heritage Textile Archive`,
        description: categoryFormDesc.trim() || 'Ancestral handcrafted silhouettes and royal weaves.',
        karigarOrigin: categoryFormOrigin.trim() || 'Heritage Artisan Cluster',
        signatureTechnique: categoryFormTechnique.trim() || 'Ancestral Hand-Loom Weaving',
      };
      onAddCategory(newCat);
      setCategoryFeedback(`New category "${newCat.name}" added to Riwaayat Archives`);
    }

    setIsCategoryModalOpen(false);
    setTimeout(() => {
      setCategoryFeedback(null);
    }, 3000);
  };

  // Confirm Delete Category
  const handleConfirmDeleteCategory = () => {
    if (!categoryDeleteCandidate) return;
    onDeleteCategory(categoryDeleteCandidate.id);
    setCategoryFeedback(`Category "${categoryDeleteCandidate.name}" removed from Archives`);
    setCategoryDeleteCandidate(null);
    setTimeout(() => {
      setCategoryFeedback(null);
    }, 3000);
  };

  // Create Garment Piece
  const handleCreateGarment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newImageUrl.trim()) return;

    const matchedCategory = categories.find((c) => c.slug === newCategory);
    const categoryLabel = matchedCategory ? matchedCategory.name : 'Heritage Silhouette';

    const newItem: GarmentItem = {
      id: `garment-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      categoryLabel,
      editionLabel: newEdition,
      price: Number(newPrice),
      priceLabel: newStatus === 'ARCHIVE • SOLD PIECE' ? 'Archived Value' : 'Atelier Value',
      status: newStatus,
      ctaText: 'Explore Atelier Silhouette',
      image: newImageUrl.trim(),
      altText: newTitle.trim(),
      description: newDesc.trim() || 'Bespoke hand-embroidered heritage couture piece from Riwaayat Jaipur atelier.',
      craftDetails: {
        fabric: fabricDesc,
        zariWork: 'Handcrafted Zardozi & Resham Work',
        karigarHours: Number(karigarHours),
        origin: matchedCategory ? matchedCategory.karigarOrigin : 'Jaipur Flagship Atelier',
        careGuide: 'Archival dry clean only.',
      },
      swatches: ['#4b0013', '#77574c'],
      isCustomizable: true,
    };

    onAddNewGarment(newItem);
    setCreatedSuccess(true);
    setTimeout(() => {
      setCreatedSuccess(false);
      setNewTitle('');
      setNewImageUrl('');
      setNewDesc('');
      setActiveSection('inventory');
    }, 1500);
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto px-5 py-6 font-sans">
      {/* Feedback banner */}
      {categoryFeedback && (
        <div className="mb-4 p-3 bg-[#4b0013] text-white text-[12px] uppercase tracking-wider font-semibold shadow-md flex items-center justify-between animate-fade-in border border-[#ffdea5]/40">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#ffdea5]" />
            <span>{categoryFeedback}</span>
          </div>
          <button
            onClick={() => setCategoryFeedback(null)}
            className="text-white hover:text-[#ffdea5] bg-transparent border-none cursor-pointer p-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#3b2219]/10 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-[#bf9b54] font-semibold font-sans mb-1">
            <ShieldCheck className="w-4 h-4 text-[#4b0013]" />
            <span>Jaipur & Varanasi Atelier Operations</span>
          </div>
          <h2 className="font-serif text-[28px] text-[#1c1c18] font-normal">
            Atelier Staff Portal
          </h2>
        </div>

        {/* Section Tabs */}
        <div className="flex flex-wrap gap-1 bg-[#f1ede7] p-1 border border-[#3b2219]/10">
          <button
            onClick={() => setActiveSection('categories')}
            className={`px-3 py-1.5 text-[11px] uppercase tracking-wider font-semibold transition-all border-none cursor-pointer flex items-center gap-1.5 ${
              activeSection === 'categories'
                ? 'bg-[#4b0013] text-white shadow-xs'
                : 'bg-transparent text-[#554243] hover:text-[#1c1c18]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Categories ({categories.length})</span>
          </button>
          <button
            onClick={() => setActiveSection('inventory')}
            className={`px-3 py-1.5 text-[11px] uppercase tracking-wider font-semibold transition-all border-none cursor-pointer ${
              activeSection === 'inventory'
                ? 'bg-[#4b0013] text-white shadow-xs'
                : 'bg-transparent text-[#554243] hover:text-[#1c1c18]'
            }`}
          >
            Inventory ({garments.length})
          </button>
          <button
            onClick={() => setActiveSection('new-piece')}
            className={`px-3 py-1.5 text-[11px] uppercase tracking-wider font-semibold transition-all border-none cursor-pointer flex items-center gap-1 ${
              activeSection === 'new-piece'
                ? 'bg-[#bf9b54] text-[#261900] shadow-xs'
                : 'bg-transparent text-[#554243] hover:text-[#1c1c18]'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Piece</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: CATEGORIES MANAGEMENT (ADD, EDIT, DELETE) */}
      {activeSection === 'categories' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 border border-[#3b2219]/10">
            <div>
              <h3 className="font-serif text-[20px] text-[#1c1c18] font-normal flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#4b0013]" />
                Imperial Aesthetic Archives & Categories
              </h3>
              <p className="text-[12px] text-[#554243] mt-0.5">
                Add, edit, or delete textile classifications, origins, and artisanal techniques.
              </p>
            </div>
            <button
              onClick={handleOpenCreateCategory}
              className="py-2.5 px-4 bg-[#4b0013] text-white hover:bg-[#6b1426] text-[11px] uppercase tracking-widest font-semibold transition-all shadow-xs border-none cursor-pointer flex items-center gap-2 flex-shrink-0"
            >
              <FolderPlus className="w-4 h-4" />
              <span>Add New Category</span>
            </button>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map((cat) => {
              const pieceCount = garments.filter((g) => g.category === cat.slug).length;

              return (
                <div
                  key={cat.id}
                  className="bg-white border border-[#3b2219]/10 shadow-xs flex flex-col justify-between overflow-hidden"
                >
                  <div className="relative aspect-[16/9] bg-[#f1ede7] overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-[#4b0013] text-white text-[9px] uppercase tracking-widest px-2 py-0.5 font-semibold">
                      {pieceCount} {pieceCount === 1 ? 'Garment' : 'Garments'}
                    </div>
                    <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-xs text-white text-[9px] uppercase tracking-widest px-2 py-0.5 font-mono">
                      slug: {cat.slug}
                    </div>
                  </div>

                  <div className="p-4 flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-serif text-[20px] text-[#1c1c18] font-normal">
                          {cat.name}
                        </h4>
                      </div>

                      <div className="mt-1 flex items-center gap-1.5 text-[11px] text-[#554243]">
                        <MapPin className="w-3.5 h-3.5 text-[#4b0013] flex-shrink-0" />
                        <span>{cat.karigarOrigin}</span>
                      </div>

                      <div className="mt-1 flex items-center gap-1.5 text-[11px] text-[#bf9b54] font-medium">
                        <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{cat.signatureTechnique}</span>
                      </div>

                      <p className="mt-2 text-[12px] text-[#554243] line-clamp-2 leading-relaxed">
                        {cat.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#3b2219]/10 flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEditCategory(cat)}
                        className="py-1.5 px-3 bg-[#f1ede7] hover:bg-[#e6e2dc] text-[#1c1c18] text-[11px] uppercase tracking-wider font-semibold transition-colors border-none cursor-pointer flex items-center gap-1.5"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => setCategoryDeleteCandidate(cat)}
                        className="py-1.5 px-3 bg-[#fdf2f2] hover:bg-[#fde2e2] text-[#ba1a1a] text-[11px] uppercase tracking-wider font-semibold transition-colors border-none cursor-pointer flex items-center gap-1.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 2: INVENTORY & GARMENT STATUS */}
      {activeSection === 'inventory' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-[20px] text-[#1c1c18] font-normal">
              Catalogue Inventory Control
            </h3>
            <span className="text-[12px] text-[#554243]">
              {garments.length} Couture Masterpieces
            </span>
          </div>

          <div className="space-y-3">
            {garments.map((item) => {
              const formattedPrice = new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                maximumFractionDigits: 0,
              }).format(item.price);

              return (
                <div
                  key={item.id}
                  className="p-3.5 bg-white border border-[#3b2219]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-14 h-18 object-cover bg-[#f1ede7] flex-shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase tracking-widest text-[#bf9b54] font-medium">
                          {item.categoryLabel}
                        </span>
                        <span className="text-[10px] text-[#554243]">
                          • {item.editionLabel}
                        </span>
                      </div>
                      <h4 className="font-serif text-[16px] text-[#1c1c18] font-normal leading-tight">
                        {item.title}
                      </h4>
                      <div className="text-[13px] text-[#4b0013] font-semibold mt-0.5">
                        {formattedPrice}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => onToggleGarmentStatus(item.id)}
                      className={`px-3 py-1.5 text-[10px] uppercase tracking-wider font-semibold border-none cursor-pointer transition-colors flex items-center gap-1.5 ${
                        item.status === 'AVAILABLE'
                          ? 'bg-[#ffdea5] text-[#261900] hover:bg-[#e6c790]'
                          : 'bg-[#f1ede7] text-[#554243] hover:bg-[#e6e2dc]'
                      }`}
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>{item.status}</span>
                    </button>

                    {onDeleteGarment && (
                      <button
                        onClick={() => onDeleteGarment(item.id)}
                        className="p-1.5 text-[#ba1a1a] hover:bg-[#fdf2f2] border-none bg-transparent cursor-pointer"
                        title="Delete Piece"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 3: ADD NEW PIECE */}
      {activeSection === 'new-piece' && (
        <div className="bg-white border border-[#3b2219]/10 p-6 shadow-xs">
          <h3 className="font-serif text-[22px] text-[#1c1c18] font-normal mb-1">
            Register New Heirloom Piece
          </h3>
          <p className="text-[12px] text-[#554243] mb-4">
            Catalogue a newly crafted bridal lehenga, handloom drape, or collector archival gown.
          </p>

          {createdSuccess ? (
            <div className="p-8 text-center bg-[#f7f3ed]">
              <CheckCircle2 className="w-10 h-10 text-[#4b0013] mx-auto mb-2" />
              <h4 className="font-serif text-[20px] text-[#4b0013]">Piece Added to Catalogue!</h4>
              <p className="text-[12px] text-[#554243] mt-1">
                Redirecting to inventory list...
              </p>
            </div>
          ) : (
            <form onSubmit={handleCreateGarment} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#554243] mb-1 font-semibold">
                    Garment Title *
                  </label>
                  <input
                    required
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Amber Pavilion Silk Gharara"
                    className="w-full px-3 py-2 text-[13px] bg-[#fdf9f3] border border-[#3b2219]/20 focus:border-[#4b0013] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#554243] mb-1 font-semibold">
                    Category *
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 text-[13px] bg-[#fdf9f3] border border-[#3b2219]/20 focus:border-[#4b0013] outline-none"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.slug}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#554243] mb-1 font-semibold">
                    Edition Label
                  </label>
                  <input
                    type="text"
                    value={newEdition}
                    onChange={(e) => setNewEdition(e.target.value)}
                    placeholder="e.g. Royal Bespoke / Pure Handloom"
                    className="w-full px-3 py-2 text-[13px] bg-[#fdf9f3] border border-[#3b2219]/20 focus:border-[#4b0013] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#554243] mb-1 font-semibold">
                    Atelier Price (₹) *
                  </label>
                  <input
                    required
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 text-[13px] bg-[#fdf9f3] border border-[#3b2219]/20 focus:border-[#4b0013] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#554243] mb-1 font-semibold">
                    Status
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as any)}
                    className="w-full px-3 py-2 text-[13px] bg-[#fdf9f3] border border-[#3b2219]/20 focus:border-[#4b0013] outline-none"
                  >
                    <option value="AVAILABLE">AVAILABLE</option>
                    <option value="ARCHIVE • SOLD PIECE">ARCHIVE • SOLD PIECE</option>
                    <option value="BESPOKE ORDER">BESPOKE ORDER</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#554243] mb-1 font-semibold">
                  Image URL *
                </label>
                <input
                  required
                  type="url"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 text-[13px] bg-[#fdf9f3] border border-[#3b2219]/20 focus:border-[#4b0013] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#554243] mb-1 font-semibold">
                    Fabric & Weave
                  </label>
                  <input
                    type="text"
                    value={fabricDesc}
                    onChange={(e) => setFabricDesc(e.target.value)}
                    placeholder="e.g. Mulberry Katan Silk & Real Zari"
                    className="w-full px-3 py-2 text-[13px] bg-[#fdf9f3] border border-[#3b2219]/20 focus:border-[#4b0013] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#554243] mb-1 font-semibold">
                    Karigar Hours
                  </label>
                  <input
                    type="number"
                    value={karigarHours}
                    onChange={(e) => setKarigarHours(Number(e.target.value))}
                    className="w-full px-3 py-2 text-[13px] bg-[#fdf9f3] border border-[#3b2219]/20 focus:border-[#4b0013] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#554243] mb-1 font-semibold">
                  Artisanal Description
                </label>
                <textarea
                  rows={2}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Poetic description of embroidery, silhouette, and heirloom significance..."
                  className="w-full px-3 py-2 text-[13px] bg-[#fdf9f3] border border-[#3b2219]/20 focus:border-[#4b0013] outline-none resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="py-3 px-6 bg-[#4b0013] text-white hover:bg-[#6b1426] text-[12px] uppercase tracking-widest font-semibold transition-all border-none cursor-pointer"
                >
                  Publish Piece to Atelier Catalogue
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* CATEGORY ADD / EDIT MODAL */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1c1c18]/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-lg bg-[#fdf9f3] p-6 shadow-2xl border border-[#3b2219]/20 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-[#3b2219]/10 mb-4">
              <div>
                <h3 className="font-serif text-[22px] text-[#1c1c18] font-normal">
                  {editingCategory ? 'Edit Aesthetic Category' : 'Create Aesthetic Category'}
                </h3>
                <p className="text-[12px] text-[#554243]">
                  {editingCategory
                    ? `Update details for "${editingCategory.name}"`
                    : 'Establish a new textile archive in the Riwaayat repertoire'}
                </p>
              </div>
              <button
                onClick={() => setIsCategoryModalOpen(false)}
                className="p-1 text-[#554243] hover:text-[#1c1c18] bg-transparent border-none cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#554243] mb-1 font-semibold">
                    Category Name *
                  </label>
                  <input
                    required
                    type="text"
                    value={categoryFormName}
                    onChange={(e) => handleCategoryNameChange(e.target.value)}
                    placeholder="e.g. Pashmina Shawls"
                    className="w-full px-3 py-2 text-[13px] bg-white border border-[#3b2219]/20 focus:border-[#4b0013] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#554243] mb-1 font-semibold">
                    Slug Identifier *
                  </label>
                  <input
                    required
                    type="text"
                    value={categoryFormSlug}
                    onChange={(e) => setCategoryFormSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                    placeholder="e.g. pashmina-shawls"
                    className="w-full px-3 py-2 text-[13px] bg-white border border-[#3b2219]/20 focus:border-[#4b0013] outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#554243] mb-1 font-semibold">
                  Archive Image URL *
                </label>
                <input
                  required
                  type="url"
                  value={categoryFormImage}
                  onChange={(e) => setCategoryFormImage(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 text-[13px] bg-white border border-[#3b2219]/20 focus:border-[#4b0013] outline-none"
                />
                {categoryFormImage && (
                  <div className="mt-2 w-full h-32 bg-[#f1ede7] border border-[#3b2219]/10 overflow-hidden relative">
                    <img
                      src={categoryFormImage}
                      alt="Category Preview"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    <span className="absolute bottom-1 right-2 bg-black/60 text-white text-[10px] px-1.5 py-0.5">
                      Live Image Preview
                    </span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#554243] mb-1 font-semibold">
                    Karigar Regional Origin *
                  </label>
                  <input
                    required
                    type="text"
                    value={categoryFormOrigin}
                    onChange={(e) => setCategoryFormOrigin(e.target.value)}
                    placeholder="e.g. Kashmir Valley & Dal Lake Looms"
                    className="w-full px-3 py-2 text-[13px] bg-white border border-[#3b2219]/20 focus:border-[#4b0013] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#554243] mb-1 font-semibold">
                    Signature Technique *
                  </label>
                  <input
                    required
                    type="text"
                    value={categoryFormTechnique}
                    onChange={(e) => setCategoryFormTechnique(e.target.value)}
                    placeholder="e.g. Single-Weft Sozni Needlework"
                    className="w-full px-3 py-2 text-[13px] bg-white border border-[#3b2219]/20 focus:border-[#4b0013] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#554243] mb-1 font-semibold">
                  Editorial Craft Description
                </label>
                <textarea
                  rows={3}
                  value={categoryFormDesc}
                  onChange={(e) => setCategoryFormDesc(e.target.value)}
                  placeholder="Describe the royal heritage, loom methods, and ancestral significance..."
                  className="w-full px-3 py-2 text-[13px] bg-white border border-[#3b2219]/20 focus:border-[#4b0013] outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="py-2.5 px-4 bg-[#f1ede7] text-[#1c1c18] hover:bg-[#e6e2dc] text-[11px] uppercase tracking-widest font-semibold border-none cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-5 bg-[#4b0013] text-white hover:bg-[#6b1426] text-[11px] uppercase tracking-widest font-semibold border-none cursor-pointer shadow-sm"
                >
                  {editingCategory ? 'Save Changes' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE CATEGORY DIALOG */}
      {categoryDeleteCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1c1c18]/70 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-[#fdf9f3] p-6 shadow-2xl border border-[#ba1a1a]/30">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#fdf2f2] text-[#ba1a1a] flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-[20px] text-[#1c1c18] font-normal">
                  Delete Category?
                </h3>
                <p className="text-[12px] text-[#554243] mt-1 leading-relaxed">
                  Are you sure you want to permanently delete the category{' '}
                  <strong className="text-[#1c1c18]">"{categoryDeleteCandidate.name}"</strong>?
                  Pieces in this category will remain in the catalogue.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#3b2219]/10">
              <button
                type="button"
                onClick={() => setCategoryDeleteCandidate(null)}
                className="py-2 px-4 bg-[#f1ede7] text-[#1c1c18] hover:bg-[#e6e2dc] text-[11px] uppercase tracking-widest font-semibold border-none cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDeleteCategory}
                className="py-2 px-4 bg-[#ba1a1a] text-white hover:bg-[#961515] text-[11px] uppercase tracking-widest font-semibold border-none cursor-pointer shadow-sm"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
