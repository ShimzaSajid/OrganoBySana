export type CategorySlug =
  | "hair-care"
  | "health-wellness"
  | "skincare-body"
  | "accessories"
  | "bundles";           


export type ProductBundle = {
  quantity: number;
  price: number;
  compareAtPrice?: number;
  badge?: "Most Popular" | "Best Value" | string;
  savings?: string;
};

export type BaseProduct = {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  image: string;
  gallery?: { src: string; alt?: string }[];
  description: string;
  badges?: string[];
  rating?: number;
  reviewsCount?: number;
};

export type Product = BaseProduct & {
  kind: "single";
  price: number;
  compareAtPrice?: number;
  benefits?: string[];
  keyFeatures?: string[];
  idealFor?: string[];
  howToUse?: { title: string; text: string }[];
  ingredients?: string[];
  faqs?: { question: string; answer: string }[];
  bundles?: ProductBundle[];
  stock: number;
  sizeLabel?: string;
  colors?: string[];
  allowDuplicateColors?: boolean;
};

export type KitItemRef = { productId: string; quantity: number };

export type KitProduct = BaseProduct & {
  kind: "kit";
  price: number;
  compareAtPrice?: number;
  items: KitItemRef[];
};

export type CatalogItem = Product | KitProduct;
