export type ProductCategory = string;

export type ProductStatus = 'AVAILABLE' | 'ARCHIVE • SOLD PIECE' | 'BESPOKE ORDER';

export interface GarmentMediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  poster?: string;
  caption?: string;
}

export interface GarmentCraftDetails {
  fabric: string;
  zariWork: string;
  karigarHours: number;
  origin: string;
  careGuide: string;
}

export interface GarmentItem {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  editionLabel: string;
  price: number;
  priceLabel: 'Atelier Value' | 'Handcrafted Price' | 'Archived Value';
  status: ProductStatus;
  ctaText: string;
  image: string;
  altText: string;
  media?: GarmentMediaItem[];
  description: string;
  craftDetails: GarmentCraftDetails;
  swatches?: string[];
  isCustomizable?: boolean;
}

export interface CategoryItem {
  id: string;
  slug: string;
  name: string;
  image: string;
  altText: string;
  description: string;
  karigarOrigin: string;
  signatureTechnique: string;
}

export type NavTab = 'catalogue' | 'categories' | 'curations' | 'admin';
